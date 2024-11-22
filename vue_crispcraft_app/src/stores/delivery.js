import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useDeliveryStore = defineStore("delivery", () => {
  const address = ref("");
  const deliveryCharge = ref(0);
  return { address, deliveryCharge };
});
