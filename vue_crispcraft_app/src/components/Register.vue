<script setup>
import { reactive, ref, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";

import {
  required,
  email,
  sameAs,
  numeric,
  maxLength,
  minLength,
  helpers,
} from "@vuelidate/validators";

const { withAsync } = helpers;
const form = reactive({
  email: "",
  password: "",
  address: "",
  phoneNum: "",
  fName: "",
  lName: "",
  city: "",
  state: "",
  confirmPassword: "",
});

const isPasswordHidden = ref(true);
const isConfirmPasswordHidden = ref(true);

const togglePassword = () => {
  isPasswordHidden.value = !isPasswordHidden.value;
};
const toggleConfirmPassword = () => {
  isConfirmPasswordHidden.value = !isConfirmPasswordHidden.value;
};

const router = useRouter();

// Todo: create a custom validator to check if email is already used
const checkIfEmailExists = async (value) => {
  try {
    console.log("Validating email:", value);
    value = value.trim(); // Trim the email value to avoid leading/trailing spaces

    // Make the request to check if the email exists
    const response = await axios.get("/customers/field", {
      params: { email: value },
    });

    console.log("Server response:", response.data); // Log the full server response

    // Check if the response contains 'exists'
    if (response.data && response.data.exists !== undefined) {
      console.log("Email exists:", response.data.exists); // Log if email exists
      return !response.data.exists; // return false if the email exists (i.e., should be invalid)
    } else {
      console.error("Unexpected response format:", response.data); // Handle unexpected response formats
      return false; // Return false if the response format is incorrect
    }
  } catch (error) {
    console.error("Error during email validation:", error); // Log the error
    return true; // Email does not exist
  }
};
// const asyncValidator = withAsync(checkIfEmailExists);

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage("Email is required!", required),
      email: helpers.withMessage("Enter a valid email!", email),
      duplicateEmail: helpers.withMessage(
        "Email already exists!",
        withAsync(checkIfEmailExists)
      ),
    },
    password: { required, minLength: minLength(8) },
    address: { required },
    phoneNum: {
      required,
      numeric,
      maxLength: maxLength(11),
      minLength: minLength(11),
    },
    fName: { required },
    lName: { required },
    city: { required },
    state: { required },
    confirmPassword: { required, sameAs: sameAs(form.password) },
  };
});

const v$ = useVuelidate(rules, form);

async function submitForm() {
  //TODO: Check if naay same email sa database

  v$.value.$touch();
  if (v$.value.$errors.length > 0) {
    //Throw error
    console.log(v$.value.$errors);
    return;
  }
  try {
    const response = await axios.post("http://localhost:3000/customers", form);

    console.log(response.data);
    router.push("/");
  } catch (e) {
    console.log(e);
  }
}
</script>

<template>
  <section class="flex-grow flex items-center">
    <section
      class="container mx-auto bg-[#F2EDED] p-6 rounded-[10px] max-w-[360px] xl:max-w-[718px] xl:mx-0"
    >
      <h1 class="font-semibold text-[20px] mb-[19px]">Sign Up</h1>
      <!-- Put function here -->
      <form @submit.prevent="submitForm">
        <div
          class="h-[200px] overflow-y-auto w-full xl:h-auto xl:grid xl:grid-cols-3 xl:gap-5"
        >
          <div class="col">
            <!-- Email -->
            <div class="mb-3">
              <label
                class="font-bold italic opacity-50 text-sm sm:text-base"
                placeholder="Email"
                for="email"
                >Email</label
              >
              <div class="bg-white p-2 rounded w-full border border-black">
                <input
                  class="w-full focus:outline-none text-[14px]"
                  type="email"
                  name="email"
                  v-model="form.email"
                  id="email"
                  placeholder="Email"
                  @blur="v$.email.$touch()"
                />
              </div>
              <!-- <pre>{{ v$.email }}</pre> -->
              <span v-if="v$.email.$error" class="text-red-500 text-xs">
                {{ v$.email.$errors[0]?.$message }}
              </span>
            </div>
            <!-- Password -->
            <div class="mb-3 relative">
              <label
                class="font-bold italic opacity-50 text-sm sm:text-base"
                for="password"
                >Password</label
              >
              <div
                class="relative bg-white p-2 rounded w-full border border-black"
              >
                <input
                  class="w-[85%] lg:w-[90%] focus:outline-none text-[14px]"
                  name="password"
                  id="password"
                  v-model="form.password"
                  v-bind:type="isPasswordHidden ? 'password' : 'text'"
                  placeholder="Password"
                />
                <i
                  class="pi text-black absolute bottom-3 right-3 cursor-pointer text-base"
                  :class="isPasswordHidden ? 'pi-eye-slash' : 'pi-eye'"
                  @click="togglePassword"
                ></i>
              </div>
              <span v-if="v$.password.$error" class="text-red-500 text-xs">
                {{ v$.password.$errors[0].$message }}
              </span>
            </div>
            <!-- Confirm Password -->
            <div class="mb-3 relative">
              <label
                class="font-bold italic opacity-50 text-sm sm:text-base"
                for="confirmPassword"
                >Confirm Password</label
              >
              <div
                class="relative bg-white p-2 rounded w-full border border-black"
              >
                <input
                  class="w-[85%] lg:w-[90%] focus:outline-none text-[14px]"
                  name="password"
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                  v-bind:type="isConfirmPasswordHidden ? 'password' : 'text'"
                  placeholder="Password"
                />
                <i
                  class="pi text-black absolute bottom-3 right-3 cursor-pointer text-base"
                  :class="isConfirmPasswordHidden ? 'pi-eye-slash' : 'pi-eye'"
                  @click="toggleConfirmPassword"
                ></i>
              </div>
              <span
                v-if="v$.confirmPassword.$error"
                class="text-red-500 text-xs"
              >
                {{ v$.confirmPassword.$errors[0].$message }}
              </span>
            </div>
          </div>

          <div class="col">
            <!-- First Name -->
            <div class="mb-3">
              <label
                class="font-bold italic opacity-50 text-sm sm:text-base"
                for="firstName"
                >First Name</label
              >
              <div class="bg-white p-2 rounded w-full border border-black">
                <input
                  class="w-full focus:outline-none text-[14px]"
                  type="text"
                  name="firstName"
                  v-model="form.fName"
                  id="firstName"
                  placeholder="First Name"
                />
              </div>
              <span v-if="v$.fName.$error" class="text-red-500 text-xs">
                {{ v$.fName.$errors[0].$message }}
              </span>
            </div>
            <!-- Last Name -->
            <div class="mb-3">
              <label
                class="font-bold italic opacity-50 text-sm sm:text-base"
                for="lastName"
                >Last Name</label
              >
              <div class="bg-white p-2 rounded w-full border border-black">
                <input
                  class="w-full focus:outline-none text-[14px]"
                  type="text"
                  name="lastName"
                  v-model="form.lName"
                  id="lastName"
                  placeholder="Last Name"
                />
              </div>
              <span v-if="v$.lName.$error" class="text-red-500 text-xs">
                {{ v$.lName.$errors[0].$message }}
              </span>
            </div>
            <!-- Phone Number -->
            <div class="mb-3">
              <label
                class="font-bold italic opacity-50 text-sm sm:text-base"
                for="phoneNumber"
                >Phone Number</label
              >
              <div class="bg-white p-2 rounded w-full border border-black">
                <input
                  class="w-full focus:outline-none text-[14px]"
                  type="tel"
                  name="phoneNumber"
                  v-model="form.phoneNum"
                  id="phoneNumber"
                  placeholder="Phone Number"
                />
              </div>
              <span v-if="v$.phoneNum.$error" class="text-red-500 text-xs">
                {{ v$.phoneNum.$errors[0].$message }}
              </span>
            </div>
          </div>

          <div class="col">
            <!-- Address -->
            <div class="mb-3">
              <label
                class="font-bold italic opacity-50 text-sm sm:text-base"
                for="address"
                >Address</label
              >
              <div class="bg-white p-2 rounded w-full border border-black">
                <input
                  class="w-full focus:outline-none text-[14px]"
                  type="address"
                  name="address"
                  v-model="form.address"
                  id="address"
                  placeholder="Enter address"
                />
              </div>
              <span v-if="v$.address.$error" class="text-red-500 text-xs">
                {{ v$.address.$errors[0].$message }}
              </span>
            </div>
            <!-- City -->
            <div class="mb-3">
              <label
                class="font-bold italic opacity-50 text-sm sm:text-base"
                for="city"
                >City</label
              >
              <div class="bg-white p-2 rounded w-full border border-black">
                <input
                  class="w-full focus:outline-none text-[14px]"
                  type="text"
                  name="city"
                  v-model="form.city"
                  id="city"
                  placeholder="City"
                />
              </div>
              <span v-if="v$.city.$error" class="text-red-500 text-xs">
                {{ v$.city.$errors[0].$message }}
              </span>
            </div>
            <!-- State -->
            <div class="mb-3">
              <label
                class="font-bold italic opacity-50 text-sm sm:text-base"
                for="state"
                >State</label
              >
              <div class="bg-white p-2 rounded w-full border border-black">
                <input
                  class="w-full focus:outline-none text-[14px]"
                  type="text"
                  name="state"
                  v-model="form.state"
                  id="state"
                  placeholder="State"
                />
              </div>
              <span v-if="v$.state.$error" class="text-red-500 text-xs">
                {{ v$.state.$errors[0].$message }}
              </span>
            </div>
          </div>
        </div>

        <!-- Login button -->
        <div
          class="flex justify-between items-center flex-col-reverse xl:flex-row mt-5"
        >
          <div class="text-center text-sm">
            <p class="text-opacity-50 text-black inline mr-[3px]">
              Already have an account?
            </p>
            <RouterLink to="/login" class="text-[#0000FF] text-opacity-100"
              >Log in</RouterLink
            >
          </div>
          <button
            class="mb-3 bg-[#15B392] w-full font-bold rounded-[3px] bg-opacity-50 p-2 xl:mb-0 xl:max-w-[20%]"
          >
            Register
          </button>
        </div>
      </form>
    </section>
  </section>
</template>
