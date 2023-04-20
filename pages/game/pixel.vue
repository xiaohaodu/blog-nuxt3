<template>
    <div ref="pixel" id="pixel">
    </div>
</template>

<script setup>
import Phaser from 'phaser';
import { Boot as BootScene } from '~/assets/game/pixel/js/scene/Boot.js';
import { Game as GameScene } from '~/assets/game/pixel/js/scene/Game.js';
const pixel = ref(null);
onMounted(() => {
    const config = {
        type: Phaser.AUTO,
        parent: pixel.value,
        width: pixel.value.clientWidth - 1,
        height: pixel.value.clientHeight - 1,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 200 }
            }
        },
        scence: [BootScene, GameScene],
    };
    const game = new Phaser.Game(config);
});
</script>

<style lang="scss" scoped>
#pixel {
    width: 100vw;
    height: 100vh;
}
</style>