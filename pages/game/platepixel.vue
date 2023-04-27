<template>
    <div ref="platepixel" id="platepixel">

    </div>
</template>

<script setup>
import Phaser from 'phaser';
import { playGame } from '~/assets/game/platepixel/playGame';
const platepixel = ref(null);
let config;
let game;
onMounted(() => {
    config = {
        type: Phaser.AUTO,
        parent: platepixel.value,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        scaleMode: 3,
        scene: [playGame]
    };
    game = new Phaser.Game(config);
    console.log(game);
});
onBeforeUnmount(() => {
    game.destroy();
});
</script>

<style lang="scss" scoped>
#platepixel {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
}
</style>