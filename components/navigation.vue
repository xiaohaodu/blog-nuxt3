<template>
  <client-only>
    <el-menu
      id="nav"
      ref="refMenu"
      :default-active="activeIndex"
      mode="horizontal"
      :ellipsis="false"
      :background-color="themeStyle.backgroundColor"
      :text-color="themeStyle.fontColor"
      :active-text-color="themeStyle.hoverColor"
      :router="true"
    >
      <el-menu-item :key="router.currentRoute.value.fullPath" index="/">首页</el-menu-item>
      <el-menu-item :key="router.currentRoute.value.fullPath" index="/blogs/README"
        >灵感工场</el-menu-item
      >
      <el-sub-menu :key="router.currentRoute.value.fullPath" index="/three">
        <template #title>三维</template>
        <el-menu-item index="/three/box">立方体</el-menu-item>
        <el-menu-item index="/three/bear">小熊</el-menu-item>
        <el-menu-item index="/three/vrhouse">VR看房</el-menu-item>
      </el-sub-menu>
      <el-sub-menu :key="router.currentRoute.value.fullPath" index="/game">
        <template #title>游戏</template>
        <el-menu-item index="/game/knifehit">小李飞刀</el-menu-item>
        <el-menu-item index="/game/breakout">打砖块</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/works">
        <template #title>作品</template>
        <el-menu-item>
          <a href="https://os.mayuan.work/" target="_blank">点餐系统(课设)</a>
        </el-menu-item>
        <el-menu-item>
          <a href="https://bq.mayuan.work/books" target="_blank">期末试题</a>
        </el-menu-item>
      </el-sub-menu>
      <div style="padding: auto 2vw">
        <Switch></Switch>
      </div>
      <div style="flex-grow: 1"></div>
      <el-menu-item
        :key="router.currentRoute.value.fullPath"
        :style="isLogin ? 'pointer-events: none' : ''"
        class="m-0"
        :index="false ? '/github/auth' : ''"
      >
        <nuxt-link
          :style="isLogin ? 'pointer-events: none' : ''"
          class="m-0 flex flex-col items-center justify-center"
          :to="`https://github.com/login/oauth/authorize?client_id=${githubAccess.clientId}&redirect_url=${githubAccess.redirectUrl}`"
        >
          <img
            class="h-6 w-6"
            :src="
              isLogin
                ? githubUser?.avatar_url
                : dataThemeNight
                ? icon_github_night
                : icon_github_light
            "
            alt="Github授权登录"
          />
          <span class="text-xs leading-5" v-text="isLogin ? githubUser!.name : 'Github授权登录'">
          </span>
        </nuxt-link>
      </el-menu-item>
      <a href="https://github.com/xiaohaodu/blog-nuxt3" target="_blank"
        ><img
          :src="dataThemeNight ? icon_github_night : icon_github_light"
          alt="项目GitHub"
          width="36"
      /></a>
    </el-menu>
  </client-only>
</template>

<script lang="ts" setup>
import icon_github_light from '@/assets/imgs/icon-github-light.svg';
import icon_github_night from '@/assets/imgs/icon-github-night.svg';
const dataThemeNight = useTheme();
const router = useRouter();
const activeIndex = computed(() => {
  if (router.currentRoute.value.matched[0].path === '/blogs/:blogPath+') {
    return '/blogs/README';
  }
  return router.currentRoute.value.path;
});
const refMenu = ref() as Ref<HTMLMenuElement>;
const themeStyle = reactive({
  fontColor: computed(() => (dataThemeNight.value ? '#DEDEDE' : '#333333')),
  backgroundColor: computed(() => (dataThemeNight.value ? '#363B40' : '#FFFFFF')),
  hoverColor: computed(() => (dataThemeNight.value ? '#5BAC87' : '#5BAC87')),
});
const { githubAccessDev, githubAccessServe } = useRuntimeConfig().public;
const githubAccess = process.env.NODE_ENV === 'production' ? githubAccessServe : githubAccessDev;

const isLogin = ref(false);
let githubUser = ref<GithubUser>();
let githubAuth = ref<GithubAuth>();
onMounted(async () => {
  window.onstorage = () => {
    githubAuth.value = JSON.parse(localStorage.getItem('githubAuth') as string);
    githubUser.value = JSON.parse(localStorage.getItem('githubUser') as string);

    if (githubUser.value && githubAuth.value) {
      isLogin.value = true;
    } else {
      isLogin.value = false;
    }
  };
  githubUser = useGithubUser();
  githubAuth = useGithubAuth();
  if (githubAuth.value?.refreshTime && githubAuth.value.refreshTime <= new Date().getTime()) {
    if (githubAuth.value?.destroyTime && githubAuth.value.destroyTime <= new Date().getTime()) {
      localStorage.removeItem('githubAuth');
    } else {
      const newGithubAuth = await $fetch('/api/github/resetAuth', {
        method: 'post',
        body: {
          refresh_token: githubAuth.value.refresh_token,
        },
      });
      localStorage.setItem('githubAuth', JSON.stringify(newGithubAuth));
    }
  }
  if (githubUser.value && githubAuth.value) {
    isLogin.value = true;
  } else {
    isLogin.value = false;
  }
});
</script>

<style lang="scss" scoped>
#nav {
  position: fixed;
  width: 100vw;
  height: 60px;
  top: 0;
  z-index: 2;

  a {
    display: flex;
    cursor: pointer;
    margin: auto 1vw;
    text-decoration: none;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: clip;
  }
  .m-0 {
    margin: 0;
  }
  .el-menu-item {
    padding-left: 2vw;
    padding-right: 2vw;
  }

  :deep(.el-sub-menu .el-sub-menu__title) {
    padding-left: 2vw;
    padding-right: calc(10px + 2vw);
  }

  :deep(.el-sub-menu .el-sub-menu__icon-arrow) {
    right: 1.2vw;
  }

  :deep(+ div) {
    margin-top: 60px;
    height: calc(100vh - 60px);
  }
}
</style>
