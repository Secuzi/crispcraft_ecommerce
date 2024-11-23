import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const usePaymentStore = defineStore("payment", () => {
  const products = ref([]);
  const paymentMethod = ref("");

  return { products, paymentMethod };
});
