<template>
    <div style="height: 58px;
    display: flex;
    justify-content: center;
    align-items: center;" @click="changeTheme()">
        <div :class="dataThemeNight ? 'switch_open switch' : 'switch_close switch'">
            <img class="switch__icon" src="@/assets/imgs/moon.svg" v-show="dataThemeNight">
            <img class="switch__icon" src="@/assets/imgs/sun.svg" v-show="!dataThemeNight">
        </div>
    </div>
</template>
  
<script setup>
const dataThemeNight = useTheme();
const reload = inject('reload');
let link1;
let link2;
const changeTheme = () => {
    dataThemeNight.value = !dataThemeNight.value;
    if (dataThemeNight.value) {
        link1.href = '/theme/night.css';
        link2.href = '/theme/github-block-dark.css';
        window.document.documentElement.setAttribute('theme', 'night');
    } else {
        link1.href = '/theme/github.css';
        link2.href = '/theme/github-block.css';
        window.document.documentElement.setAttribute('theme', 'light');
    }
    localStorage.setItem('dataThemeNight', dataThemeNight.value.toString());
};

onMounted(() => {
    dataThemeNight.value = JSON.parse(localStorage.getItem('dataThemeNight') || 'false');
    console.log(localStorage.getItem('dataThemeNight'));
    console.log(dataThemeNight.value);
    link1 = document.createElement('link');
    link2 = document.createElement('link');
    if (dataThemeNight.value) {
        link1.type = 'text/css';
        link1.id = "theme";
        link1.rel = 'stylesheet';
        link1.href = '/theme/night.css';
        document.getElementsByTagName("head")[0].appendChild(link1);
        link2.type = 'text/css';
        link2.id = "themeCodeBlock";
        link2.rel = 'stylesheet';
        link2.href = '/theme/github-block-dark.css';
        document.getElementsByTagName("head")[0].appendChild(link2);
        window.document.documentElement.setAttribute('theme', 'night');
    } else {
        link1.type = 'text/css';
        link1.id = "theme";
        link1.rel = 'stylesheet';
        link1.href = '/theme/github.css';
        document.getElementsByTagName("head")[0].appendChild(link1);
        link2.type = 'text/css';
        link2.id = "themeCodeBlock";
        link2.rel = 'stylesheet';
        link2.href = '/theme/github-block.css';
        document.getElementsByTagName("head")[0].appendChild(link2);
        window.document.documentElement.setAttribute('theme', 'light');
    }
});
</script>
  
<style lang="scss" scoped>
@keyframes open_to_close {
    0% {
        left: 22px;
    }

    100% {
        left: 0;
    }
}

@keyframes close_to_open {
    0% {
        left: 0;
    }

    100% {
        left: 22px;
    }
}

.switch_open {
    position: relative;
    width: 40px;
    height: 20px;
    border-radius: 10px;
    background-color: #4a4b4d;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: all 0.5s;

    .switch__icon {
        position: absolute;
        border-width: 2px 2px 2px 2px;
        width: 18px;
        height: 18px;
        left: 22px;
        border-radius: 9px;
        background-color: #141414;
        animation: close_to_open 0.3s;
    }
}

.switch_close {
    position: relative;
    width: 40px;
    height: 20px;
    border-radius: 10px;
    background-color: #f2f2f2;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: all 0.5s;

    .switch__icon {
        position: absolute;
        border-width: 2px 2px 2px 2px;
        width: 18px;
        height: 18px;
        border-radius: 9px;
        background-color: #ffffff;
        animation: open_to_close 0.3s;
    }
}
</style>
  