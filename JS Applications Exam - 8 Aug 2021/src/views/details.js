import { html } from "../lib.js";
import { getUserData } from "../util.js";
import { deleteBook, getBookById, getLikesByBookId, getMyLikesByBookId, likeBook } from "../api/data.js";

const detailsTemplate = (book, isOwner, onDelete, likes, showLikeBtn, onLike) => html `
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <div class="actions">
            ${bookControlsTempalte(book, isOwner, onDelete)}
            ${likesControlsTemplate(showLikeBtn, onLike)}
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${likes}</span>
            </div>
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>
`;

const bookControlsTempalte = (book, isOwner, onDelete) => {
    if (isOwner) {
        return html
        `<a class="button" href="/edit/${book._id}">Edit</a>
        <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>`;
    } else {
        return null;
    }
}

const likesControlsTemplate = (showLikeBtn, onLike) => {
    if(showLikeBtn) {
        return html `<a @click=${onLike} id="like" class="button" href="javascript:void(0)">Like</a>`;
    }
    return null;
}

export async function detailsPage(ctx) {
    const userData = getUserData();

    const [book, likes, hasLike] = await Promise.all([
        getBookById(ctx.params.id),
        getLikesByBookId(ctx.params.id),
        userData ? getMyLikesByBookId(ctx.params.id, userData.id) : 0
    ]);

    const isOwner = userData && userData.id == book._ownerId;
    const showLikeBtn = isOwner == false && hasLike == false && userData != null;
    ctx.render(detailsTemplate(book, isOwner, onDelete, likes, showLikeBtn, onLike));

    async function onDelete() {
        await deleteBook(ctx.params.id);
        ctx.page.redirect('/');
    }

    async function onLike() {
        await likeBook(ctx.params.id);
        ctx.page.redirect('/')
    }
}
