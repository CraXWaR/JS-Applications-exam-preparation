import { register } from "../api/users.js";
import { html } from "../lib.js";

const registerTemp = (onSubmit) => html`
<section id="register-page" class="content auth">
    <form @submit=${onSubmit} id="register">
        <div class="container">
            <div class="brand-logo"></div>
            <h1>Register</h1>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="maria@email.com">

            <label for="pass">Password:</label>
            <input type="password" name="password" id="register-password">

            <label for="con-pass">Confirm Password:</label>
            <input type="password" name="confirm-password" id="confirm-password">

            <input class="btn submit" type="submit" value="Register">

            <p class="field">
                <span>If you already have profile click <a href="#">here</a></span>
            </p>
        </div>
    </form>
</section>`;

export function regiterView(ctx) {
    ctx.render(registerTemp(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const confirmPass = formData.get('confirm-password').trim();

        if (email == '' || password == '') {
            return alert('All fields are required!');
        }

        if (password != confirmPass) {
            return alert('Passwords don\'t match!');
        }

        await register(email, password, confirmPass);
        ctx.updateNav();
        ctx.page.redirect('/');
    }
}