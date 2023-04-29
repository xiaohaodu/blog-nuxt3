<template>
    <div ref="pixel" id="pixel">
    </div>
</template>

<script setup>
import Phaser from 'phaser';
import { Boot as BootScene } from '~/assets/game/pixel/js/scene/Boot';
import { Game as GameScene } from '~/assets/game/pixel/js/scene/Game';
const pixel = ref(null);
let config;
let game;
onMounted(() => {
    config = {
        type: Phaser.AUTO,
        parent: pixel.value,
        width: 965,
        physics: {
            default: 'matter',
            matter: {
                // debug: true,
                gravity: { y: 0 },
                setBounds: {
                    left: true,
                    right: true,
                    top: true,
                    bottom: true
                }
            }
        },
        scaleMode: 3,
        scene: [BootScene, GameScene],
    };
    game = new Phaser.Game(config);
    window.focus();
});
onBeforeUnmount(() => {
    game.destroy();
});
</script>

<style lang="scss" scoped>
#pixel {
    width: 100vw;
    height: 100vh;
    text-align: center;
    overflow: hidden;
}
</style>