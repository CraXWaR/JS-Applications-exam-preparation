import { del, get, post, put } from "./api.js";

export function getAllAlbums() {
    return get('/data/albums?sortBy=_createdOn%20desc&distinct=name');
}

export function createAlbum(album) {
    return post('/data/albums', album);
}

export function getAlbumById(id) {
    return get('/data/albums/' + id);
}

export function deleteAlbum(id) {
    return del('/data/albums/' + id);
}

export function updateAlbum(id, album) {
    return put('/data/albums/' + id, album);
}