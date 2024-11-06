<script setup>
import { reactive } from "vue";

const props = defineProps({
  products: [],
});

const calculateSubtotal = () => {
  let sum = 0;
  for (let product in products) {
    sum += product.price;
  }
  return sum;
};
</script>

<template>
  <!-- Container -->
  <!-- <div>
    <div>
      <div>
        <h2>Flavor</h2>
        <h2>Qty</h2>
        <h2>Price</h2>
      </div>
    </div>
  </div> -->

  <table>
    <thead>
      <tr>
        <th>Flavor</th>
        <th>Qty</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody v-if="props.products">
      <tr v-for="product in products" :key="product.productID">
        <td>{{ product.productName }}</td>
        <td>x{{ product.qty }}</td>
        <td>x{{ product.price }}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th>Sub Total:</th>
        <td>{{ calculateSubtotal }}</td>
      </tr>
    </tfoot>
  </table>
</template>

<style scoped>
.table-box-shadpow {
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 25%);
}
</style>
