<template>
  <div>{{ 'githubAuth' }}</div>
</template>

<script lang="ts" setup>
const route = useRoute();
const router = useRouter();
let githubAuth = ref<GithubAuth>();
let githubUser = ref<GithubUser>();
onMounted(async () => {
  githubUser = useGithubUser();
  githubAuth = useGithubAuth();
  if (route.query.githubAuth) {
    localStorage.setItem('githubAuth', decodeURIComponent(route.query.githubAuth as string));
    githubAuth.value = JSON.parse(decodeURIComponent(route.query.githubAuth as string));
  }
  if (route.query.githubAuth || !githubUser) {
    const { data: userInfo } = (await $fetch('/api/github/user', {
      params: githubAuth.value,
    })) as {
      message: string;
      data: any;
    };
    localStorage.setItem(
      'githubUser',
      JSON.stringify({
        avatar_url: userInfo.avatar_url,
        name: userInfo.name,
      }),
    );
    githubUser.value = {
      avatar_url: userInfo.avatar_url,
      name: userInfo.name,
    };
    window.onstorage && window.onstorage();
    router.push('/');
  }
});
</script>

<style lang="scss" scoped></style>
