<template>
    <Head>
        <Title>{{ router.currentRoute.value.params.blogName }}</Title>
    </Head>
    <div id="blogs">
        <aside id="blogsTree">
            <ul>
                <BlogsTree :blogsTree="blogsTree" :active="router.currentRoute.value.params.blogName"></BlogsTree>
            </ul>
        </aside>
        <div id="blogShow">
            <BlogShow :blogContent="blogContent"></BlogShow>
        </div>
    </div>
</template>

<script setup>
const router = useRouter();
// useHead({
//     title: router.currentRoute.value.params.blogName
// });
const blogsTree = await $fetch('/api/blogsTree');
const readme = await $fetch('/api/blogReadme');
let blogContent = ref(readme);
let blogPath = ref('');
provide('setBlogPath', async (content) => {
    blogPath.value = content;
    blogContent.value = await $fetch('/api/readblog', { params: { path: blogPath.value } });
});
onMounted(() => {
});
</script>

<style lang="scss" scoped>
@import '../assets/theme/theme.scss';

#blogs {
    display: flex;

    #blogsTree {
        height: 100vh;
        padding: 5vh 2vw 0 0;
        @include theme-border();
    }
}
</style>