<template>
    <div ref="kingAndPigs" id="kingAndPigs"></div>
</template>

<script setup>
import Phaser from 'phaser';
import BootScene from '~/assets/game/kingandpigs/Scene/BootScene';
import GameStart from '~/assets/game/kingandpigs/Scene/GameStart';
import TestScene from '~/assets/game/kingandpigs/Scene/TestScene';
const kingAndPigs = ref(null);
let config;
let game;
onMounted(() => {
    config = {
        type: Phaser.AUTO,
        parent: kingAndPigs.value,
        height: 640,
        width: 960,
        pixelArt: true,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                // debug: true
            }
        },
        scaleMode: 4,
        scene: [BootScene, GameStart, TestScene]
    };
    game = new Phaser.Game(config);
    console.log('Phaser focus');
    window.focus();
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
#kingAndPigs {
    height: 100vh;
    width: 100vw;
    text-align: center;
    overflow: hidden;
}
</style>