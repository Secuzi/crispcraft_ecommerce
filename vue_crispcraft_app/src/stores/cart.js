import { ref, computed } from "vue";
import { defineStore } from "pinia";
import ProductSweetCheese from "@/assets/images/BAG of CHIPS/cheese.png";
import ProductCheesyHot from "@/assets/images/BAG of CHIPS/cheesyhot.png";
import ProductChiliHot from "@/assets/images/BAG of CHIPS/chilihot.png";
import ProductSaltedOnion from "@/assets/images/BAG of CHIPS/onion.png";
export const useCartStore = defineStore("cart", () => {
  const products = ref([
    {
      id: 1,
      image: ProductCheesyHot,
      productName: "MC Cheesy Hot",
      colorTheme: "#EF9426",
      flavor: "Cheesy Hot",
      price: 100,
      stock: 99,
      qty: 2,
      isFontBlack: true,
      description:
        "Experience the delightful crunch of our Cheesy Hot Malunggay Chips—nutritious, flavorful, and perfect for satisfying your snack cravings!",
    },
    {
      id: 2,
      image: ProductSaltedOnion,
      colorTheme: "#AE76B8",
      productName: "MC Salted Onion",
      flavor: "Salted Onion",
      isFontBlack: false,
      price: 200,
      stock: 39,
      qty: 2,
      description:
        "Enjoy our Malunggay Chips with Salted Onion flavor—crispy, nutritious, and bursting with savory goodness. A delightful snack for every occasion!",
    },
    {
      id: 3,
      image: ProductChiliHot,
      colorTheme: "#863E24",
      productName: "MC Chili Hot",
      flavor: "Chili Hot",
      isFontBlack: false,
      price: 300,
      stock: 25,
      qty: 2,
      description:
        "Spice up your snack time with our Malunggay Chips in Chili Hot flavor—crispy, zesty, and packed with a fiery kick! Perfectly addictive!",
    },
    {
      id: 4,
      image: ProductSweetCheese,
      colorTheme: "#EBCB5F",
      productName: "MC Sweet Cheese",
      flavor: "Sweet Cheese",
      isFontBlack: true,
      price: 200,
      stock: 69,
      qty: 2,
      description:
        "Indulge in our Sweet Cheese Malunggay Chips—crispy and perfectly sweetened with cheesy goodness. A unique treat for every snack lover!",
    },
    {
      id: 5,
      image: ProductSweetCheese,
      colorTheme: "#EBCB5F",
      productName: "MC Sweet Cheese",
      flavor: "Sweet Cheese",
      isFontBlack: true,
      price: 345,
      stock: 69,
      qty: 2,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at risus vel nisi volutpat facilisis. Enjoy the perfect blend of flavor and texture!",
    },
    {
      id: 6,
      image: ProductSweetCheese,
      colorTheme: "#EBCB5F",
      productName: "MC Sweet Cheese",
      flavor: "Sweet Cheese",
      isFontBlack: true,
      price: 345,
      stock: 69,
      qty: 2,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at risus vel nisi volutpat facilisis. Enjoy the perfect blend of flavor and texture!",
    },
    {
      id: 7,
      image: ProductSweetCheese,
      colorTheme: "#EBCB5F",
      productName: "MC Sweet Cheese",
      flavor: "Sweet Cheese",
      isFontBlack: true,
      price: 345,
      stock: 69,
      qty: 2,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at risus vel nisi volutpat facilisis. Enjoy the perfect blend of flavor and texture!",
    },
  ]);

  const subtotal = computed(() => {
    return products.value.reduce(
      (sum, product) => sum + product.price * product.qty,
      0
    );
  });

  function removeProduct(id) {
    const newProducts = products.value.filter((product) => product.id != id);
    products.value = newProducts;
  }

  return { products, subtotal, removeProduct };
});
