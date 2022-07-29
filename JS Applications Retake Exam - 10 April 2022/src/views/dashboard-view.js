import { getAllPosts } from "../api/posts.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const dashboardTemplate = (posts) => html `
<section id="dashboard-page">
    <h1 class="title">All Posts</h1>
    ${posts.length == 0 ? 
    html `<h1 class="title no-posts-title">No posts yet!</h1>` : 
    
    posts.map(postCard)}`;

const postCard = (post) => html `
<div class="all-posts">
    <div class="post">
        <h2 class="post-title">${post.title}</h2>
        <img class="post-image" src=${post.imageUrl} alt="Material Image">
        <div class="btn-wrapper">
////////////<a href="/details" class="details-btn btn">Details</a>
        </div>
    </div>
</div>`;

export async function dashboardView(ctx) {
    if (getUserData()) {
        ctx.page.redirect('/dashboard');
    } else {
        const posts = await getAllPosts();
        ctx.render(dashboardTemplate(posts));
    }
}