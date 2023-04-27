<template>
    <div ref="knifehit" id="knifehit">

    </div>
</template>

<script setup>
import Phaser from 'phaser';
import { playGame } from '~/assets/game/knifehit/playGame.js';
//ver 1.2
// 窗口第一次加载...
let game;
let gameConfig;
const knifehit = ref(null);
onMounted(() => {
    // 游戏的参数设置
    gameConfig = {
        type: Phaser.AUTO,
        parent: knifehit.value,
        width: 750,
        height: 1334,
        backgroundColor: 0x444444,
        scene: [playGame]
    };
    game = new Phaser.Game(gameConfig);
    window.focus();//获得窗口焦点
    resize();//调整窗口
    window.addEventListener("resize", resize, false);
});

onBeforeUnmount(() => {
    game.destroy();
});
// 按比例调整窗口
function resize() {
    const canvas = document.querySelector("canvas");
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const windowRatio = windowWidth / windowHeight;
    const gameRatio = game.config.width / game.config.height;
    if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
} 
</script>

<style lang="scss" scoped>
#knifehit {
    height: 100vh;
    width: 100vw;
    text-align: center;
    overflow: hidden;
}
</style>