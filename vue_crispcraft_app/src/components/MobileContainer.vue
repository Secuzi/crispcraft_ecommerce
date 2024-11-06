<script setup>
const props = defineProps({
  backgroundColor: {
    type: String,
    default: "bg-mySecondaryColor",
  },
});
</script>
<template>
  <main
    :class="[props.backgroundColor, 'grow', 'flex', 'flex-col', 'md:hidden']"
  >
    <!-- Some content -->
    <slot></slot>
  </main>
  <div class="bg-myPrimaryColor h-[49px] w-full md:hidden"></div>
</template>
