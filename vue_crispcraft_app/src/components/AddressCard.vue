<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import LocationIcon from "@/assets/images/icons/location_icon.svg";
const isDisabled = ref(true);

const toggleDisabled = () => {
  isDisabled.value = !isDisabled.value;
};

const props = defineProps({
  addressTextSize: {
    type: String,
    default: "10px",
  },
  deliveryChargeTextSize: {
    type: String,
    default: "10px",
  },
  deliveryAddressTextSize: {
    type: String,
    default: "10px",
  },
  inputTextSize: {
    type: String,
    default: "!text-[10px]",
  },
  imageSize: {
    type: String,
    default: "19px",
  },
});
</script>

<template>
  <div
    class="w-full relative bg-white px-3 py-[10px] rounded-xl border-black border"
  >
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <h3 :style="{ fontSize: addressTextSize }">Address:</h3>
        <InputText
          type="text"
          v-model="value"
          :disabled="isDisabled"
          class="checkout-input"
          :style="{ fontSize: addressTextSize }"
          placeholder="Street/District/City/Country"
        />
      </div>
      <img :src="LocationIcon" :style="{ width: imageSize }" />
    </div>

    <div class="border-t-[1px] border-black flex justify-between mt-3 pt-2">
      <h3
        class="font-semibold myTextShadow"
        :style="{ fontSize: deliveryChargeTextSize }"
      >
        Delivery Charge: Php 60
      </h3>
      <p
        class="font-medium text-[9px] myTextShadow cursor-pointer"
        @click="toggleDisabled"
        :style="{ fontSize: deliveryAddressTextSize }"
      >
        Change Delivery Address
      </p>
    </div>
  </div>
</template>

<style scoped>
:deep(.checkout-input) {
  border-radius: 5px;

  font-weight: bold;
  border: none;
}

:deep(.checkout-input:focus) {
  border-color: red !important;
}
</style>
