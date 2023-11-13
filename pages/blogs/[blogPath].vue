<template>
  <Head>
    <Title>{{ router.currentRoute.value.params.blogName }}</Title>
    <Meta name="referrer" content="no-referrer"> </Meta>
    <Meta name="content" :content="blogContent"> </Meta>
  </Head>
  <div id="blogs">
    <el-icon @click="showTagTab">
      <Expand v-show="!showTag" />
      <Fold v-show="showTag" />
    </el-icon>
    <aside v-show="showTag" id="blogsTreeTag">
      <ul>
        <BlogsTree
          :setBlogPath="setBlogPath"
          :showType="showType"
          :tag="true"
          :blogsTree="blogsTree"
          :active="active"
        >
        </BlogsTree>
      </ul>
    </aside>
    <aside id="blogsTree">
      <ul>
        <BlogsTree
          :setBlogPath="setBlogPath"
          :showType="showType"
          :tag="true"
          :blogsTree="blogsTree"
          :active="active"
        >
        </BlogsTree>
      </ul>
    </aside>
    <div id="blogShow">
      <BlogShow :type="showType" :blogContent="blogContent"></BlogShow>
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const blogsTree = ref((await $fetch('/api/blogsTree')) as BlogsTree);
const blogPath = ref('');
const active = computed(() => {
  return typeof router.currentRoute.value.params.blogPath === 'string'
    ? router.currentRoute.value.params.blogPath
    : router.currentRoute.value.params.blogPath.join('/');
});
const blogContent = ref(
  (await $fetch('/api/readblog', {
    params: {
      path: `public/_blogs/${active.value}.md`,
    },
  })) as string,
);
const setBlogPath = async (content: string) => {
  blogPath.value = content;
  blogContent.value = await $fetch('/api/readblog', {
    params: { path: blogPath.value },
  });
};
const { $loading } = useNuxtApp();
onBeforeMount(() => {
  $loading();
});
onMounted(() => {
  $loading().close();
});
const showTag = ref(false);
const showTagTab = () => {
  showTag.value = !showTag.value;
};

const showType = ref<ContentShowType>('show');
</script>

<style lang="scss" scoped>
@import '../../assets/theme/theme.scss';

#blogs {
  display: flex;

  #blogsTree {
    position: fixed;
    height: calc(100vh - 60px);
    padding: 5vh 2vw 0 0;
    width: 20vw;
    @include theme-border();
    user-select: none;
    @include theme-color();
    z-index: 2;
    overflow: auto;
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
    height: calc(100vh - 60px);
    overflow: auto;
  }

  .el-icon {
    display: none;
    cursor: pointer;
    position: fixed;
    left: 10px;
    top: 70px;
    z-index: 3;

    > svg {
      height: 23px;
      width: 23px;
    }
  }
}

@media screen and (max-width: 800px) {
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
