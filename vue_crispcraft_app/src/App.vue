<script setup>
import { ref, computed, reactive } from "vue";
import logo from "@/assets/images/BAG of CHIPS/logo.png";
import productHighlight from "@/assets/images/PRODUCT PLACEMENT RESOURCES/1.png";

const isPasswordHidden = ref(true);

const user = reactive({
  email: "",
  password: "",
});

const togglePassword = () => {
  isPasswordHidden.value = !isPasswordHidden.value;
};
</script>

<template>
  <main class="h-dvh flex flex-col overflow-hidden">
    <div class="bg-primary h-[46px]"></div>
    <div class="bg-secondary flex-grow relative">
      <div
        class="container mx-auto p-[16px] flex justify-center h-full flex-col flex-grow xl:flex-row xl:items-center"
      >
        <section class="flex-grow flex items-center">
          <section
            class="container mx-auto bg-[#F2EDED] p-6 rounded-[10px] max-w-[360px]"
          >
            <h1 class="font-semibold text-[20px] mb-[19px]">Log in</h1>
            <!-- Put function here -->
            <form @submit.prevent="">
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
              <div class="mb-[27px] relative">
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
                    id="passwordIcon"
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

            <div class="flex justify-between items-center space-x-3 mb-[20px]">
              <div
                class="bg-opacity-50 w-[60%] h-[1px] flex-grow-0 bg-black"
              ></div>
              <span class="text-[14px] text-black text-opacity-50">Or</span>
              <div
                class="bg-opacity-50 w-[60%] h-[1px] flex-grow-0 bg-black"
              ></div>
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
                New to Malunggay?
              </p>
              <a href="#" class="text-[#0000FF] text-opacity-100">Sign up</a>
            </div>
          </section>
        </section>
        <section class="hidden xl:block w-[674px]">
          <img
            :src="productHighlight"
            alt="product highlight"
            class="rounded-[27px]"
          />
        </section>

        <img
          :src="logo"
          class="w-[137px] self-center lg:self-end lg:absolute lg:bottom-[-6rem] lg:w-[215px] lg:right-[1rem] z-10"
        />
      </div>
    </div>

    <div class="bg-primary h-[46px]"></div>
  </main>
</template>
