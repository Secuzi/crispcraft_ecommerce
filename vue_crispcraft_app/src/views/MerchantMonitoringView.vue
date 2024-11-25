<script setup>
import ChecklistIcon from "@/assets/images/icons/checklists.svg";
import TransactionIcon from "@/assets/images/icons/transaction.svg";
import ClerkIcon from "@/assets/images/icons/clerk.svg";
import MainContainer from "@/components/MainContainer.vue";
import DesktopContainer from "@/components/DesktopContainer.vue";
import Navbar from "@/components/Navbar.vue";
import AdminButton from "@/components/AdminButton.vue";
import HeaderText from "@/components/HeaderText.vue";
import useVuelidate from "@vuelidate/core";
import axios from "axios";
import { useMerchantStore } from "@/stores/merchant";
import {
  required,
  helpers,
  email,
  numeric,
  maxLength,
  minLength,
} from "@vuelidate/validators";
import { IconField, InputIcon, InputText, Toast } from "primevue";
import { onMounted, ref, watch, reactive } from "vue";
import { useToast } from "primevue";
const toast = useToast();
const form = reactive({
  fName: "",
  lName: "",
  phoneNumber: "",
  telNumber: "",
  email: "",
  password: "",
});

const isPasswordHidden = ref(true);
const togglePassword = () => {
  isPasswordHidden.value = !isPasswordHidden.value;
};
const rules = {
  fName: {
    required: helpers.withMessage("First name cannot be empty!", required),
  },
  lName: {
    required: helpers.withMessage("Last name cannot be empty!", required),
  },
  password: {
    required: helpers.withMessage("Password cannot be empty!", required),
  },
  phoneNumber: {
    required: helpers.withMessage("Phone number cannot be empty!", required),
    numeric: helpers.withMessage("Phone number must be a number!", numeric),
    maxLength: helpers.withMessage(
      "Phone number must be exactly 11 characters long!",
      maxLength(11)
    ),
    minLength: helpers.withMessage(
      "Phone number must be exactly 11 characters long!",
      minLength(11)
    ),
  },
  telNumber: {
    required: helpers.withMessage(
      "Telephone number cannot be empty!",
      required
    ),
    numeric: helpers.withMessage("Telephone number must be a number!", numeric),
    maxLength: helpers.withMessage(
      "Phone number must be exactly 11 characters long!",
      maxLength(11)
    ),
    minLength: helpers.withMessage(
      "Phone number must be exactly 11 characters long!",
      minLength(11)
    ),
  },
  email: {
    required: helpers.withMessage("Email name cannot be empty!", required),
    email: helpers.withMessage("Invalid email format!", email),
  },
};
const merchantStore = useMerchantStore();

const v$ = useVuelidate(rules, form);
async function submitForm() {
  try {
    v$.value.$touch();
    if (v$.value.$errors.length > 0) {
      console.log("errors: ", v$.value.$errors);
      return;
    }

    //Post to merchant
    const response = await axios.post("/merchant", form);
    console.log("MERCHANT RESPONSE: ", response.data);
    console.log("merchant: ", response.data);
    const getMerchant = await axios.get(
      `/merchant/${response.data.merchantID}`
    );
    merchantStore.merchants.push(getMerchant.data.merchant);

    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Successfully added Merchant!",
      life: 3000,
    });
  } catch (e) {
    console.log(e);
  }
}

onMounted(async () => {
  //Get all merchants

  const response = await axios.get("/merchant");
  merchantStore.merchants = response.data.merchants;
  console.log("RESPONSE: ", response.data);

  merchantStore.selectedMerchant = merchantStore.merchants[0].merchantID;
});
</script>

<template>
  <MainContainer>
    <Navbar />
    <DesktopContainer
      backgroundColor="bg-[#D6F3FF]"
      alignItems="flex-start"
      class=""
    >
      <section class="flex-grow">
        <div class="w-[90%] mx-auto grid grid-cols-[1.1fr_2fr_1.1fr] gap-7">
          <section class="flex-grow">
            <HeaderText
              featuredText="Merchant"
              productsText="Monitoring"
              textSize="47px"
            />
            <div
              class="bg-white flex py-[5rem] max-w-[401px] flex-col gap-9 justify-center px-5 rounded-2xl mt-[5.7rem]"
            >
              <AdminButton
                route="/admin/stock"
                :imageIcon="ChecklistIcon"
                text="Inventory"
              />

              <AdminButton
                route="/admin/transactions"
                :imageIcon="TransactionIcon"
                text="Transactions"
              />

              <AdminButton
                route="/admin/merchants"
                :imageIcon="ClerkIcon"
                text="Merchants"
              />
            </div>
          </section>

          <section class="flex-grow">
            <!-- Transaction log -->
            <div class="h-[84px] flex flex-col justify-center">
              <IconField>
                <InputIcon class="pi pi-search" />
                <InputText
                  placeholder="Search Merchant"
                  class="!text-[20px] !focus:border-myPrimaryColor"
                />
              </IconField>
            </div>
            <div
              class="bg-white py-[24px] px-[19px] rounded-[10px] myTextShadow mt-[5rem] h-[600px] overflow-auto"
            >
              <h2 class="text-[20px] font-semibold mb-4">Merchant List</h2>
              <!-- Main container for the list of logs -->
              <div v-if="merchantStore.merchants.length > 0">
                <div
                  v-for="(merchant, index) in merchantStore.merchants"
                  :key="merchant.merchantID"
                  class="myBoxShadow cursor-pointer bg-[#ECECEC] rounded-lg px-5 py-2"
                  :class="[index !== 0 ? 'mt-6' : '']"
                >
                  <!-- First row -->
                  <div class="flex justify-between mb-5 items-center">
                    <span class="font-bold text-[18px]"
                      >{{ merchant.fName }} {{ merchant.lName }}</span
                    >
                    <span>ID: {{ merchant.merchantID }}</span>
                  </div>
                  <!-- Second row -->
                  <div class="flex justify-between items-center">
                    <!-- Customer info -->
                    <div>
                      <p>Cell #: {{ merchant.phoneNumber }}</p>
                      <p>Tel #: {{ merchant.telNumber }}</p>
                      <p>Email: {{ merchant.email }}</p>
                    </div>
                    <!-- Remove Merchant Button -->
                    <div>
                      <button
                        @click="
                          merchantStore.deleteMerchant(merchant.merchantID)
                        "
                        class="myBoxShadow text-white text-[15px] font-bold py-2 px-4 bg-[#F63636] rounded-full"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="mt-[10rem] pb-[5rem] flex-grow font-bold text-[18px]">
            <div
              class="font-medium italic text-[16px] mb-11 px-6 py-4 myTextShadow myBoxShadow bg-white rounded-[30px]"
            >
              <form
                v-on:submit.prevent="submitForm"
                class="bg-white rounded-xl"
                enctype="multipart/form-data"
              >
                <div class="form-item">
                  <label for="firstName" class="myTextShadow"
                    >First Name:</label
                  >
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    v-model="form.fName"
                    placeholder="Enter first name"
                    class="border-black p-3 border-2 rounded-[5px] myFormInput block w-full myFormInput p-inputtext"
                  />
                  <span v-if="v$.fName.$error" class="text-red-500 text-xs">
                    {{ v$.fName.$errors[0].$message }}
                  </span>
                </div>
                <div class="form-item">
                  <label for="lastName" class="myTextShadow">Last Name:</label>
                  <input
                    type="text"
                    name="lastName"
                    v-model="form.lName"
                    id="lastName"
                    placeholder="Enter last name"
                    class="border-black p-3 border-2 rounded-[5px] block w-full myFormInput p-inputtext"
                  />
                  <span v-if="v$.lName.$error" class="text-red-500 text-xs">
                    {{ v$.lName.$errors[0].$message }}
                  </span>
                </div>

                <div class="form-item">
                  <label for="email" class="myTextShadow">Email:</label>
                  <input
                    type="email"
                    name="email"
                    v-model="form.email"
                    id="email"
                    placeholder="Enter email"
                    class="border-black p-3 border-2 rounded-[5px] block w-full myFormInput p-inputtext"
                  />
                  <span v-if="v$.email.$error" class="text-red-500 text-xs">
                    {{ v$.email.$errors[0].$message }}
                  </span>
                </div>

                <div class="form-item relative">
                  <label for="password" class="myTextShadow">Password:</label>
                  <input
                    name="password"
                    v-model="form.password"
                    id="password"
                    v-bind:type="isPasswordHidden ? 'password' : 'text'"
                    placeholder="Enter temporary password"
                    class="border-black p-3 border-2 rounded-[5px] block w-full myFormInput p-inputtext"
                  />
                  <i
                    class="pi text-black absolute bottom-3 right-3 cursor-pointer text-base"
                    :class="isPasswordHidden ? 'pi-eye-slash' : 'pi-eye'"
                    @click="togglePassword"
                  ></i>
                  <span v-if="v$.password.$error" class="text-red-500 text-xs">
                    {{ v$.password.$errors[0].$message }}
                  </span>
                </div>

                <div class="form-item">
                  <label for="phoneNumber" class="myTextShadow">Cel #:</label>
                  <input
                    type="text"
                    v-model="form.phoneNumber"
                    name="phoneNumber"
                    id="phoneNumber"
                    class="border-black w-full border-2 p-3 rounded-[5px] block myFormInput p-inputtext"
                  />
                  <span
                    v-if="v$.phoneNumber.$error"
                    class="text-red-500 text-xs"
                  >
                    {{ v$.phoneNumber.$errors[0].$message }}
                  </span>
                </div>
                <div class="form-item">
                  <label for="telNumber" class="myTextShadow">Tel #:</label>
                  <input
                    type="tel"
                    v-model="form.telNumber"
                    name="telNumber"
                    id="telNumber"
                    class="border-black w-full border-2 p-3 rounded-[5px] block myFormInput p-inputtext"
                  />
                  <span v-if="v$.telNumber.$error" class="text-red-500 text-xs">
                    {{ v$.telNumber.$errors[0].$message }}
                  </span>
                </div>

                <div class="flex justify-end">
                  <Toast />
                  <button
                    type="submit"
                    class="bg-[#3672F6] mt-3 text-white px-5 rounded-full myBoxShadow font-bold text-[24px] py-[6px] myTextShadow"
                  >
                    Add Merchant
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </section>
    </DesktopContainer>
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
</style>
