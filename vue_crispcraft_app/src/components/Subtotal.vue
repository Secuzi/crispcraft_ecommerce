<script setup>
import { computed, ref } from "vue";
import CloseIcon from "@/assets/images/icons/EX.svg";

const props = defineProps({
  products: ref([]),
  tableHeaderTextSize: "",
  subTotalTextSize: "",
  dataTextSize: "",
  sumNumberTextSize: "",
  height: "",
  imageClick: {
    type: Function,
  },
  subtotal: null,
  active: {
    type: Boolean,
  },
});
// Query this

const calculateSubtotal = computed(() => {
  let sum = 0;
  for (let product of props.products) {
    sum += product.quantity * product.price;
  }
  return sum;
});
</script>

<template>
  <div class="table-container" :style="{ maxHeight: height }">
    <table
      class="bg-white shadow-lg w-full font-inter font-semibold rounded-xl"
    >
      <thead
        :class="['font-semibold', 'text-start']"
        :style="{ fontSize: tableHeaderTextSize }"
      >
        <tr class="text-left text-shadow text-opacity-50 text-black">
          <th class="px-5 pt-2 rounded-tl-xl">Flavor</th>
          <th class="px-5 pt-2">Qty</th>
          <th class="px-5 pt-2 rounded-tr-xl">Price</th>
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
          :class="[
            product.active == 1
              ? 'text-black'
              : 'text-red-500 !text-opacity-100',
          ]"
          class="text-opacity-50 text-black cursor-pointer relative"
        >
          <td class="px-5">{{ product.flavorName }}</td>
          <td class="px-5">x{{ product.quantity }}</td>
          <td class="px-5">{{ product.price }}</td>
          <div>
            <img
              :src="CloseIcon"
              @click="imageClick(product.cartItemID)"
              alt="Close icon"
              class="absolute right-2 top-[50%] translate-y-[-50%] w-[12px]"
            />
          </div>
        </tr>
      </tbody>
      <tfoot>
        <tr class="text-shadow tfoot-border">
          <th
            class="py-1 text-opacity-50 text-black rounded-bl-xl"
            :style="{ fontSize: subTotalTextSize }"
          >
            Sub Total:
          </th>
          <td
            colspan="2"
            class="py-1 text-opacity-50 text-black rounded-br-xl"
            :style="{ fontSize: sumNumberTextSize }"
          >
            &#8369; {{ calculateSubtotal }}
          </td>
        </tr>
        <tr v-if="!props.active">
          <th class="py-1 px-5 text-opacity-50 text-black rounded-bl-xl">
            <span class="font-medium text-[12px] text-red-500"
              >A product is unavailable</span
            >
          </th>
        </tr>
      </tfoot>
    </table>
  </div>
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

.table-container {
  max-height: 191px; /* Set your desired height */
  overflow-y: auto; /* Enable vertical scrolling */
}

.table-container table {
  width: 100%; /* Ensure the table takes full width */
}

thead th {
  position: sticky; /* Make header sticky */
  top: 0; /* Stick to the top */
  background-color: white; /* Background color to cover content beneath */
}

tfoot tr {
  position: sticky;
  bottom: 0;
  background-color: white;
}

.table-box-shadow {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 25%);
}

.text-shadow {
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 25%);
}
</style>
