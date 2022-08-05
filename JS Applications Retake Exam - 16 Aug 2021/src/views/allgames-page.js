import { getCatalogueGems } from "../api/games.js";
import { html } from "../lib.js";

const allGamesTemp = (games) => html`
<section id="catalog-page">
    <h1>All Games</h1>
        ${games.length == 0 ? html`<h3 class="no-articles">No articles yet</h3>` :
        games.map(gamesCard)} 
</section>`;

const gamesCard = (game) => html`
<div class="allGames">
    <div class="allGames-info">
        <img src=${game.imageUrl}>
        <h6>${game.category}</h6>
        <h2>${game.title}</h2>
        <a href="/all-games/${game._id}" class="details-button">Details</a>
    </div>
</div>
`;

export async function allGamesCatalogue(ctx) {
    const games = await getCatalogueGems();

    ctx.render(allGamesTemp(games))
}