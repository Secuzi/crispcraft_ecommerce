<script setup>
import DatePicker from "primevue/datepicker";
import { useToast } from "primevue";
import Toast from "primevue/toast";
import { ref, reactive, onMounted, computed, onUnmounted } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import axios from "axios";
const toast = useToast();
const form = reactive({
  productName: "",
  description: "",
  price: null,
  expirationDate: null,

  changeDate: "",

  flavorName: "",
  image: "",
});

const baseUrl = import.meta.env.VITE_APP_BASE_URL;
const imageObject = ref(null);

const rules = {
  productName: {
    required: helpers.withMessage("Product name cannot be empty!", required),
  },
  description: {
    required: helpers.withMessage("Description cannot be empty!", required),
  },
  price: { required: helpers.withMessage("Price cannot be empty!", required) },
  expirationDate: {
    required: helpers.withMessage("Expiration date cannot be empty!", required),
  },

  flavorName: {
    required: helpers.withMessage("Flavor name cannot be empty!", required),
  },
  image: {
    required: helpers.withMessage("Image cannot be empty!", required),
  },
};

const v$ = useVuelidate(rules, form);

function checkImageFile(event) {
  const { files } = event.target;
  if (files) {
    form.image = files[0].name;
    imageObject.value = files[0];
  }
}

async function submitForm() {
  try {
    console.log("IN FOOORM");
    v$.value.$touch();
    if (v$.value.$errors.length > 0) {
      console.log("errors: ", v$.value.$errors);
      return;
    }
    let newProduct = ref(null);
    let newFlavor = ref(null);

    try {
      newFlavor.value = await axios.post("/flavors", form);
      form.flavorID = newFlavor.value.data.flavorID;
    } catch (e) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: e.response.data.message || e.message,
        life: 3150,
      });
    }
    try {
      const formData = new FormData();
      formData.append("productName", form.productName);
      formData.append("description", form.description);
      formData.append("flavorID", form.flavorID);
      formData.append("price", form.price);
      formData.append("expirationDate", form.expirationDate);
      formData.append("image", imageObject.value);

      newProduct.value = await axios.post("/products", formData);
      form.productID = newProduct.value.data.productID;
      console.log(newProduct);
    } catch (e) {
      console.log(e);
      toast.add({
        severity: "error",
        summary: "Error",
        detail: e.response.data.message || e.message,
        life: 3150,
      });
    }

    if (!newProduct.value || !newFlavor.value) {
      return;
    }

    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Successfully created product!",
      life: 3000,
    });
  } catch (e) {}
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
    <div class="form-item">
      <input
        type="file"
        name="image"
        accept="image/*"
        class="cursor-pointer"
        @change="checkImageFile"
        id="image"
      />
      <span v-if="v$.image.$error" class="text-red-500 text-xs block">
        {{ v$.image.$errors[0].$message }}
      </span>
    </div>

    <div class="flex justify-end">
      <Toast v-if="!isWindowMobile" />
      <button
        type="submit"
        class="bg-[#74CD5F] text-white px-5 rounded-full myBoxShadow font-bold text-[24px] py-[6px] myTextShadow"
      >
        Save
      </button>
    </div>
  </form>
</template>

<style scoped>
.form-item {
  margin-bottom: 1rem;
}

:deep(.p-inputtext:focus) {
  border-color: #74cd5f !important;
}
.form-item label {
  font-size: 14px;
  font-style: italic;
  font-weight: 500;
}

:deep(.expiration-date .p-inputtext) {
  border-radius: 5px;
  margin-left: 10px;
  border: 2px solid black;
}
:deep(.expiration-date.mobile .p-inputtext) {
  margin-left: 0;
}

:deep(.expiration-date.mobile) {
  width: 100%;
}

:deep(.expiration-date .p-inputtext:focus) {
  border-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); /* Correct syntax */
}
</style>
