import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useOrderStore = defineStore("order", () => {
  const selectedProduct = ref({});
  const products = ref([]);

  return { selectedProduct, products };
});
