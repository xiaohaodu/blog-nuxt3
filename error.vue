<template>
  <div class="NotFound">
    <img src="@/assets/imgs/NotFound.svg" />
    <div class="tip">
      {{ error.statusCode }}<br /><br />
      {{ error.message }}
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  error: Object as any,
});
</script>

<style lang="scss" scoped>
.NotFound {
  min-height: 100vh;
  width: 100vw;
  background-color: rgb(255, 228, 234);
  overflow: hidden;

  > img {
    height: 60vh;
    display: block;
    margin: 0 auto;
  }

  .tip {
    font-size: 42px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 15px;
  }
}
</style>
