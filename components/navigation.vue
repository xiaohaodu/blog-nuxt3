<template>
    <nav id="nav">
        <li>
            <nuxt-link to="/blogs/README">to blogs</nuxt-link>
        </li>
        <li>
            <nuxt-link to="/">to home</nuxt-link>
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