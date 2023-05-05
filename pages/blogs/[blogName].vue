<template>
    <Head>
        <Title>{{ router.currentRoute.value.params.blogName }}</Title>
    </Head>
    <div id="blogs">
        <aside id="blogsTree">
            <ul>
                <BlogsTree :blogsTree="blogsTree" :active="active">
                </BlogsTree>
            </ul>
        </aside>
        <div id="blogShow">
            <BlogShow :blogContent="blogContent"></BlogShow>
        </div>
    </div>
</template>

<script setup>
const router = useRouter();
const blogsTree = await $fetch('/api/blogsTree');
const initContent = await $fetch('/api/readblog', {
    params: { path: `public/_${decodeURIComponent(router.currentRoute.value.fullPath.substring(1))}.md` }
});
let blogContent = ref(initContent);
let blogPath = ref('');
const active = computed(() => {
    return router.currentRoute.value.query.GROUP ? `${router.currentRoute.value.query.GROUP}/${router.currentRoute.value.params.blogName}` : router.currentRoute.value.params.blogName;
});
const setBlogPath = async (content) => {
    blogPath.value = content;
    blogContent.value = await $fetch('/api/readblog', { params: { path: blogPath.value } });
};
provide('setBlogPath', setBlogPath);
const { $loading } = useNuxtApp();
onBeforeMount(() => {
    $loading();
});
onMounted(() => {
    $loading().close();
});
</script>

<style lang="scss" scoped>
@import '../assets/theme/theme.scss';

#blogs {
    display: flex;

    #blogsTree {
        position: fixed;
        height: 100vh;
        padding: 5vh 2vw 0 0;
        width: 20vw;
        @include theme-border();
    }

    #blogShow {
        margin-left: 20vw;
        width: 80vw;
    }
}
</style>