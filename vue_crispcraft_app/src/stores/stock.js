import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useStockStore = defineStore("stock", () => {
  const selectedProduct = ref({});
  return { selectedProduct };
});
