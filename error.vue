<template>
    <div class="NotFound">
        <img src="@/assets/imgs/NotFound.svg" />
        <div class="tip">/404/<br><br>一只狗吃了这个页面</div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    error: Object
});
</script>

<style lang="scss" scoped>
.NotFound {
    height: 100vh;
    width: 100vw;
    background-color: rgb(255, 228, 234);

    >img {
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