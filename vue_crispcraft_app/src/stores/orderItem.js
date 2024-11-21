import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
export const useOrderItemStore = defineStore("orderItem", () => {
  const selectedProduct = ref({});

  const products = ref([]);
  const isAnyProductNotActive = computed(() => {
    return products.value.some((p) => !p.active);
  });

  async function getSubTotal(id) {
    const response = await axios.get(`query/total/${id}`);

    const { subtotal } = response.data;
    return subtotal;
  }

  async function deleteProduct(id) {
    const test = await axios.delete(`/order-item/${id}`);

    const newProducts = products.value.filter(
      (product) => product.orderItemID != id
    );
    console.log("NEW PRODUUCTS: ", newProducts);
    products.value = newProducts;

    console.log("Selected product:", selectedProduct.value);
  }

  return {
    selectedProduct,
    products,
    deleteProduct,
    isAnyProductNotActive,
    getSubTotal,
  };
});
