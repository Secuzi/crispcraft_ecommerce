import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useOrderStore = defineStore("order", () => {
  const selectedProduct = ref({});
  const products = ref([]);
  const paymentMethod = ref("");

  async function deleteOrder(id) {
    const test = await axios.delete(`/order-item/${id}`);
    console.log("IN DELETE ORDER ITEM");
    const newProducts = products.value.filter(
      (product) => product.orderItemID != id
    );
    console.log("NEW PRODUUCTS: ", newProducts);
    products.value = newProducts;

    console.log("Selected product:", selectedProduct.value);
  }

  return { selectedProduct, products, paymentMethod };
});
