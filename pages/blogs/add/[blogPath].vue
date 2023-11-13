<template>
  <div id="blogs">
    <div id="blogShow">
      <BlogShow :type="showType" :blogPath="blogDirPath" :blogContent="blogContent"></BlogShow>
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const active = computed(() => {
  return typeof router.currentRoute.value.params.blogPath === 'string'
    ? router.currentRoute.value.params.blogPath
    : router.currentRoute.value.params.blogPath.join('/');
});
const blogDirPath = ref(active.value);
const blogContent = ref('');
const showType = ref<ContentShowType>('add');
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
