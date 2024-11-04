<script setup>
import { reactive, ref } from "vue";
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
const form = reactive({
  email: "",
  password: "",
});

const rules = {
  email: { required, email },
  password: { required },
};

const v$ = useVuelidate(rules, form);

async function submitForm() {
  v$.value.$touch();

  if (v$.value.$errors.length > 0) {
    return;
  }
  try {
    const response = await axios.get("http://localhost:3000/customers");
    const { customers } = response.data;
    //Check first if email exists
    //If email exists then check for password
    console.log(customers);

    let doesEmailExist = false;

    customers.forEach((customer) => {
      if (customer.email === form.email) {
        doesEmailExist = true;
      }
    });

    if (!doesEmailExist) {
      alert("Email does not exist!");
      return;
    }

    const customer = customers.find(
      (customer) =>
        customer.email === form.email && customer.password === form.password
    );

    if (customer) {
      alert("Customer logged in!");
    } else {
      alert("Password is incorrect!");
    }
  } catch (e) {
    console.log(e);
  }

  //Send a request using axios to get all customers oh my god
  //Create a service function to get a specific property
}

const isPasswordHidden = ref(true);

const togglePassword = () => {
  isPasswordHidden.value = !isPasswordHidden.value;
};
</script>

<template>
  <section class="flex-grow flex items-center">
    <section
      class="container mx-auto bg-[#F2EDED] p-6 rounded-[10px] max-w-[360px]"
    >
      <h1 class="font-semibold text-[20px] mb-[19px]">Log in</h1>
      <!-- Put function here -->
      <form @submit.prevent="submitForm">
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
            />
          </div>
        </div>
        <!-- Password -->
        <div class="mb-[27px] relative">
          <label
            class="font-bold italic opacity-50 text-sm sm:text-base"
            for="password"
            >Password</label
          >
          <div class="relative bg-white p-2 rounded w-full border border-black">
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
        </div>
        <!-- Login button -->
        <button
          class="mb-3 bg-[#15B392] w-full h-[43px] font-bold rounded-[3px] bg-opacity-50"
        >
          Log in
        </button>
      </form>

      <div class="text-center text-sm mt-5">
        <p class="text-opacity-50 text-black inline mr-[3px]">
          New to Malunggay?
        </p>
        <RouterLink to="/register" class="text-[#0000FF] text-opacity-100"
          >Sign up</RouterLink
        >
      </div>
    </section>
  </section>
</template>
