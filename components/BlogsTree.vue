<template>
    <li v-for="(item, index) in blogsTree" :key="index">
        <nuxt-link v-if="item.type == 'file'" :to="'/blogs/' + fileNameHandler(item)" @click="setBlogPath(item.path)"
            :class="{ active: fileNameHandler(item) == props.active }" class="file">{{
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