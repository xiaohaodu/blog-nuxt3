<template>
    <nav id="nav">
        <li>
            <nuxt-link to="/blogs/README">to blogs</nuxt-link>
        </li>
        <li>
            <nuxt-link to="/">to home</nuxt-link>
        </li>
        <li>
            <nuxt-link to="/three/box">to box</nuxt-link>
        </li>
        <li>
            <nuxt-link to="/three/bear">to bear</nuxt-link>
        </li>
        <li>
            <nuxt-link to="/three/vrhouse">to vrhouse</nuxt-link>
        </li>
        <li>
            <nuxt-link to="/game/pixel">to pixel</nuxt-link>
        </li>
        <li>
            <nuxt-link to="/game/knifehit">to knifehit</nuxt-link>
        </li>
        <li>
            <nuxt-link to="/game/platepixel">to platepixel</nuxt-link>
        </li>
        <li>
            <Switch></Switch>
        </li>
    </nav>
</template>

<script setup>
// const props = defineProps([]);
</script>

<style lang="scss" scoped>
#nav {
    position: fixed;
    top: 5vh;
    right: 10vw;
    z-index: 2;
}
</style>