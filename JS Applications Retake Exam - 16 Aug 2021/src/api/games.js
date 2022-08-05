import { del, get, post } from "./api.js";

export function getGames() {
    return get('/data/games?sortBy=_createdOn%20desc&distinct=category');
}

export function getCatalogueGems() {
    return get('/data/games?sortBy=_createdOn%20desc');
}

export function getGameById(id) {
    return get('/data/games/' + id)
}

export function deleteGame(id) {
    return del('/data/games/' + id)
}

export function createGame(game) {
    return post('/data/games', game)
}