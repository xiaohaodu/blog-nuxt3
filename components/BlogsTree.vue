<template>
  <client-only>
    <div class="mb-2 flex items-baseline justify-end text-lg" v-if="tag && githubAuth">
      <!-- <button @click="addFolder()" class="cursor-pointer hover:text-[#42B883]">
        <span class="font-serif text-xs">FOLDER</span> <el-icon><FolderAdd /></el-icon>
      </button> -->
      <button @click="addFile()" class="cursor-pointer hover:text-[#42B883]">
        <el-icon><DocumentAdd /></el-icon><span class="font-serif text-xs">FILE</span>
      </button>
    </div>
  </client-only>
  <li v-for="(blogTreeBranch, index) in blogsTree" :key="index">
    <div v-if="blogTreeBranch.type == 'file'" class="group flex items-center justify-between">
      <nuxt-link
        :to="`/blogs/${fileBlogPathHandler(blogTreeBranch)}`"
        @click="setBlogPath(blogTreeBranch.path as string)"
        :class="{ active: fileBlogPathHandler(blogTreeBranch) == active }"
        class="file"
        >{{ fileNameHandler(blogTreeBranch) }}</nuxt-link
      >
      <button
        @click="editBlog(blogTreeBranch)"
        class="hidden hover:text-[#42B883] group-hover:block"
      >
        <el-icon><Edit /></el-icon>
      </button>
    </div>
    <div v-if="blogTreeBranch.type == 'dir'">
      <div class="group flex items-center justify-between">
        <span>{{ blogTreeBranch.name }}</span>
        <div class="flex flex-nowrap items-baseline">
          <button
            @click="addFile(blogTreeBranch)"
            class="hidden hover:text-[#42B883] group-hover:block"
          >
            <el-icon><DocumentAdd /></el-icon>
          </button>
          <!-- <button
            @click="addFolder(blogTreeBranch)"
            class="hidden hover:text-[#42B883] group-hover:block"
          >
            <el-icon><FolderAdd /></el-icon>
          </button> -->
          <button
            @click="switchFolderState(blogTreeBranch)"
            class="hidden hover:text-[#42B883] group-hover:block"
          >
            <el-icon v-show="!blogTreeBranch?.expand"><FolderOpened /></el-icon>
            <el-icon v-show="blogTreeBranch?.expand"><Folder /></el-icon>
          </button>
        </div>
      </div>
      <ul
        v-show="blogTreeBranch.expand && blogTreeBranch.children && blogTreeBranch.children.length"
      >
        <BlogsTree
          :showType="showType"
          :tag="false"
          :blogsTree="blogTreeBranch.children"
          :setBlogPath="setBlogPath"
          :active="active"
        >
        </BlogsTree>
      </ul>
    </div>
  </li>
</template>

<script lang="ts" setup>
const props = defineProps({
  blogsTree: {
    type: Object as PropType<BlogsTree>,
    required: true,
  },
  active: {
    type: String,
    required: true,
  },
  setBlogPath: {
    type: Function as PropType<(content: string) => void>,
    required: true,
  },
  tag: {
    type: Boolean,
    required: true,
  },
  showType: {
    type: String as PropType<ContentShowType>,
    required: true,
  },
});
let githubAuth = ref<GithubAuth>();
if (props.tag) {
  onMounted(() => {
    githubAuth = useGithubAuth();
  });
}
const router = useRouter();
const fileNameHandler = (blogTreeBranch: BlogsTreeBranch) => {
  return blogTreeBranch.name.replace(/(.md|.js)$/, '');
};
const fileBlogPathHandler = (blogTreeBranch: BlogsTreeBranch) => {
  return blogTreeBranch.path!.slice(14, -3);
};
const editBlog = (blogTreeBranch?: BlogsTreeBranch) => {
  router.push(`/blogs/edit/${blogTreeBranch?.path!.slice(14, -3)}`);
};
const addFile = (blogTreeBranch?: BlogsTreeBranch) => {
  router.push(`/blogs/add/${blogTreeBranch?.dirPath!.slice(14)}`);
};
// const addFolder = (blogTreeBranch?: BlogsTreeBranch) => {
//   console.log(blogTreeBranch);
// };
const switchFolderState = (blogsTreeBranch?: BlogsTreeBranch) => {
  if (blogsTreeBranch) blogsTreeBranch.expand = !blogsTreeBranch.expand;
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
