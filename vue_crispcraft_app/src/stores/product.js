import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
export const useProductStore = defineStore("product", () => {
  const selectedProduct = ref({});
  const products = ref([]);

  async function deleteProduct(id) {
    const test = await axios.delete(`/products/${id}`);

    console.log("IN DELETE PRODUCTS: ");
    const product = products.value.find((x) => x.productID == id);
    await axios.delete(`/flavors/${product.flavorID}`);
    const newProducts = products.value.filter(
      (product) => product.productID != id
    );
    products.value = newProducts;
    console.log("Selected product:", selectedProduct.value);
  }

  function getProduct(id) {
    selectedProduct.value = id;
  }

  async function fetchProductDetails(id) {
    const response = await axios.get(`/products/${id}`);
    return response.data;
  }
  return {
    selectedProduct,
    getProduct,
    deleteProduct,
    products,
    fetchProductDetails,
  };
});
