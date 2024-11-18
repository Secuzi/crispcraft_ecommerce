import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useInventoryStore = defineStore("inventory", () => {
  const inventories = ref([]);

  return { inventories };
});
