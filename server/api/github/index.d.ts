import { Endpoints } from '@octokit/types';
type RepoGetRef = Endpoints['GET /repos/{owner}/{repo}/git/ref/{ref}'];
type RepoGetCommit = Endpoints['GET /repos/{owner}/{repo}/git/commits/{commit_sha}'];
type RepoCreateBlobs = Endpoints['POST /repos/{owner}/{repo}/git/blobs'];
type RepoCreateTree = Endpoints['POST /repos/{owner}/{repo}/git/trees'];
type RepoCreateCommit = Endpoints['POST /repos/{owner}/{repo}/git/commits'];
type RepoUpdateRef = Endpoints['PATCH /repos/{owner}/{repo}/git/refs/{ref}'];
