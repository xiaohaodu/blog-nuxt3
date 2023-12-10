<template>
  <client-only>
    <div class="mb-2 flex items-baseline justify-between text-lg" v-if="tag && githubAuth">
      <!-- <button @click="addFolder()" class="cursor-pointer hover:text-[#42B883]">
        <span class="font-serif text-xs">FOLDER</span> <el-icon><FolderAdd /></el-icon>
      </button> -->
      <button @click="switchFolderStateAll()" class="cursor-pointer hover:text-[#42B883]">
        <span class="font-serif text-xs">FOLDER</span>
        <el-icon v-show="!folderState"><FolderOpened /></el-icon>
        <el-icon v-show="folderState"><Folder /></el-icon>
      </button>
      <button @click="addFile()" class="cursor-pointer hover:text-[#42B883]">
        <el-icon><DocumentAdd /></el-icon><span class="font-serif text-xs">FILE</span>
      </button>
    </div>
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
          v-if="githubAuth"
          @click="editBlog(blogTreeBranch)"
          class="hidden hover:text-[#42B883] group-hover:block"
        >
          <el-icon><Edit /></el-icon>
        </button>
      </div>
      <div v-if="blogTreeBranch.type == 'dir'">
        <div class="group flex items-center justify-between">
          <span
            @click="switchFolderState(blogTreeBranch)"
            class="peer cursor-pointer hover:text-[#42B883]"
            >{{ blogTreeBranch.name }}</span
          >
          <div class="flex flex-nowrap items-baseline" v-if="tag && githubAuth">
            <button
              @click.stop="addFile(blogTreeBranch)"
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
              ref="switchFolderStateDom"
              @click="switchFolderState(blogTreeBranch)"
              class="hidden hover:text-[#42B883] group-hover:block peer-hover:text-[#42B883]"
            >
              <el-icon v-show="!blogTreeBranch?.expand"><FolderOpened /></el-icon>
              <el-icon v-show="blogTreeBranch?.expand"><Folder /></el-icon>
            </button>
          </div>
        </div>
        <ul
          v-show="
            blogTreeBranch?.expand && blogTreeBranch?.children && blogTreeBranch?.children.length
          "
        >
          <BlogsTree
            :showType="showType"
            :tag="false"
            :blogsTree="blogTreeBranch.children!"
            :setBlogPath="setBlogPath"
            :active="active"
          >
          </BlogsTree>
        </ul>
      </div>
    </li>
  </client-only>
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
onMounted(() => {
  githubAuth = useGithubAuth();
});
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
  router.push(`/blogs/add/${blogTreeBranch?.dirPath!.slice(14) || ''}`);
};
const switchFolderState = (blogsTreeBranch?: BlogsTreeBranch) => {
  if (blogsTreeBranch) blogsTreeBranch.expand = !blogsTreeBranch.expand;
};
const folderState = ref(true);
const switchFolderStateDom = ref();
const switchFolderStateAll = () => {
  folderState.value = !folderState.value;
  if (switchFolderStateDom.value)
    for (const dom of switchFolderStateDom.value) {
      if (folderState.value) {
        if (dom.children[0].style.display === '') {
          dom.click();
        }
      } else {
        if (dom.children[0].style.display === 'none') {
          dom.click();
        }
      }
    }
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
