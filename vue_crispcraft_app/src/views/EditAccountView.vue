<script setup>
import { useAuthStore } from "@/stores/auth";
import axios from "axios";
import { reactive } from "vue";
const authStore = useAuthStore();

const form = reactive({});

switch (authStore.role) {
  case "customer":
    //get id using session id
    const customerResponse = await axios.get(`/customers/${authStore.user_id}`);
    console.log("Customer response", customerResponse.data);
    break;

  case "merchant":
    break;
}
</script>

<template>
  <form
    v-on:submit.prevent="submitForm"
    class="bg-white rounded-xl px-10 py-5"
    enctype="multipart/form-data"
  >
    <div class="form-item">
      <label for="productName" class="myTextShadow">Product Name:</label>
      <input
        type="text"
        name="productName"
        id="productName"
        v-model="form.productName"
        placeholder="Enter product name"
        class="border-black p-3 border-2 rounded-[5px] myFormInput block w-full myFormInput p-inputtext"
      />
      <span v-if="v$.productName.$error" class="text-red-500 text-xs">
        {{ v$.productName.$errors[0].$message }}
      </span>
    </div>
    <div class="form-item">
      <label for="flavorName" class="myTextShadow">Flavor Name:</label>
      <input
        type="text"
        name="flavorName"
        v-model="form.flavorName"
        id="flavorName"
        placeholder="Enter flavor name"
        class="border-black p-3 border-2 rounded-[5px] block w-full myFormInput p-inputtext"
      />
      <span v-if="v$.flavorName.$error" class="text-red-500 text-xs">
        {{ v$.flavorName.$errors[0].$message }}
      </span>
    </div>

    <div class="form-item">
      <label for="description" class="myTextShadow">Product Description:</label>
      <textarea
        id="description"
        v-model="form.description"
        placeholder="Enter product description"
        class="border-black w-full p-3 border-2 rounded-[5px] block max-h-[76px] myFormInput p-inputtext"
      ></textarea>
      <span v-if="v$.description.$error" class="text-red-500 text-xs">
        {{ v$.description.$errors[0].$message }}
      </span>
    </div>

    <div class="form-item">
      <label for="price" class="myTextShadow">Price:</label>
      <input
        type="number"
        min="0"
        max="50000"
        v-model="form.price"
        name="price"
        id="price"
        class="border-black w-full border-2 p-3 rounded-[5px] block myFormInput p-inputtext"
      />
      <span v-if="v$.price.$error" class="text-red-500 text-xs">
        {{ v$.price.$errors[0].$message }}
      </span>
    </div>
    <div class="form-item">
      <label for="expirationDate" class="myTextShadow">Expiration Date:</label>
      <DatePicker
        v-model="form.expirationDate"
        inputId="expirationDate"
        date-format="yy-mm-dd"
        class="expiration-date"
        :min-date="today"
      />
      <span
        v-if="v$.expirationDate.$error"
        class="text-red-500 text-xs block mt-3"
      >
        {{ v$.expirationDate.$errors[0].$message }}
      </span>
    </div>

    <div class="flex justify-end">
      <Toast />
      <button
        type="submit"
        class="bg-[#74CD5F] text-white px-5 rounded-full myBoxShadow font-bold text-[24px] py-[6px] myTextShadow"
      >
        Save
      </button>
    </div>
  </form>
</template>
