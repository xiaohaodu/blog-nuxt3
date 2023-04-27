<template>
    <div ref="dreamword" id="dreamword"></div>
</template>

<script setup>
import Phaser from 'phaser';
import { BootScene } from '~/assets/game/dreamword/Scene/BootScene';
import { GameScene } from '~/assets/game/dreamword/Scene/GameScene';
const dreamword = ref(null);
let config;
let game;
onMounted(() => {
    config = {
        type: Phaser.AUTO,
        parent: dreamword.value,
        height: 384,
        width: 768,
        physics: {
            default: 'matter',
            matter: {
                debug: true,
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
#dreamword {
    height: 100vh;
    width: 100vw;
    text-align: center;
    overflow: hidden;
}
</style>