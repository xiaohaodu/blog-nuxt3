<template>
  <div id="blogs">
    <div id="blogShow" v-if="loaded">
      <BlogShow :type="showType" :blogPath="blogPath + '.md'" :blogContent="blogContent"></BlogShow>
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const active = computed(() => {
  if (typeof router.currentRoute.value.params.blogPath === 'string') {
    return router.currentRoute.value.params.blogPath;
  } else if (Array.isArray(router.currentRoute.value.params.blogPath)) {
    return router.currentRoute.value.params.blogPath.join('/');
  } else {
    return '';
  }
});
const blogPath = ref(active.value);
const loaded = ref(false);
const blogContent = ref('');
onMounted(async () => {
  blogContent.value = await $fetch('/api/readblog', {
    params: {
      path: `public/_blogs/${blogPath.value}.md`,
    },
  });
  loaded.value = true;
});
const { $loading } = useNuxtApp();
onBeforeMount(() => {
  $loading();
});
onMounted(() => {
  $loading().close();
});
const showType = ref<ContentShowType>('edit');
</script>

<style lang="scss" scoped>
@import '../../../assets/theme/theme.scss';

#blogs {
  display: flex;

  #blogShow {
    width: 100vw;
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
</style>
