import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
export const useProductStore = defineStore("product", () => {
  const selectedProduct = ref({});
  const products = ref([]);

  async function deleteProduct(id) {
    const test = await axios.delete(`/products/${id}`);

    const newProducts = products.value.filter(
      (product) => product.productID != id
    );
    products.value = newProducts;
  }

  function getProduct(id) {
    selectedProduct.value = id;
  }
  return { selectedProduct, getProduct, deleteProduct, products };
});
