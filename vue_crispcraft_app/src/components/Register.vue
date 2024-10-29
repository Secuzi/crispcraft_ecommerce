<script setup>
import ScrollPanel from "primevue/scrollpanel";
import { reactive, ref } from "vue";
import Select from "primevue/select";
const user = reactive({
  email: "",
  password: "",
  address: "",
  phoneNum: "",
  fName: "",
  lName: "",
});

const isPasswordHidden = ref(true);
const isConfirmPasswordHidden = ref(true);

const togglePassword = () => {
  isPasswordHidden.value = !isPasswordHidden.value;
};
const toggleConfirmPassword = () => {
  isConfirmPasswordHidden.value = !isConfirmPasswordHidden.value;
};
</script>

<template>
  <section class="flex-grow flex items-center">
    <section
      class="container mx-auto bg-[#F2EDED] p-6 rounded-[10px] max-w-[360px]"
    >
      <h1 class="font-semibold text-[20px] mb-[19px]">Sign Up</h1>
      <!-- Put function here -->
      <form @submit.prevent="" class="flex">
        <div class="h-[200px] overflow-y-auto w-full">
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
                v-model="user.email"
                id="email"
                placeholder="Email"
              />
            </div>
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
                v-model="user.password"
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
                v-bind:type="isConfirmPasswordHidden ? 'password' : 'text'"
                placeholder="Password"
              />
              <i
                class="pi text-black absolute bottom-3 right-3 cursor-pointer text-base"
                :class="isConfirmPasswordHidden ? 'pi-eye-slash' : 'pi-eye'"
                @click="toggleConfirmPassword"
              ></i>
            </div>
          </div>
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
                v-model="user.address"
                id="address"
                placeholder="Street/District/City/Country"
              />
            </div>
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
                v-model="user.phoneNum"
                id="phoneNumber"
                placeholder="Phone Number"
              />
            </div>
          </div>

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
                v-model="user.fName"
                id="firstName"
                placeholder="First Name"
              />
            </div>
          </div>
          <!-- Last Name -->
          <div class="mb-[27px]">
            <label
              class="font-bold italic opacity-50 text-sm sm:text-base"
              for="firstName"
              >Last Name</label
            >
            <div class="bg-white p-2 rounded w-full border border-black">
              <input
                class="w-full focus:outline-none text-[14px]"
                type="text"
                name="lastName"
                v-model="user.lName"
                id="lasttName"
                placeholder="Last Name"
              />
            </div>
          </div>
        </div>

        <!-- Login button -->
      </form>

      <div class="flex justify-between items-center space-x-3 mb-[20px]">
        <div class="bg-opacity-50 w-[60%] h-[1px] flex-grow-0 bg-black"></div>
        <span class="text-[14px] text-black text-opacity-50">Or</span>
        <div class="bg-opacity-50 w-[60%] h-[1px] flex-grow-0 bg-black"></div>
      </div>

      <div class="text-center mb-[19px]">
        <a href="#">
          <i class="pi pi-facebook"></i>
        </a>
        <a href="#">
          <i class="pi pi-google"></i>
        </a>
        <a href="#">
          <i class="pi pi-apple"></i>
        </a>
      </div>
      <div class="text-center text-sm">
        <p class="text-opacity-50 text-black inline mr-[3px]">
          Already have an account?
        </p>
        <RouterLink to="/" class="text-[#0000FF] text-opacity-100"
          >Log in</RouterLink
        >
      </div>
      <button
        class="mb-3 bg-[#15B392] w-full h-[43px] font-bold rounded-[3px] bg-opacity-50"
      >
        Register
      </button>
    </section>
  </section>
</template>
