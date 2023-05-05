<template>
    <li v-for="(item, index) in blogsTree" :key="index">
        <nuxt-link v-if="item.type == 'file'" :to="`/blogs/${fileNameHandler(item)}${filePathHandler(item)}`"
            @click="setBlogPath(item.path)" :class="{ active: fileBlogHandler(item) == props.active }" class="file">{{
                fileNameHandler(item) }}</nuxt-link>
        <span v-if="item.type == 'dir'">{{ item.name }}</span>
        <ul v-if="item.type == 'dir' && item.children.length">
            <BlogsTree :blogsTree="item.children" v-if="item.type == 'dir' && item.children.length" :active="props.active">
            </BlogsTree>
        </ul>
    </li>
</template> 

<script setup>
const props = defineProps(['blogsTree', 'active']);
const blogsTree = props.blogsTree;
const setBlogPath = inject('setBlogPath');
const fileNameHandler = (item) => {
    return item.name.replace(/(.md)$/, '');
};
const filePathHandler = (item) => {
    const GROUP = item.path.split('/').slice(2, -1).join('-');
    return GROUP ? `?GROUP=${GROUP}` : '';
};
const fileBlogHandler = (item) => {
    return item.path.slice(14, -3);
};
onMounted(() => {
    const active = document.getElementsByClassName("active")[0];
    const e = new Event("click", { "bubbles": false, "cancelable": false });//模拟点击
    active.dispatchEvent(e);
});
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

a {
    text-decoration: none;
    word-break: break-all;
}
</style>