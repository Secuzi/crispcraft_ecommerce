import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useFlavorStore = defineStore("flavor", () => {
  const flavors = ref([]);
  return { flavors };
});
