<template>
  <div>
    <nuxt-link :to="to"></nuxt-link>
  </div>
</template>

<script setup lang="ts">
const { to, icon } = defineProps({
  to: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
  },
});
</script>

<style lang="scss" scoped></style>
