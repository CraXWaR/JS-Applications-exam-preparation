import { register } from "../api/users.js";
import { html } from "../lib.js";

const registerTemp = (onSubmit) => html
`<section id="registerPage">
    <form @submit=${onSubmit}>
        <fieldset>
            <legend>Register</legend>

            <label for="email" class="vhide">Email</label>
            <input id="email" class="email" name="email" type="text" placeholder="Email">

            <label for="password" class="vhide">Password</label>
            <input id="password" class="password" name="password" type="password" placeholder="Password">

            <label for="conf-pass" class="vhide">Confirm Password:</label>
            <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

            <button type="submit" class="register">Register</button>

            <p class="field">
                <span>If you already have profile click <a href="#">here</a></span>
            </p>
        </fieldset>
    </form>
</section>`;

export function registerView(ctx) {
    ctx.render(registerTemp(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const email = formData.get('email');
        const password = formData.get('password');
        const confPass = formData.get('conf-pass')

        if (email == "" || password == "") {
            return alert('All fields are required!');
        }

        if (password != confPass) {
            return alert('Password don\'t match')
        }
        
        await register(email, password);
        ctx.updateNav();
        ctx.page.redirect('/home')
    }
}