import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useMerchantStore = defineStore("merchant", () => {
  const merchant = ref("");

  return { address, deliveryCharge };
});
