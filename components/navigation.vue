<template>
    <client-only>
        <el-menu :default-active="activeIndex" id="nav" mode="horizontal" :ellipsis="false" @select="handleSelect"
            :background-color="themeStyle.backgroundColor" :text-color="themeStyle.fontColor"
            :active-text-color="themeStyle.hoverColor" :router='true'>
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/blogs/README">博客</el-menu-item>
            <el-sub-menu index="/three">
                <template #title>三维</template>
                <el-menu-item index="/three/box">立方体</el-menu-item>
                <el-menu-item index="/three/bear">小熊</el-menu-item>
                <el-menu-item index="/three/vrhouse">VR看房</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="/game">
                <template #title>游戏</template>
                <el-menu-item index="/game/knifehit">小李飞刀</el-menu-item>
                <el-menu-item index="/game/breakout">打砖块</el-menu-item>
                <el-menu-item index="/game/kingandpigs">归来</el-menu-item>
            </el-sub-menu>
            <div style="padding: auto 2vw;">
                <Switch></Switch>
            </div>
            <a href="https://bq.mayuan.work/books" target="_blank">期末试题</a>
            <a href="https://os.mayuan.work/" target="_blank">点餐系统(课设)</a>
            <div style="flex-grow: 1;"></div>
            <a href="https://github.com/xiaohaodu/blog-nuxt3" target="_blank"><img
                    :src="dataThemeNight ? icon_github_night : icon_github_light" alt="github" width="36"></a>

        </el-menu>
    </client-only>
</template>

<script lang="ts" setup>
import icon_github_light from '@/assets/imgs/icon-github-light.svg';
import icon_github_night from '@/assets/imgs/icon-github-night.svg';
const dataThemeNight = useTheme();
const Router = useRouter();
const activeIndex = ref(Router.currentRoute.value.path);
const themeStyle = reactive({
    fontColor: computed(() => dataThemeNight.value ? '#DEDEDE' : '#333333'),
    backgroundColor: computed(() => dataThemeNight.value ? '#363B40' : '#FFFFFF'),
    hoverColor: computed(() => dataThemeNight.value ? '#5BAC87' : '#5BAC87')
});
const handleSelect = (index: string) => {
    activeIndex.value = index;
};
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
        margin: auto 2vw;
        text-decoration: none;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: clip;
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
        right: 1.2vw
    }

    :deep(+ div) {
        margin-top: 60px;
        height: calc(100vh - 60px);
    }
}
</style>