import { logout } from './api/users.js';
import { page, render } from './lib.js'
import { getUserData } from './util.js';
import { catalogView } from './views/catalogView.js';
import { viewCreate } from './views/createView.js';
import { detailsView } from './views/detailsView.js';
import { viewEdit } from './views/editView.js';

import { viewHome } from './views/homeView.js';
import { viewLogin } from './views/loginView.js';
import { profileView } from './views/profileView.js';
import { viewRegister } from './views/registerView.js';

const main = document.querySelector('main')

document.getElementById('logoutBtn').addEventListener('click', onLogout)

page(decorateCtx);
page('/', viewHome);
page('/memes', catalogView);
page('/memes/:id', detailsView);
page('/edit/:id', viewEdit);
page('/login', viewLogin);
page('/register', viewRegister);
page('/createMeme', viewCreate);
page('/profile', profileView);

updateNav()
page.start()

function decorateCtx(ctx, next) {
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
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
        document.querySelector('.user span').textContent = `Welcome, ${userData.email}`;
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}

function onLogout() {
    logout();
    updateNav();
    page.redirect('/')
}