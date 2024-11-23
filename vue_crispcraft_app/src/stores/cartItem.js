import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
export const useCartStore = defineStore("cart", () => {
  const products = ref([]);
  const isAnyProductNotActive = computed(() => {
    return products.value.some((p) => !p.active);
  });

  async function getSubTotal(id) {
    const response = await axios.get(`query/total/${id}`);

    const { subtotal } = response.data;
    return subtotal;
  }

  async function deleteCartItem(id) {
    console.log("CART ITEM ID: ", id);
    const test = await axios.delete(`/cart-item/${id}`);
    console.log("IN DELETE CART ITEM");
    const newProducts = products.value.filter(
      (product) => product.cartItemID != id
    );
    console.log("NEW PRODUUCTS: ", newProducts);
    products.value = newProducts;
  }

  return { products, isAnyProductNotActive, getSubTotal, deleteCartItem };
});
