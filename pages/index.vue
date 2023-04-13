<template>
    <div id="index">
        <aside id="blogsTree">
            <ul>
                <BlogsTree :blogsTree="blogsTree"></BlogsTree>
            </ul>
        </aside>
        <div id="blogShow">
            <BlogShow :blogContent="blogContent"></BlogShow>
        </div>
    </div>
</template>

<script lang="ts" setup>

const blogsTree = await $fetch('/api/blogsTree')
const readme = await $fetch('/api/blogReadme');
let blogContent = ref(readme)
provide('setBlogContent', (content) => {
    blogContent.value = content
})
onMounted(() => {
})
</script>

<style lang="scss" scoped>
@import '../assets/theme/theme.scss';

#index {
    display: flex;

    #blogsTree {
        height: 100vh;
        padding: 5vh 2vw 0 0;
        @include theme-border();
    }

    #blogShow {}
}
</style>