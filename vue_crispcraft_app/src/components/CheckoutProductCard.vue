<script setup>
//state store for cart??
import { useCartStore } from "@/stores/cart";
import CloseIcon from "@/assets/images/icons/EX.svg";
import { useProductStore } from "@/stores/product";
const prop = defineProps({
  image: "",
  header: "",
  qty: null,
  price: null,
  id: null,
  description: "",
  fontSizeHeader: {
    type: String,
    default: "16px",
  },
  fontSizeBody: {
    type: String,
    default: "14px",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});
//What should be inside the product store?
//quantity
//

function test(id) {
  console.log(id);
}

function test2(id) {
  console.log("remove", id);
}

const productStore = useProductStore();
</script>

<template>
  <div
    class="px-5 py-3 transition-all duration-[400ms] ease-in-out flex rounded-xl gap-5 relative cursor-pointer"
    tabindex="0"
    :class="[isActive ? 'bg-white' : 'bg-[#D9D9D9]']"
    @click="productStore.getProduct(prop.id)"
  >
    <img
      :src="CloseIcon"
      alt="Close Icon"
      class="absolute right-[5px] top-[5px] w-5 cursor-pointer"
      @click="test2(prop.id)"
    />

    <div class="max-w-[60px] flex items-center">
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
        <p>
          {{ description }}
        </p>
        <div class="flex justify-between items-center">
          <span
            class="font-semibold myTextShadow"
            :style="{ fontSize: fontSizeBody }"
            >Quantity: {{ qty }}</span
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
