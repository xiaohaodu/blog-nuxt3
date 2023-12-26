export default defineEventHandler((event) => {
  return new Promise(async (resolve, reject) => {
    const body = await readBody(event);
    const baseConfig = {
      owner: 'duxiaohao',
      repo: 'blog-nuxt3',
      ref: 'heads/main',
    };
    /**
     * The file mode; one of 100644 for file (blob), 100755 for executable (blob), 040000 for subdirectory (tree), 160000 for submodule (commit), or 120000 for a blob that specifies the path of a symlink.
     */

    const apiConfig = {
      ...body.commitConfig,
    } as CommitConfig;
    try {
      //1. 获取 Ref
      const getCommitRefConfig = {
        owner: baseConfig.owner,
        repo: baseConfig.repo,
        ref: baseConfig.ref,
      } as RepoGetRef['parameters'];
      const getCommitRef = (await $fetch('/api/github/commit/getRef', {
        method: 'post',
        body: {
          accessToken: body.accessToken,
          getCommitRefConfig,
        },
      })) as RepoGetRef['response']['data'];
      // 2. 获取 Commit
      const getCommitConfig = {
        owner: baseConfig.owner,
        repo: baseConfig.repo,
        commit_sha: getCommitRef.object.sha,
      } as RepoGetCommit['parameters'];
      const getCommit = (await $fetch('/api/github/commit/getCommit', {
        method: 'post',
        body: {
          accessToken: body.accessToken,
          getCommitConfig,
        },
      })) as RepoGetCommit['response']['data'];
      // 3. 生成 Blob
      const createBlobsConfig = {
        owner: baseConfig.owner,
        repo: baseConfig.repo,
        content: apiConfig.content,
        encoding: 'utf-8',
      } as RepoCreateBlobs['parameters'] as {
        owner: string;
        repo: string;
        content: string;
        encoding: string;
      };
      const createBlobs = (await $fetch('/api/github/commit/createBlobs', {
        method: 'post',
        body: {
          accessToken: body.accessToken,
          createBlobsConfig: createBlobsConfig,
        },
      })) as RepoCreateBlobs['response']['data'];

      // 4. 生成 tree
      const createTreeConfig = {
        owner: baseConfig.owner,
        repo: baseConfig.repo,
        base_tree: getCommit.tree.sha,
        tree: [
          {
            path: apiConfig.path,
            mode: apiConfig.mode,
            type: apiConfig.type,
            sha: createBlobs.sha,
          },
        ],
      } as RepoCreateTree['parameters'];
      const createTree = (await $fetch('/api/github/commit/createTree', {
        method: 'post',
        body: {
          accessToken: body.accessToken,
          createTreeConfig,
        },
      })) as RepoCreateTree['response']['data'];
      // 5. 生成 Commit
      const createCommitConfig = {
        owner: baseConfig.owner,
        repo: baseConfig.repo,
        message: apiConfig.message,
        parents: [getCommitRef.object.sha],
        tree: createTree.sha,
      } as RepoCreateCommit['parameters'];
      const createCommit = (await $fetch('/api/github/commit/createCommit', {
        method: 'post',
        body: {
          accessToken: body.accessToken,
          createCommitConfig,
        },
      })) as RepoCreateCommit['response']['data'];
      // 6. 更新 Ref
      const updateRefConfig = {
        owner: baseConfig.owner,
        repo: baseConfig.repo,
        ref: baseConfig.ref,
        sha: createCommit.sha,
        force: false,
      } as RepoUpdateRef['parameters'];
      const updateRef = (await $fetch('/api/github/commit/updateRef', {
        method: 'PATCH',
        body: {
          accessToken: body.accessToken,
          updateRefConfig,
        },
      })) as RepoUpdateRef['response']['data'];
      resolve(updateRef);
    } catch (error) {
      resolve(error);
    }
  });
});
