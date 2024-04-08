<template>
  <div
    ref="breakout"
    id="breakout"
    class="flex h-full items-center justify-center overflow-hidden"
  ></div>
</template>

<script setup lang="ts">
import { Game } from '~/assets/game/breakout/Game';
const breakout = ref() as Ref<HTMLDivElement>;
let game: Phaser.Game;
let config: Phaser.Types.Core.GameConfig;
onMounted(() => {
  console.log(breakout.value);
  config = {
    type: Phaser.AUTO,
    parent: breakout.value,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
    },
    autoFocus: true,
    mode: 3,
    scene: [Game],
    expandParent: false,
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
