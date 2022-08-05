import { html } from "../lib.js";
import { getGameById } from "../api/games.js";
import { getUserData } from "../util.js";

const gameDetailsTemp = (game, ifOwner, onDelete) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">
        <div class="game-header">
            <img class="game-img" src=${game.imageUrl} />
            <h1>Bright</h1>
            <span class="levels">MaxLevel: ${game.maxLevel}</span>
            <p class="type">${game.category}</p>
        </div>
        <p class="text">
            ${game.summary}
        </p>

        <!-- Edit/Delete buttons ( Only for creator of this game )  -->
        ${ifOwner ? html`
        <div class="buttons">
            <a href="/edit/${game._id}" class="button">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
        </div>` : ''}
    </div>
</section>`;

export async function gameDetailsView(ctx) {
    const game = getGameById(ctx.params.id);
    const userData = getUserData();
    const ifOwner = userData?.id == game._owenerId

    ctx.render(gameDetailsTemp(game, ifOwner, onDelete));

    async function onDelete() {
        const choice = confirm('Are u sure u want to delete this game?');

        if (choice) {
            await deleteMeme(ctx.params.id)
            ctx.page.redirect('/')
        }
    }
}