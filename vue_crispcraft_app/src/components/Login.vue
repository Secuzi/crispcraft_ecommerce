<script setup>
import { reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { email, required, minLength } from "@vuelidate/validators";
const form = reactive({
  email: "",
  password: "",
});
const router = useRouter();
const rules = {
  email: { required, email },
  password: { required },
};

const v$ = useVuelidate(rules, form);

async function submitForm() {
  v$.value.$touch();

  if (v$.value.$errors.length > 0) {
    console.log(v$.value.$errors);
    return;
  }
  try {
    console.log(form.email);
    const response = await axios.post("http://localhost:3000/auth/login", form);
    console.log(response.data);

    if (response.data.user.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/homepage");
    }
  } catch (e) {
    console.log(e);
  }
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
          <span v-if="v$.email.$error" class="text-red-500 text-xs">
            {{ v$.email.$errors[0].$message }}
          </span>
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
          <span v-if="v$.password.$error" class="text-red-500 text-xs">
            {{ v$.password.$errors[0].$message }}
          </span>
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
