import { del, get, post, put } from "./api.js";

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

export async function editPost(id, post) {
    return put('/data/posts/' + id, post)
}

export async function getUserPosts(userId) {
    return get(`/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}