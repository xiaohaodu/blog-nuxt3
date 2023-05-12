<template>
    <Head>
        <Title>{{ router.currentRoute.value.params.blogName }}</Title>
        <Meta name="referrer" content="no-referrer">
        </Meta>
        <Meta name="content" :content="blogContent">
        </Meta>
    </Head>
    <div id="blogs">
        <el-icon @click="showTag">
            <Expand v-show="!show" />
            <Fold v-show="show" />
        </el-icon>
        <aside id="blogsTreeTag" v-show="show">
            <ul>
                <BlogsTree :blogsTree="blogsTree" :active="active">
                </BlogsTree>
            </ul>
        </aside>
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
const show = ref(false);
const showTag = () => {
    show.value = !show.value;
};
</script>

<style lang="scss" scoped>
@import '../../assets/theme/theme.scss';

#blogs {
    display: flex;

    #blogsTree {
        position: fixed;
        height: 100vh;
        padding: 5vh 2vw 0 0;
        width: 20vw;
        @include theme-border();
        user-select: none;
        @include theme-color();
        z-index: 2;
    }

    #blogsTreeTag {
        position: fixed;
        height: 100vh;
        padding: 5vh 2vw 0 0;
        width: max-content;
        @include theme-border();
        user-select: none;
        display: none;
        @include theme-color();
        z-index: 2;
    }

    #blogShow {
        margin-left: 20vw;
        width: 80vw;
    }

    .el-icon {
        display: none;
        cursor: pointer;
        position: fixed;
        left: 10px;
        top: 70px;
        z-index: 3;

        >svg {
            height: 23px;
            width: 23px;
        }
    }
}

@media screen and (max-width:800px) {
    #blogs {
        #blogsTree {
            display: none;
        }

        #blogsTreeTag {
            display: block;
        }

        #blogShow {
            margin-left: 0;
            width: 100vw;
        }

        .el-icon {
            display: block;
        }
    }
}
</style>