<template>
    <div id="blogContent" v-html="blogContent"></div>
</template>

<script setup>
import { marked } from 'marked';
import hljs from 'highlight.js';
import DOMPurify from 'isomorphic-dompurify';
const props = defineProps(['blogContent']);
// $ npm i isomorphic-dompurify
//清除危险字符串，防范xss攻击
const blogContent = computed(() => {
    return DOMPurify.sanitize(marked.parse(props.blogContent.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, "")));
});
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
    headerPrefix: "",
    mangle: true,
    pedantic: false,
    sanitize: false,
    silent: false,
    smartypants: false,
    xhtml: false
});
</script>

<style lang="scss" scoped>
#blogContent {
    padding: 2vh;
    // user-select: none;
}
</style>