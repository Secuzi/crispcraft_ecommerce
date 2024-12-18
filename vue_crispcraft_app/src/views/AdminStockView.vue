<script setup>
import DesktopContainer from "@/components/DesktopContainer.vue";
import MainContainer from "@/components/MainContainer.vue";
import MobileContainer from "@/components/MobileContainer.vue";
import Navbar from "@/components/Navbar.vue";
import HeaderText from "@/components/HeaderText.vue";
import CheckoutProductCard from "@/components/CheckoutProductCard.vue";
import {
  IconField,
  InputIcon,
  InputText,
  Dialog,
  DataTable,
  Column,
} from "primevue";
import ChecklistIcon from "@/assets/images/icons/checklists.svg";
import TransactionIcon from "@/assets/images/icons/transaction.svg";
import ClerkIcon from "@/assets/images/icons/clerk.svg";
import VueButton from "primevue/button";
import Button from "@/components/Button.vue";
import { reactive } from "vue";
import axios from "axios";
import DatePicker from "primevue/datepicker";
import { useToast } from "primevue";
import Toast from "primevue/toast";
import { ref, onMounted, computed, onUnmounted } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { useProductStore } from "@/stores/product";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { watchEffect, watch } from "vue";

import AdminButton from "@/components/AdminButton.vue";
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";

const route = useRoute();

const productStore = useProductStore();
const toast = useToast();
const visible = ref(false);
const form = reactive({
  productName: "",
  description: "",
  price: null,
  expirationDate: null,

  stockQty: 0,
  changeDate: "",

  flavorName: "",
  image: "",
});

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const imageObject = ref(null);

const dialogVisible = ref(false);

function checkImageFile(event) {
  const { files } = event.target;
  if (files) {
    form.image = files[0].name;
    imageObject.value = files[0];
  }
}
let today = new Date();
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
  stockQty: {
    required: helpers.withMessage("Quantity cannot be empty!", required),
  },
  flavorName: {
    required: helpers.withMessage("Flavor name cannot be empty!", required),
  },
};
const v$ = useVuelidate(rules, form);

async function submitForm() {
  try {
    v$.value.$touch();
    if (v$.value.$errors.length > 0) {
      return;
    }
    let newProduct = ref(null);
    let newFlavor = ref(null);
    let newInventory = ref(null);
    try {
      //Check to see existing flavor
      // if it equals then don't change id otherwise change

      newFlavor.value = await axios.put(
        `/flavors/${selectedFlavor.value}`,
        form
      );
      form.flavorID = selectedFlavor.value;
    } catch (e) {
      console.log("Flavor ERROR");
      toast.add({
        severity: "error",
        summary: "Flavor Error",
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

      if (form.stockQty == 0) {
        formData.append("active", 0);
      } else {
        formData.append("active", 1);
      }

      console.log("ACTIVE: ", formData.active);

      newProduct.value = await axios.put(
        `/products/${productStore.selectedProduct}`,
        formData
      );
      form.productID = newProduct.value.data.productID;
      console.log("MEW PRODUCTT: ", newProduct.value);
    } catch (e) {
      console.log(e);
      toast.add({
        severity: "error",
        summary: "Error",
        detail: e.response.data.message || e.message,
        life: 3150,
      });
    }
    console.log("SELECTED INVENTORY: ", selectedInventory.value);
    try {
      newInventory.value = await axios.put(
        `/inventory/${selectedInventory.value}`,
        form
      );
    } catch (e) {
      console.log(e);
    }

    if (!newProduct.value || !newFlavor.value) {
      return;
    }
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Successfully edited product!",
      life: 3000,
    });
    const response = await axios.get("/query/stock");
    productStore.products = response.data;
    for (const product of productStore.products) {
      product.fullName = `${product.productName}: ${product.flavorName}`;
    }
  } catch (e) {
    console.log(e);
  }
}
const products = ref([]);
const addSelectedProduct = ref();

function removeTimeFromDateString(dateString) {
  return dateString.split("T")[0];
}
const browserWindow = reactive({
  width: window.innerWidth,
  height: window.innerHeight,
});

const searchTerm = ref("");
const filteredProducts = computed(() => {
  const term = searchTerm.value.toLowerCase();
  return productStore.products.filter(
    (product) =>
      product.productName.toLowerCase().includes(term) ||
      product.flavorName.toLowerCase().includes(term) ||
      product.fullName.toLowerCase().includes(term)
  );
});

const addToInventory = async () => {
  // form.productID = newProduct.value.data.productID;
  // form.stockQty = 0;
  if (products.value.length <= 0) {
    return;
  }

  addSelectedProduct.value.stockQty = 0;

  const inventoryResponse = await axios.post("/inventory", {
    ...addSelectedProduct.value,
  });

  const { inventoryID } = inventoryResponse.data;
  addSelectedProduct.value.inventoryID = inventoryID;

  console.log(addSelectedProduct.value);

  productStore.products.push(addSelectedProduct.value);

  for (const product of productStore.products) {
    product.fullName = `${product.productName}: ${product.flavorName}`;
  }
  dialogVisible.value = false;

  if (productStore.products.length > 0) {
    const length = productStore.products.length;
    productStore.selectedProduct = productStore.products[length - 1].productID;
  }
};

const updateDimensions = () => {
  browserWindow.width = window.innerWidth;
  browserWindow.height = window.innerHeight;
};
const isWindowMobile = computed(() => {
  return browserWindow.width <= 320;
});
const selectedFlavor = ref();
const selectedInventory = ref();
const isLoading = ref(true);
watchEffect(async () => {
  if (isLoading.value) {
    return;
  }

  if (productStore.products.length > 0 && productStore.selectedProduct) {
    const selectedProduct = productStore.products.find(
      (product) => product.productID === productStore.selectedProduct
    );

    if (selectedProduct) {
      form.productName = selectedProduct.productName;
      form.description = selectedProduct.description;
      form.price = selectedProduct.price;
      const rawDate = removeTimeFromDateString(selectedProduct.expirationDate);
      form.expirationDate = rawDate;

      const flavorResponse = await axios.get(
        `flavors/${selectedProduct.flavorID}`
      );
      const { flavor } = flavorResponse.data;
      const inventoryResponse = await axios.get("/inventory");
      const { inventories } = inventoryResponse.data;
      const inventory = inventories.find(
        (inventory) => inventory.productID === selectedProduct.productID
      );

      form.stockQty = inventory.stockQty;
      form.flavorName = flavor.flavorName;
      selectedFlavor.value = selectedProduct.flavorID;

      selectedInventory.value = selectedProduct.inventoryID;
    }
  }
});

watch(
  () => addSelectedProduct.value,
  (newSelect) => {
    console.log("SELECTED ADD PRODUCT: ", newSelect);
  }
);

const dialogClick = async () => {
  dialogVisible.value = true;
  //get products
  const productsResponse = await axios.get("/products");
  const gotProducts = productsResponse.data.products;
  console.log("GOT PRODUCTS!", gotProducts);
  products.value = gotProducts.filter(
    (product) =>
      !productStore.products.some(
        (inventoryProduct) => inventoryProduct.productID === product.productID
      )
  );
  //Get flavors

  const flavorsResponse = await axios.get("/flavors");
  const flavors = flavorsResponse.data;
  for (const product of products.value) {
    for (const flavor of flavors) {
      if (product.flavorID === flavor.flavorID) {
        product.flavorName = flavor.flavorName;
      }
    }
  }
};

onMounted(async () => {
  const response = await axios.get("/query/stock");

  productStore.products = response.data;

  console.log("PRODUUCTS STOOORE: ", productStore.products);

  if (productStore.products.length > 0) {
    productStore.selectedProduct = productStore.products[0].productID;
  }
  isLoading.value = false;
  window.addEventListener("resize", updateDimensions);

  for (const product of productStore.products) {
    product.fullName = `${product.productName}: ${product.flavorName}`;
  }

  // const newProducts = productStore.products.map(
  //   (product) =>
  //     (product.fullName = `${product.productName}: ${product.flavorName}`)
  // );
  console.log("IN PRODUCRTS: ", productStore.products);
});
onUnmounted(() => {
  window.removeEventListener("resize", updateDimensions);
  //In order to reuse the same store I have to disable this
  productStore.selectedProduct = null;
  productStore.products = null;
});
</script>

<template>
  <MainContainer>
    <div
      v-if="isLoading"
      class="text-center text-gray-500 py-6 flex-grow flex justify-center items-center bg-white"
    >
      <PulseLoader />
    </div>

    <div v-else>
      <Navbar />
      <DesktopContainer
        backgroundColor="bg-[#D6F3FF]"
        alignItems="flex-start"
        class=""
      >
        <section class="flex-grow">
          <div class="w-[90%] mx-auto flex gap-12 h-[100%] justify-between">
            <section class="basis-[100px] flex-grow-[1.5]">
              <HeaderText
                featuredText="ITEM"
                productsText="STOCK"
                textSize="55px"
              />
              <div
                class="bg-white flex py-[5rem] flex-col gap-9 justify-center px-5 rounded-2xl mt-[5rem]"
              >
                <AdminButton
                  route="/admin/stock"
                  :imageIcon="ChecklistIcon"
                  text="Inventory"
                  :isActive="route.path === '/admin/stock'"
                />
                <AdminButton
                  route="/admin/transactions"
                  :imageIcon="TransactionIcon"
                  :isActive="route.path === '/admin/transactions'"
                  text="Transactions"
                />
                <AdminButton
                  route="/admin/merchants"
                  :imageIcon="ClerkIcon"
                  :isActive="route.path === '/admin/merchants'"
                  text="Merchants"
                />
              </div>
            </section>
            <section class="basis-[500px] flex-grow">
              <div class="h-[84px] flex flex-col justify-center">
                <IconField>
                  <InputIcon class="pi pi-search" />
                  <InputText
                    placeholder="Search Product"
                    class="!text-[20px]"
                    v-model="searchTerm"
                  />
                </IconField>
              </div>
              <div v-if="!isLoading" class="overflow-auto w-full mt-[5rem]">
                <TransitionGroup
                  name="products"
                  v-if="productStore.products.length > 0"
                  class="max-h-[800px]"
                >
                  <CheckoutProductCard
                    class="h-[128px] flex-grow-0"
                    v-for="(product, index) in filteredProducts"
                    :key="product.productID"
                    :id="product.productID"
                    :isActive="
                      product.productID == productStore.selectedProduct
                    "
                    :class="[index !== 0 ? 'mt-5' : '']"
                    :image="baseUrl + '/' + product.image"
                    :header="product.fullName"
                    :deleteProduct="productStore.deleteProduct"
                    :getProduct="productStore.getProduct"
                    :description="product.description"
                    :qty="product.stockQty"
                    :price="product.price"
                    fontSizeHeader="18px"
                    fontSizeBody="16px"
                  />
                </TransitionGroup>
                <div v-else>
                  <HeaderText
                    featuredText="No products"
                    productsText=""
                    class="text-center"
                    textSize="55px"
                  />
                </div>
              </div>
            </section>
            <section class="mt-[10rem] pb-[5rem]">
              <form
                v-on:submit.prevent="submitForm"
                class="bg-white rounded-xl px-10 py-5 mb-5"
                enctype="multipart/form-data"
              >
                <div class="form-item">
                  <label for="productName" class="myTextShadow"
                    >Product Name:</label
                  >
                  <input
                    type="text"
                    name="productName"
                    id="productName"
                    v-model="form.productName"
                    placeholder="Enter product name"
                    class="border-black p-3 border-2 rounded-[5px] myFormInput block w-full myFormInput p-inputtext"
                  />
                  <span
                    v-if="v$.productName.$error"
                    class="text-red-500 text-xs"
                  >
                    {{ v$.productName.$errors[0].$message }}
                  </span>
                </div>
                <div class="form-item">
                  <label for="flavorName" class="myTextShadow"
                    >Flavor Name:</label
                  >
                  <input
                    type="text"
                    name="flavorName"
                    v-model="form.flavorName"
                    id="flavorName"
                    placeholder="Enter flavor name"
                    class="border-black p-3 border-2 rounded-[5px] block w-full myFormInput p-inputtext"
                  />
                  <span
                    v-if="v$.flavorName.$error"
                    class="text-red-500 text-xs"
                  >
                    {{ v$.flavorName.$errors[0].$message }}
                  </span>
                </div>
                <div class="form-item">
                  <label for="description" class="myTextShadow"
                    >Product Description:</label
                  >
                  <textarea
                    id="description"
                    v-model="form.description"
                    placeholder="Enter product description"
                    class="border-black w-full p-3 border-2 rounded-[5px] block max-h-[76px] myFormInput p-inputtext"
                  ></textarea>
                  <span
                    v-if="v$.description.$error"
                    class="text-red-500 text-xs"
                  >
                    {{ v$.description.$errors[0].$message }}
                  </span>
                </div>
                <div class="form-item">
                  <label for="stock" class="myTextShadow"
                    >Stocks Available:</label
                  >
                  <div class="flex justify-around gap-2">
                    <Button
                      text="-"
                      type="button"
                      padding_x="1.5rem"
                      padding_y="0px"
                      class="!text-[32px]"
                      @click="form.stockQty > 0 ? form.stockQty-- : 0"
                    />
                    <Button
                      text="+"
                      type="button"
                      padding_x="1.5rem"
                      padding_y="0px"
                      class="!text-[32px] ml-3"
                      @click="form.stockQty += 1"
                    />
                    <input
                      type="number"
                      min="0"
                      name="product stock"
                      v-model="form.stockQty"
                      id="stock"
                      class="border-black border-2 px-2 rounded-[5px] myFormInput p-inputtext"
                    />
                  </div>
                  <span v-if="v$.stockQty.$error" class="text-red-500 text-xs">
                    {{ v$.stockQty.$errors[0].$message }}
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
                  <label for="expirationDate" class="myTextShadow"
                    >Expiration Date:</label
                  >
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
                </div>
                <div class="flex justify-end">
                  <Toast v-if="!isWindowMobile" />
                  <button
                    type="submit"
                    class="bg-[#74CD5F] text-white px-5 rounded-full myBoxShadow font-bold text-[24px] py-[6px] myTextShadow"
                  >
                    Edit
                  </button>
                </div>
              </form>
              <div class="flex justify-between">
                <RouterLink
                  to="/admin/create-product"
                  class="text-[24px] font-bold rounded-full px-4 py-3 bg-[#3672F6] text-white myBoxShadow myTextShadow"
                >
                  Create Product
                </RouterLink>
                <button
                  @click="dialogClick"
                  class="text-[24px] font-bold rounded-full px-4 py-3 bg-[#3672F6] text-white myBoxShadow myTextShadow"
                >
                  Add Product
                </button>
              </div>
              <Dialog
                v-model:visible="dialogVisible"
                header="Add Product to Inventory"
                :style="{ width: '75vw' }"
                modal
                :contentStyle="{ height: '300px' }"
              >
                <DataTable
                  :value="products"
                  v-model:selection="addSelectedProduct"
                  selectionMode="single"
                  :metaKeySelection="false"
                  scrollable
                  scrollHeight="flex"
                  datakey="productID"
                  tableStyle="min-width: 50rem"
                >
                  <Column field="productID" header="productID"></Column>
                  <Column field="productName" header="Product Name"></Column>
                  <Column field="flavorName" header="Flavor Name"></Column>
                  <Column field="price" header="Price"></Column>
                </DataTable>
                <template #footer>
                  <VueButton
                    label="Add to Inventory"
                    icon="pi pi-check"
                    @click="addToInventory"
                  />
                </template>
              </Dialog>
            </section>
          </div>
        </section>
      </DesktopContainer>
    </div>

    <MobileContainer backgroundColor="bg-[#D6F3FF]">
      <section class="myContainer">
        <HeaderText featuredText="ITEM" productsText="STOCK" textSize="20px" />
      </section>

      <section class="myContainer mt-4">
        <div class="grid grid-cols-2 gap-3 auto-rows-[40px]">
          <div class="flex flex-col">
            <button>
              <div
                class="flex items-center justify-center gap-5 bg-[#63A553] rounded-2xl px-4 py-2 myBoxShadow"
              >
                <img :src="ChecklistIcon" class="w-[21px]" />
                <span
                  class="text-white flex-grow font-bold myTextShadow text-[12px] text-left"
                  >Inventory</span
                >
              </div>
            </button>
          </div>
          <div class="flex flex-col">
            <button>
              <div
                class="flex items-center justify-center gap-3 bg-[#63A553] rounded-2xl px-4 py-2 myBoxShadow"
              >
                <img :src="TransactionIcon" class="w-[21px]" />
                <span
                  class="text-white flex-grow font-bold myTextShadow text-[12px] text-left"
                  >Transactions</span
                >
              </div>
            </button>
          </div>
          <button>
            <div
              class="flex items-center justify-center gap-5 bg-[#63A553] rounded-2xl px-4 py-2 myBoxShadow"
            >
              <img :src="ClerkIcon" class="w-[21px]" />
              <span
                class="text-white flex-grow font-bold myTextShadow text-[12px] text-left"
                >Merchants</span
              >
            </div>
          </button>
        </div>
      </section>

      <!-- Main section with padding -->
      <section class="h-[544px] overflow-scroll-auto overflow-x-hidden mt-3">
        <div
          v-for="product in products"
          :key="product.id"
          class="bg-white px-[10px] py-[14px] myBoxShadow rounded-l-lg w-[95%] mt-4 ml-auto"
        >
          <!-- Has 2 flex items  -->
          <div class="flex gap-1 items-center justify-between">
            <!-- Header, input, labels -->
            <div class="">
              <h3 class="text-[13px] font-extrabold myTextShadow mb-2">
                {{ product.productName }}
              </h3>
              <!-- For the two inputs stocks and price -->
              <div class="flex gap-3">
                <!-- Container for stocks -->
                <div class="flex-grow">
                  <label
                    for="stock"
                    class="italic text-[12px] myTextShadow font-light"
                    >Stocks Available:</label
                  >
                  <!-- Inputs and buttons -->
                  <div class="flex gap-1 items-center">
                    <input
                      type="text"
                      name="stock"
                      id="stock"
                      class="myBoxShadow px-2 max-w-[85px] border border-black rounded-md"
                    />
                    <Button
                      text="-"
                      padding_x="6px"
                      padding_y="0px"
                      class="!text-[16px] text-center rounded-sm"
                    />
                    <Button
                      text="+"
                      padding_x="6px"
                      padding_y="0px"
                      class="!text-[16px] text-center rounded-sm"
                    />
                  </div>
                </div>
                <!-- Container for price -->
                <div class="flex-grow">
                  <label
                    for="price"
                    class="italic text-[12px] myTextShadow font-light"
                    >Price:</label
                  >
                  <!-- Inputs and buttons -->
                  <div>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      class="myBoxShadow px-2 max-w-[85px] border border-black rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- Image -->
            <img
              :src="baseUrl + '/' + product.image"
              :alt="product.productName"
              class="w-[45px] self-end"
            />
          </div>
        </div>
      </section>

      <div
        class="bg-myPrimaryColor absolute bottom-20 right-5 rounded-full p-4 flex items-center"
        @click="visible = true"
      >
        <i class="pi pi-plus !text-[24px] !text-white"></i>
      </div>

      <!-- <VueButton
        label="Add/Edit Product"
        @click="visible = true"
        class="absolute !rounded-none !bg-myPrimaryColor w-[50%]"
      /> -->
      <Dialog
        v-model:visible="visible"
        modal
        header="Add Product"
        :style="{ width: '25rem' }"
      >
        <form @submit.prevent="submitForm" enctype="multipart/form-data">
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
            <label for="description" class="myTextShadow"
              >Product Description:</label
            >
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
            <label for="stock" class="myTextShadow">Stocks Available:</label>
            <div class="gap-2">
              <input
                type="number"
                min="1"
                name="product stock"
                v-model="form.stockQty"
                id="stock"
                class="border-black border-2 px-2 rounded-[5px] myFormInput p-inputtext w-full"
              />
              <div class="mt-3">
                <Button
                  text="-"
                  type="button"
                  padding_x="1.5rem"
                  padding_y="0px"
                  class="!text-[32px]"
                  @click="form.stockQty > 0 ? form.stockQty-- : 0"
                />
                <Button
                  text="+"
                  type="button"
                  padding_x="1.5rem"
                  padding_y="0px"
                  class="!text-[32px] ml-3"
                  @click="form.stockQty += 1"
                />
              </div>
              <span v-if="v$.stockQty.$error" class="text-red-500 text-xs">
                {{ v$.stockQty.$errors[0].$message }}
              </span>
            </div>
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
            <label for="expirationDate" class="myTextShadow"
              >Expiration Date:</label
            >
            <DatePicker
              v-model="form.expirationDate"
              inputId="expirationDate"
              date-format="yy-mm-dd"
              class="expiration-date mobile"
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
              @change="checkImageFile"
              id="image"
              class="w-full"
            />
            <span v-if="v$.image.$error" class="text-red-500 text-xs block">
              {{ v$.image.$errors[0].$message }}
            </span>
          </div>
          <div class="flex justify-end gap-2">
            <Toast v-if="isWindowMobile" class="!right-[5px] !w-[200px]" />

            <button class="text-black bg-mySecondaryColor px-3 py-2 rounded-md">
              Add
            </button>
          </div>
        </form>
      </Dialog>
    </MobileContainer>
  </MainContainer>
</template>

<style scoped>
.form-item {
  margin-bottom: 1rem;
}
:deep(.p-datatable-row-selected) {
  background-color: #74cd5f !important;
  color: black !important;
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

.products-enter-active {
  transition: 0.4 ease all;
}

.products-enter-from,
.products-leave-to {
  opacity: 0;
  transform: scale(0.6);
}

.products-leave-active {
  transition: 0.4 ease all;
}
</style>
