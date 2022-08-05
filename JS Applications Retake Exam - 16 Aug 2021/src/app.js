import { logout } from './api/users.js';
import { page, render } from './lib.js';
import { getUserData } from './util.js';
import { allGamesCatalogue } from './views/allgames-page.js';
import { createView } from './views/create-page.js';
import { editView } from './views/edit-page.js';
import { gameDetailsView } from './views/game-details-page.js';
import { homeView } from './views/home-page.js';
import { loginView } from './views/login-page.js';
import { regiterView } from './views/register-page.js';

const main = document.getElementById("main-content");

document.getElementById('logoutBtn').addEventListener('click', onLogout)

page(decoratePage);
page('/', homeView);
page('/login', loginView);
page('/register', regiterView);
page('/all-games', allGamesCatalogue);
page('/all-games/:id', gameDetailsView);
page('/create', createView);
page('/edit/:id', editView);

updateNav();
page.start();

function decoratePage(ctx, next) {
    ctx.render = renderMainPage;
    ctx.updateNav = updateNav;

    next();
}

function renderMainPage(templateResult) {
    render(templateResult, main);

}

function updateNav() {
    const userData = getUserData();
    if (userData) {
        document.getElementById('user').style.display = 'block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}

function onLogout() {
    logout();
    updateNav();
    page.redirect('/')
}