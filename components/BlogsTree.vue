<template>
  <li v-for="(item, index) in blogsTree" :key="index">
    <nuxt-link
      v-if="item.type == 'file'"
      :to="`/blogs/${fileBlogPathHandler(item)}`"
      @click="setBlogPath(item.path)"
      :class="{ active: fileBlogPathHandler(item) == props.active }"
      class="file"
      >{{ fileNameHandler(item) }}</nuxt-link
    >
    <span v-if="item.type == 'dir'">{{ item.name }}</span>
    <ul v-if="item.type == 'dir' && item.children.length">
      <BlogsTree
        :blogsTree="item.children"
        v-if="item.type == 'dir' && item.children.length"
        :active="props.active"
      >
      </BlogsTree>
    </ul>
  </li>
</template>

<script setup>
const props = defineProps(['blogsTree', 'active']);
const blogsTree = props.blogsTree;
const setBlogPath = inject('setBlogPath');
const fileNameHandler = (item) => {
  return item.name.replace(/(.md|.js)$/, '');
};
const fileBlogPathHandler = (item) => {
  return item.path.slice(14, -3);
};
</script>

<style lang="scss" scoped>
@import '../assets/theme/theme.scss';

.file {
  cursor: pointer;
  color: #4193c4;
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

li {
  list-style-type: disc;
}
li ul li {
  list-style-type: circle;
}
</style>
