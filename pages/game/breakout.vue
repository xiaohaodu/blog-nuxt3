<template>
    <div ref="breakout" id="breakout">

    </div>
</template>

<script setup>
import { Game } from '@/assets/game/breakout/game';
const breakout = ref(null);
let config;
let game;
onMounted(() => {
    config = {
        type: Phaser.AUTO,
        parent: breakout.value,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade'
        },
        scaleMode: 3,
        scene: [Game]
    };
    game = new Phaser.Game(config);
});
const { $loading } = useNuxtApp();
onBeforeMount(() => {
    $loading();
});
onMounted(() => {
    $loading().close();
});
</script>

<style lang="scss" scoped>
#breakout {
    height: 100vh;
    width: 100vw;
    text-align: center;
    overflow: hidden;
}
</style>