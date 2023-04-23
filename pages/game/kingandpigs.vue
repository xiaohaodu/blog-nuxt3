<template>
    <div ref="kingAndPigs" id="kingAndPigs">

    </div>
</template>

<script setup>
import Phaser from 'phaser';
const kingAndPigs = ref(null);
onMounted(() => {
    const config = {
        type: Phaser.AUTO,
        parent: kingAndPigs.value,
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
        scene: []
    };
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