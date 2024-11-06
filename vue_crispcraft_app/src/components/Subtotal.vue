<script setup>
import { reactive } from "vue";

const props = defineProps({
  products: [],
  tableHeaderTextSize: "",
  subTotalTextSize: "",
  dataTextSize: "",
  sumNumberTextSize: "",
});

const calculateSubtotal = () => {
  let sum = 0;
  for (let product of props.products) {
    sum += product.price * product.qty;
  }
  return sum;
};
</script>

<template>
  <table
    class="bg-white shadow-lg w-full font-inter font-semibold rounded-xl overflow-y-auto"
  >
    <thead
      :class="['font-semibold', 'text-start']"
      :style="{ fontSize: tableHeaderTextSize }"
    >
      <tr class="text-left text-shadow text-opacity-50 text-black">
        <th class="px-5 pt-2">Flavor</th>
        <th class="px-5 pt-2">Qty</th>
        <th class="px-5 pt-2">Price</th>
      </tr>
    </thead>
    <tbody
      v-if="props.products"
      class="font-medium text-shadow"
      :style="{ fontSize: dataTextSize }"
    >
      <tr
        v-for="(product, index) in props.products"
        :key="product.productID"
        class="text-opacity-50 text-black"
      >
        <td class="px-5">{{ product.productName }}</td>
        <td class="px-5">x{{ product.qty }}</td>
        <td class="px-5">x{{ product.price }}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr class="text-shadow tfoot-border">
        <th
          class="py-1 text-opacity-50 text-black"
          :style="{ fontSize: subTotalTextSize }"
        >
          Sub Total:
        </th>
        <td></td>
        <td
          class="py-1 text-opacity-50 text-black"
          :style="{ fontSize: sumNumberTextSize }"
        >
          {{ calculateSubtotal() }}
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<style scoped>
.table-cell-padding {
  padding: 1rem; /* Equivalent to Tailwind's p-4 */
}

.tfoot-border {
  border-top: 1px solid black;
}

.table-rounded {
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 0.5rem; /* Adjust based on the desired radius */
  overflow: hidden;
}

.table-box-shadow {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 25%);
}

.text-shadow {
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 25%);
}
</style>
