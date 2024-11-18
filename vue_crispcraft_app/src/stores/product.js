import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useProductStore = defineStore("product", () => {
  const selectedProduct = ref({});
  const products = ref([]);
  const previousProduct = ref({});
  function setProducts(newProducts) {
    products.value = newProducts.map((product) => ({
      ...product,
      active: false,
    }));
  }

  function toggleActive(productID) {
    products.value = products.value.map((product) => {
      if (product.productID === productID) {
      }
    });
  }

  function getProduct(id) {
    selectedProduct.value = id;
  }
  return { selectedProduct, getProduct };
});
