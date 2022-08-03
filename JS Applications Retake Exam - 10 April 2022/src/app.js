import { logout } from "./api/users.js";
import { getUserData } from "./util.js";
import { page, render } from './lib.js';
import { loginView } from './views/login-view.js'
import { dashboardView } from "./views/dashboard-view.js";
import { registerView } from "./views/register-view.js";
import { createView } from "./views/createView.js";
import { detailsView } from "./views/detailsView.js";
import { profileView } from "./views/my-posts.js";

const main = document.getElementById('main-content');

document.getElementById('logoutBtn').addEventListener('click', onLogout)

page(decorateCtx);
page('/', dashboardView);
page('/login', loginView);
page('/register', registerView);
page('/create', createView);
page('/details/:id', detailsView);
page('/mypost', profileView);

updateNav();
page.start();

function decorateCtx(ctx, next) {
    ctx.render = renderMainEl;
    ctx.updateNav = updateNav;

    next();
}


function renderMainEl(templateResult) {
    render(templateResult, main);
}

function updateNav() {
    const userData = getUserData();
    if (userData) {
        document.querySelector('#user').style.display = 'block';
        document.querySelector('#guest').style.display = 'none';
    } else {
        document.querySelector('#user').style.display = 'none';
        document.querySelector('#guest').style.display = 'block';
    }
}

function onLogout() {
    logout();
    updateNav();
    page.redirect('/');
}