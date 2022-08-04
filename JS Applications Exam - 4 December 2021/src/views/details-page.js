import { deleteAlbum, getAlbumById } from "../api/albums.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemp = (album, ifOwner, onDelete) => html`
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src=${album.imgUrl}>
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${album.name}</h1>
                <h3>Artist: ${album.artist}</h3>
                <h4>Genre: ${album.genre}</h4>
                <h4>Price: $${album.price}</h4>
                <h4>Date: June 16, 2017</h4>
                <p>Description: ${album.description}</p>
            </div>
            ${ifOwner ? html`
            <!-- Only for registered user and creator of the album-->
            <div class="actionBtn">
                <a href=/edit/${album._id} class="edit">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
            </div>` : ''}
        </div>
    </div>
</section>`;

export async function detailsView(ctx) {
    const album = await getAlbumById(ctx.params.id);
    const userData = getUserData();
    const ifOwner = userData?.id == album._ownerId;

    ctx.render(detailsTemp(album, ifOwner, onDelete));

    async function onDelete() {
        const choice = confirm('Are u sure u want to delete this album?');

        if (choice) {
            await deleteAlbum(ctx.params.id);
            ctx.page.redirect('/catalog')
        }
    }
}