<script setup>
import { RouterLink } from "vue-router";

const props = defineProps({
  route: "",
  imageIcon: "",
  text: "",
});
</script>

<template>
  <RouterLink :to="props.route">
    <div
      class="flex items-center justify-center xl:gap-3 2xl:gap-5 bg-[#63A553] rounded-2xl px-4 py-2 myBoxShadow"
    >
      <img :src="imageIcon" class="w-[47px] h-[46px]" />
      <span
        class="text-white flex-grow font-bold myTextShadow text-[24px] text-left"
        >{{ props.text }}</span
      >
    </div>
  </RouterLink>
</template>
