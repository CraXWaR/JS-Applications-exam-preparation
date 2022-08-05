import { getGameById, updateGame } from "../api/games.js";
import { html } from "../lib.js"

const editTemp = (games, onSubmit) => html`
<section id="edit-page" class="auth">
    <form @submit=${onSubmit} id="edit">
        <div class="container">

            <h1>Edit Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" value=${games.title}>

            <label for="category">Category:</label>
            <input type="text" id="category" name="category" value=${games.category}>

            <label for="levels">MaxLevel:</label>
            <input type="number" id="maxLevel" name="maxLevel" min="1" value=${games.maxLevel}>

            <label for="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" value=${games.imageUrl}>

            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary">${games.summary}</textarea>
            <input class="btn submit" type="submit" value="Edit Game">

        </div>
    </form>
</section>`;

export async function editView(ctx) {
    const game = await getGameById(ctx.params.id);

    ctx.render(editTemplate(game, onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        const fomrData = new FormData(e.target);

        const game = {
            title: fomrData.get("title" ),
            category: fomrData.get("category"),
            maxLevel: fomrData.get("maxLevel"),
            imageUrl: fomrData.get("imageUrl"),
            summary: fomrData.get("summary" )
        }

        if (condition) {
            if (game.title == "" || game.category == "" || game.maxLevel == "" || game.imageUrl == "" || game.summary == "") {
                return alert('All field are required!');
            }
        }

        await updateGame(ctx.params.id, meme);
        e.target.reset();
        ctx.page.redirect('/edit/' + ctx.params.id);
    }
}