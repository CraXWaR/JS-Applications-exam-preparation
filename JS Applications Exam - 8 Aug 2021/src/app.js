import { logout, register } from "./api/api.js";
import { page, html, render } from "./lib.js";
import { getUserData } from "./util.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { myBooksPage } from "./views/my-books.js";

const root = document.getElementById('site-content');

function decorateCtx(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNave = updateUserNav;

    next();
}

export function updateUserNav() {
    const userData = getUserData();
    if (userData) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
        document.querySelector('$user span').textContent = `Welcome, ${userData.email}`;
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block'; 
    }
}

document.getElementById('logoutBtn').addEventListener('click', (e) => {
    logout();
    updateUserNav();
    page.redirect('/');
});

page(decorateCtx);
page('/', homePage);
page('/login', loginPage);
page('/register', register);
page('/create', createPage);
page('/mybooks', myBooksPage)
page('/details/:id', detailsPage)
updateUserNav();
page.start();