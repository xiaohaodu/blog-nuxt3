<template>
  <div>
    <nuxt-link :to="url" :target="target">{{ name }}</nuxt-link>
  </div>
</template>

<script setup lang="ts">
defineProps({
  url: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    default: '_blank',
  },
});
</script>

<style lang="scss" scoped></style>
