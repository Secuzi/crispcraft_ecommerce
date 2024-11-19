import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useOrderItemStore = defineStore("orderItem", () => {
  const selectedProduct = ref({});

  const products = ref([]);

  return { selectedProduct, products };
});
