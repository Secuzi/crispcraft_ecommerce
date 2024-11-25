<script setup>
import { reactive, ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { email, required, minLength } from "@vuelidate/validators";
import { useToast } from "primevue/usetoast";
import { Toast } from "primevue";
import { useAuthStore } from "@/stores/auth";
const form = reactive({
  email: "",
  password: "",
  role: "",
});
const toast = useToast();
const router = useRouter();
const rules = {
  email: { required, email },
  password: { required },
};
const authStore = useAuthStore();
const v$ = useVuelidate(rules, form);

async function submitForm() {
  v$.value.$touch();

  if (v$.value.$errors.length > 0) {
    return;
  }

  try {
    // const response = await axios.post("http://localhost:3000/auth/login", form);
    const returnedData = await authStore.login(form);

    console.log("returned data: ", returnedData);

    switch (authStore.role) {
      case "merchant":
        router.push("/merchant");
        break;
      case "admin":
        router.push("/admin/stock");
        break;

      default:
        router.push("/");
        break;
    }

    // if (authStore.role === "admin") {
    //   router.push("/admin/stock");
    // } else {
    //   router.push("/");
    // }
  } catch (e) {
    console.log(e);

    toast.add({
      severity: "error",
      summary: "Error",
      detail: e.message,
      life: 3000,
    });
  }
}

const isPasswordHidden = ref(true);

const togglePassword = () => {
  isPasswordHidden.value = !isPasswordHidden.value;
};

onMounted(() => {
  form.role = "customer";
});
</script>

<template>
  <section class="flex-grow flex items-center">
    <section
      class="container mx-auto bg-[#F2EDED] p-6 rounded-[10px] max-w-[360px]"
    >
      <Toast />
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
        <div class="relative mb-3">
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

        <select v-model="form.role" required class="mb-[27px]">
          <option value="customer">Customer</option>
          <option value="merchant">Merchant</option>
          <option value="admin">Admin</option>
          <!-- Maybe add admin or not -->
        </select>
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
