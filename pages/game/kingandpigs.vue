<template>
    <div ref="kingAndPigs" id="kingAndPigs"></div>
</template>

<script setup>
import Phaser from 'phaser';
import { BootScene } from '~/assets/game/kingandpigs/BootScene';
import { GameStart } from '~/assets/game/kingandpigs/GameStart';
const kingAndPigs = ref(null);
onMounted(() => {
    const config = {
        type: Phaser.AUTO,
        parent: kingAndPigs.value,
        pixelArt: true,
        physics: {
            default: 'matter',
            matter: {
                debug: true,
                gravity: { y: 50 },
                setBounds: {
                    left: true,
                    right: true,
                    top: true,
                    bottom: true
                }
            }
        },
        scaleMode: 3,
        scene: [BootScene, GameStart]
    };
    const game = new Phaser.Game(config);
    window.focus();
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