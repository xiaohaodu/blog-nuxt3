<template>
  <div
    ref="knifehit"
    id="knifehit"
    class="flex h-full items-center justify-center overflow-hidden"
  ></div>
</template>

<script setup lang="ts">
import Phaser from 'phaser';
import { PlayGame } from '~/assets/game/knifehit/PlayGame';
//ver 1.2
// 窗口第一次加载...
let game: Phaser.Game;
let gameConfig: Phaser.Types.Core.GameConfig;
const knifehit = ref() as Ref<HTMLDivElement>;
onMounted(() => {
  // 游戏的参数设置
  gameConfig = {
    type: Phaser.AUTO,
    parent: knifehit.value,
    width: 750,
    height: 1334,
    autoFocus: true,
    backgroundColor: 0x444444,
    mode: Phaser.Scale.ScaleModes.HEIGHT_CONTROLS_WIDTH,
    scene: [PlayGame],
    expandParent: false,
  };
  game = new Phaser.Game(gameConfig);
  resize(); //调整窗口,因为默认的缩放策略不能满足
  window.addEventListener('resize', resize, false);
});

const { $loading } = useNuxtApp();
onBeforeMount(() => {
  $loading();
});
onMounted(() => {
  $loading().close();
});
onUnmounted(() => {
  window.removeEventListener('resize', resize);
});
// 按比例调整窗口
function resize() {
  const canvas = knifehit.value.children[0] as HTMLCanvasElement;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const windowRatio = windowWidth / windowHeight;
  const gameRatio = Number(game.config.width) / Number(game.config.height);
  if (windowRatio < gameRatio) {
    canvas.style.width = windowWidth + 'px';
    canvas.style.height = windowWidth / gameRatio + 'px';
  } else {
    canvas.style.width = windowHeight * gameRatio + 'px';
    canvas.style.height = windowHeight + 'px';
  }
}
</script>
