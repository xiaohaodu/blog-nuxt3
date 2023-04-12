<template>
    <li v-for="(item, index) in blogsTree" :key="index">
        <span :class="item.type" v-html="fileNameHandler(item)" @click="toBlog(item, $event)"></span>
        <ul v-if="item.type == 'dir' && item.children.length">
            <BlogsTree :blogsTree="item.children" v-if="item.type == 'dir' && item.children.length"></BlogsTree>
        </ul>
    </li>
</template> 

<script lang="ts" setup>
const props = defineProps(['blogsTree'])
const blogsTree = props.blogsTree
onMounted(() => {
})

const setBlogContent = inject('setBlogContent')
const toBlog = async (item, $event) => {
    if (item.type == 'file') {
        const fileContent = await $fetch('/api/readblog', { params: { path: item.path } });
        setBlogContent(fileContent);
        const actives = document.querySelectorAll('.active');
        actives.forEach(item => {
            item.classList.remove('active')
        })
        $event.target.classList.add('active')
    }
}
const fileNameHandler = (item) => {
    const reg = /(.md)$/
    const name = item.name
    return item.type == 'file' ? name.replace(reg, '') : `<strong class='sort'>${name.replace(reg, '')}</strong>`
}
</script>

<style lang="scss" scoped>
@import '../assets/theme/theme.scss';

.file {
    cursor: pointer;

    &:hover {
        @include theme-hover();
    }
}

.active {
    @include theme-active();
}
</style>