import { html } from "../lib.js";
import { bookPreview } from './common.js';
import { getAllBooks } from '../api/data.js';

let homeTemplate = (books) => html`
<section id="dashboard-page" class="dashboard">
<h1>Dashboard</h1>
${books.length == 0 ?
        html`<p class="no-books">No books in database!</p>` :
        html`<ul class="other-book-list">${books.map(bookPreview)}</ul>`}
</section>
`;

export async function homePage(ctx) {
    const books = await getAllBooks();
    ctx.render(homeTemplate(books))
}