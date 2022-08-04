import { getAllAlbums } from "../api/albums.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const catalogTemp = (albums) => html`
<section id="catalogPage">
    <h1>All Albums</h1>
    <!--No albums in catalog-->
    ${albums.length == 0 ? html`<p>No Albums in Catalog!</p>` : 
    albums.map(albumCards)}
    
</section>`;

const albumCards = (album) => {
    if (getUserData()) {
        return html`
        <div class="card-box">
            <img src=${album.imgUrl}>
            <div>
                <div class="text-center">
                    <p class="name">Name: ${album.name}</p>
                    <p class="artist">Artist: ${album.artist}</p>
                    <p class="genre">Genre: ${album.genre}</p>
                    <p class="price">Price: $${album.price}</p>
                    <p class="date">Release Date: ${album.releaseDate}</p>
                </div>
                <div class="btn-group">
                    <a href="/catalog/${album._id}" id="details">Details</a>
                </div>
            </div>
        </div>;`
    }
    return html`
    <div class="card-box">
        <img src=${album.imgUrl}>
        <div>
            <div class="text-center">
                <p class="name">Name: ${album.name}</p>
                <p class="artist">Artist: ${album.artist}</p>
                <p class="genre">Genre: ${album.genre}</p>
                <p class="price">Price: $${album.price}</p>
                <p class="date">Release Date: ${album.releaseDate}</p>
            </div>
        </div>
    </div>;`
}



export async function catalogView(ctx) {
    const albums = await getAllAlbums();
    const userData = getUserData();

    if (userData) {
        
    }

    ctx.render(catalogTemp(albums))
}