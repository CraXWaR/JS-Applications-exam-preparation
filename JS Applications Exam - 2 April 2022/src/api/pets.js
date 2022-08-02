import { del, get, post, put } from "./api.js";

export async function getDashboardPets() {
    return get('/data/pets?sortBy=_createdOn%20desc&distinct=name');
}

export async function getPetById(id) {
    return get('/data/pets/' + id);
}