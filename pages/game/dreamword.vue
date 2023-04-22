<template>
    <div ref="dreamword" id="dreamword"></div>
</template>

<script setup>
import Phaser from 'phaser';
import { BootScene } from '~/assets/game/dreamword/Scene/BootScene';
import { GameScene } from '~/assets/game/dreamword/Scene/GameScene';
const dreamword = ref(null);
onMounted(() => {
    const config = {
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
    const game = new Phaser.Game(config);
    window.focus();
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