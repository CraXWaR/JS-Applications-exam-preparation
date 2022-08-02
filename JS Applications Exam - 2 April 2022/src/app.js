import { logout } from './api/users.js';
import { page, render } from './lib.js'
import { getUserData } from './util.js';
import { createPage } from './views/createView.js';
import { dashboardPage } from './views/dashboardView.js';
import { detailsPage } from './views/detailsView.js';
import { editPage } from './views/editView.js';
import { homePage } from './views/homeView.js';
import { loginPage } from './views/loginView.js';
import { registerPage } from './views/registerView.js';

const main = document.getElementById('content');

document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decoratePage);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/dashboard', dashboardPage);
page('/dashboard/:id', detailsPage);
page('/createPostcard', createPage);
page('/edit/:id', editPage);


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
        document.getElementById('register').style.display = 'none';
        document.getElementById('login').style.display = 'none';
        document.getElementById("create").style.display = 'block';
        document.getElementById("logoutBtn").style.display = 'block';
    } else {
        document.getElementById('register').style.display = 'block';
        document.getElementById('login').style.display = 'block';
        document.getElementById("create").style.display = 'none';
        document.getElementById("logoutBtn").style.display = 'none';
    }
}

function onLogout() {
    logout();
    updateNav();
    page.redirect('/')
}