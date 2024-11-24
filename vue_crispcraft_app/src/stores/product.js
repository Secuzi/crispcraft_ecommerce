import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
export const useProductStore = defineStore("product", () => {
  const selectedProduct = ref({});
  const products = ref([]);

  async function deleteProduct(id) {
    const getProductResponse = await axios.get(`/products/${id}`);
    const getProduct = getProductResponse.data.product;
    const inventoryProduct = products.value.find(
      (p) => p.productID === getProduct.productID
    );
    const test = await axios.delete(
      `/inventory/${inventoryProduct.inventoryID}`
    );
    getProduct.active = 0;
    await axios.put(`/products/${getProduct.productID}`, getProduct);

    const newProducts = products.value.filter(
      (product) => product.inventoryID != inventoryProduct.inventoryID
    );
    products.value = newProducts;
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
