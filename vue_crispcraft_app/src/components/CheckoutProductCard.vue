<script setup>
//state store for cart??
import { useCartStore } from "@/stores/cart";
import CloseIcon from "@/assets/images/icons/EX.svg";

const prop = defineProps({
  image: "",
  header: "",
  qty: null,
  price: null,
  id: null,
  fontSizeHeader: {
    type: String,
    default: "16px",
  },
  fontSizeBody: {
    type: String,
    default: "14px",
  },
});

const cartStore = useCartStore();
</script>

<template>
  <div class="px-3 py-3 bg-[#D9D9D9] flex rounded-xl gap-5 relative">
    <img
      :src="CloseIcon"
      alt="Close Icon"
      class="absolute right-[-5px] w-5 top-[-5px] cursor-pointer"
      @click="cartStore.removeProduct(prop.id)"
    />

    <div class="max-w-[50px]">
      <img :src="image" alt="image" />
    </div>
    <div class="flex-grow">
      <div class="flex flex-col justify-between h-full">
        <p
          class="font-extrabold myTextShadow"
          :style="{ fontSize: fontSizeHeader }"
        >
          {{ header }}
        </p>
        <div class="flex justify-between items-center">
          <span
            class="font-semibold myTextShadow"
            :style="{ fontSize: fontSizeBody }"
            >Qty: {{ qty }}</span
          >
          <span
            class="font-medium myTextShadow"
            :style="{ fontSize: fontSizeBody }"
            >Price: Php {{ price }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
