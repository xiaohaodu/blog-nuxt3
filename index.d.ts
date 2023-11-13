import { Endpoints } from '@octokit/types';
declare global {
  type RepoGetRef = Endpoints['GET /repos/{owner}/{repo}/git/ref/{ref}'];
  type RepoGetCommit = Endpoints['GET /repos/{owner}/{repo}/git/commits/{commit_sha}'];
  type RepoCreateBlobs = Endpoints['POST /repos/{owner}/{repo}/git/blobs'];
  type RepoCreateTree = Endpoints['POST /repos/{owner}/{repo}/git/trees'];
  type RepoCreateCommit = Endpoints['POST /repos/{owner}/{repo}/git/commits'];
  type RepoUpdateRef = Endpoints['PATCH /repos/{owner}/{repo}/git/refs/{ref}'];

  type BlogsTree = Array<BlogsTreeBranch>;
  type BlogsTreeBranch = {
    name: string;
    /**  'dir' | 'file' */
    type: string;
    path?: string;
    expand?: boolean;
    dirPath?: string;
    children?: Array<BlogsTreeBranch>;
  };

  type GithubAuth = {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    refresh_token_expires_in: number;
    scope: string;
    token_type: string;
    createTime: number;
    destroyTime: number;
    refreshTime: number;
  };
  type GithubUser = {
    avatar_url: string;
    name: string;
  };

  type ContentShowType = 'show' | 'edit' | 'add';

  type CommitConfig = {
    /** @description — The file referenced in the tree. */
    path: string;
    /** @description — The new blob's content */
    content: string;
    /** @description — The file mode; one of 100644 for file (blob), 100755 for executable (blob), 040000 for subdirectory (tree), 160000 for submodule (commit), or 120000 for a blob that specifies the path of a symlink.
     * @enum */
    mode: '100644' | '100755' | '040000' | '160000' | '120000';
    /** @description — Either blob, tree, or commit.
     * @enum */
    type: 'blob' | 'commit' | 'tree';
    /** @description — The commit message*/
    message: string;
  };
}
