<template>
  <Navigation></Navigation>
  <router-view></router-view>
</template>
<script lang="ts" setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `BlogOfXH-${titleChunk}` : 'BlogOfXH';
  }
})
const isRouterAlive = ref(true)
const reload = () => {
  isRouterAlive.value = false
  //通过this.$nextTick()产生一个微任务,在一次dom事件循环后,重新创建组件
  nextTick(() => {
    console.log('reload');
    isRouterAlive.value = true
  })
}
provide('reload', reload)
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>