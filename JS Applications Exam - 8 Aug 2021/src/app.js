import { logout } from "./api/api.js";
import { registerPage } from "./views/register.js"
import { page, render } from "./lib.js";
import { getUserData } from "./util.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { myBooksPage } from "./views/my-books.js";
import { editView } from "./views/edit.js";

const root = document.getElementById('site-content');

function decorateCtx(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateNav = updateNav;

    next();
}

function updateNav() {
    const userData = getUserData();
    if (userData) {
        document.getElementById('user').style.display = 'block';
        document.getElementById('guest').style.display = 'none';
        document.querySelector('#user span').textContent = `Welcome, ${userData.email}`;
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}

document.getElementById('logoutBtn').addEventListener('click', (e) => {
    logout();
    updateNav();
    page.redirect('/');
});

page(decorateCtx);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/mybooks', myBooksPage)
page('/details/:id', detailsPage)
page('/edit/:id', editView)
updateNav();
page.start();

