<script setup>
import blockui from "@/presets/aura/blockui";
import { ref } from "vue";
const props = defineProps({
  onClickBehavior: {
    type: Function,
  },
  text: ref(""),
  padding_x: ref(""),
  padding_y: ref(""),
});
</script>

<template>
  <button
    class="myBoxShadow font-bebas myTextShadow bg-white border border-black font-bold rounded-md leading-none"
    :style="{
      paddingBlock: props.padding_y,
      paddingInline: props.padding_x,
      fontSize: '20px',
    }"
    @click="props.onClickBehavior"
  >
    {{ props.text }}
  </button>
</template>

<style scoped></style>
