import { getUserData } from './util.js';
import { page, render } from './lib.js';
import { logout } from './api/users.js';
import { homeView } from './views/home-page.js';
import { loginView } from './views/login-page.js';
import { registerView } from './views/register-page.js';
import { catalogView } from './views/catalog-page.js';
import { createView } from './views/create-page.js';
import { detailsView } from './views/details-page.js';
import { editView } from './views/edit-page.js';

const main = document.getElementById("main-content");

document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decoratePage);
page('/home', homeView);
page('/login', loginView);
page('/register', registerView);
page('/catalog', catalogView);
page('/create', createView);
page('/catalog/:id', detailsView)
page('/edit/:id', editView);

updateNav();
page.start();

function decoratePage(ctx, next) {
    ctx.render = renderMain;
    ctx.updateNav = updateNav;

    next();
}

function renderMain(templateResult) {
    render(templateResult, main);

}

function updateNav() {
    const userData = getUserData();

    if (userData) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('register').style.display = 'none';
        document.getElementById('create').style.display = 'block';
        document.getElementById('logoutBtn').style.display = 'block';
    } else {
        document.getElementById('login').style.display = 'block';
        document.getElementById('register').style.display = 'block';
        document.getElementById('create').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'none';
    }
}

function onLogout() {
    logout();
    updateNav();
    page.redirect('/home')
}