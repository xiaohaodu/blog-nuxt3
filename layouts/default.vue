<template>
  <Navigation></Navigation>
  <div>
    <slot name="main">
      <router-view></router-view>
    </slot>
    <slot name="foot">
      <div class="fixed bottom-2 w-full text-xs">
        <div class="flex w-full items-center justify-center">
          <a href="https://beian.miit.gov.cn/" target="_blank">冀ICP备2022022916</a>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <a
            href="https://beian.mps.gov.cn/#/query/webSearch?code=51159902000145"
            rel="noreferrer"
            target="_blank"
            >川公网安备51159902000145</a
          >
        </div>
      </div>
    </slot>
  </div>
</template>
