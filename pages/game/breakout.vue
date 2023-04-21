<template>
    <div ref="breakout" id="breakout">

    </div>
</template>

<script setup>
const breakout = ref(null);
onMounted(() => {
    const config = {
        type: Phaser.AUTO,
        parent: breakout.value,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade'
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };
    const game = new Phaser.Game(config);
});
</script>

<style lang="scss" scoped>
#breakout {
    height: 100vh;
    width: 100vw;
    text-align: center;
    overflow: hidden;
}
</style>