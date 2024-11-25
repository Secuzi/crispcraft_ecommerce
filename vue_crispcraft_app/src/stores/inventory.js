import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useInventoryStore = defineStore("inventory", () => {
  const inventories = ref([]);
  const selectedInventory = ref();

  async function deleteInventory(id) {
    const test = await axios.delete(`/inventory/${id}`);

    console.log("IN DELETE INVENTORY: ");
    const newInventories = inventories.value.filter(
      (inventory) => inventory.inventoryID != id
    );
    inventories.value = newInventories;
    console.log("Selected inventory:", selectedInventory.value);
  }

  return { inventories, selectedInventory, deleteInventory };
});
