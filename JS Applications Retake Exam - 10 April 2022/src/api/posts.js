import { del, get, post } from "./api.js";

export async function getAllPosts() {
    return get('/data/posts?sortBy=_createdOn%20desc');
}

export async function createPost(postOption) {
    return post('/data/posts', postOption);
}

export async function getPostDetails(id) {
    return get('/data/posts/' + id);
}

export async function deletePost(id) {
    return del('/data/posts/' + id)
}