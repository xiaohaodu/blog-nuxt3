<template>
  <div v-if="type === 'show'" class="p-4" v-html="blogContent"></div>
  <div v-else-if="type === 'edit' || type === 'add'" class="flex flex-nowrap p-4">
    <div class="fixed bottom-4 right-6 flex h-10 w-fit items-center justify-center">
      <div
        v-show="editOperation"
        class="flex flex-nowrap items-center justify-center rounded bg-slate-200 bg-opacity-50"
      >
        <button class="flex flex-nowrap items-center justify-center px-1">
          <span class="w-fit whitespace-nowrap font-mono">提交信息:</span>
          <el-input
            v-show="messageTag"
            v-model="commitConfig.message"
            type="text"
            placeholder="请输入提交信息"
          ></el-input>
          <el-switch
            class="mx-1"
            v-model="messageTag"
            inline-prompt
            active-text="自定义"
            inactive-text="默认"
          ></el-switch>
        </button>
        <button class="flex flex-nowrap items-center justify-center px-1">
          <el-input v-model="blogName" type="text" placeholder="请输入博客标题"></el-input>
        </button>
        <button class="flex flex-nowrap items-center justify-center px-1">
          <span class="w-fit whitespace-nowrap font-mono">博客分类:</span>
          <el-input
            v-show="blogDirPathExtendTag"
            v-model="blogDirPathExtend"
            type="text"
            placeholder="请输入博客分类,'/'作为子分类符"
          ></el-input>
          <el-switch
            class="mx-1"
            v-model="blogDirPathExtendTag"
            inline-prompt
            active-text="自定义"
            inactive-text="默认"
          ></el-switch>
        </button>
        <button
          class="flex flex-nowrap items-center justify-center px-2 py-1 font-serif"
          @click="putBlog"
        >
          推送<el-icon><Promotion /></el-icon>
        </button>
      </div>
      <button
        class="ml-2 flex items-center justify-center rounded-md bg-blue-200 px-2 py-1.5"
        :class="{ 'opacity-500': editOperation, 'opacity-50': !editOperation }"
        @click="switchEditOperation"
      >
        <el-icon><Operation /></el-icon>
      </button>
    </div>
    <div v-html="blogContent" class="w-1/2 p-4"></div>
    <textarea
      ref="textarea"
      placeholder="请输入内容"
      :style="textareaHeight ? { height: textareaHeight } : ''"
      @input="textareaInput"
      class="h-[calc(100vh-100px)] w-1/2 resize-none whitespace-pre-wrap break-words border-none p-4 outline-none"
      v-model="blogContentText"
    ></textarea>
  </div>
</template>

<script lang="ts" setup>
import { marked } from 'marked';
import hljs from 'highlight.js';
const props = defineProps({
  blogContent: {
    type: String,
    required: true,
  },
  type: {
    type: String as PropType<ContentShowType>,
    required: true,
  },
  blogPath: {
    type: String,
  },
});
const router = useRouter();
const blogContentText =
  props.type === 'show' ? computed(() => props.blogContent) : ref(props.blogContent);
const blogContent = computed(() => {
  return marked.parse(blogContentText.value.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, ''));
});
const textarea = ref();
const textareaHeight = ref('');
const textareaHeightInit = () => {
  if ((textarea.value as HTMLElement).scrollHeight !== (textarea.value as HTMLElement).clientHeight)
    textareaHeight.value = (textarea.value as HTMLElement).scrollHeight + 80 + 'px';
};
let githubAuth = ref<GithubAuth>();
onMounted(() => {
  githubAuth = useGithubAuth();
  if (props.type === 'edit' || props.type === 'add') textareaHeightInit();
});
const textareaInput = (e: Event) => {
  if ((e.target as HTMLElement).scrollHeight !== (e.target as HTMLElement).clientHeight)
    textareaHeight.value = (e.target as HTMLElement).scrollHeight + 'px';
};
const editOperation = ref(true);
const switchEditOperation = () => {
  editOperation.value = !editOperation.value;
};
const messageTag = ref(false);
const blogDirPathExtendTag = ref(false);
const blogDirPathExtend = computed(() => {
  const temp = props.blogPath?.split('/');
  temp?.pop();
  return temp?.join('/') || '';
});

const blogName = computed(() => {
  const temp = props.blogPath?.split('/');
  return temp?.pop() || '';
});
const commitConfig = ref<CommitConfig>({
  message: '',
  mode: '100644',
  content: '',
  type: 'blob',
  path: '',
});
const { $loading } = useNuxtApp();
const putBlog = async () => {
  if (props.type === 'add' && !blogName.value) {
    return ElMessage({
      type: 'error',
      message: '博客标题是必填项',
      center: true,
    });
  }
  $loading();
  commitConfig.value.content = blogContentText.value;
  if (!commitConfig.value.message) {
    if (props.type === 'edit') {
      commitConfig.value.message = 'edit blog: ' + props.blogPath;
      commitConfig.value.path = 'public/_blogs/' + props.blogPath;
    } else if (props.type === 'add') {
      commitConfig.value.message = 'add blog:' + blogDirPathExtend.value + blogName.value;
      commitConfig.value.path = 'public/_blogs/' + blogDirPathExtend.value + blogName.value + '.md';
    }
  }
  try {
    await $fetch('/api/github/commit', {
      method: 'post',
      body: {
        accessToken: githubAuth.value?.access_token,
        commitConfig: commitConfig.value,
      },
    });
    router.push('/');
  } catch (error) {
    console.warn(error);
  } finally {
    $loading().close();
  }
};
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
  async: false,
  breaks: false,
  gfm: true,
  headerIds: true,
  headerPrefix: '',
  mangle: true,
  pedantic: false,
  sanitize: false,
  silent: false,
  smartypants: false,
  xhtml: false,
});
</script>
