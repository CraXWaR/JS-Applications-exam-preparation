import { getDashboardPets } from "../api/pets.js";
import { html } from "../lib.js";

const dashboardTemp = (pets) => html`
<section id="dashboard">
    <h2 class="dashboard-title">Services for every animal</h2>
    <div class="animals-dashboard">
        ${pets.length == 0
        ? html`<p class="no-pets">No pets in dashboard</p>`
        : pets.map(petCard)}
        </div>
    </div>
</section>`;

const petCard = (pet) => html`
<div class="animals-board">
    <article class="service-img">
        <img class="animal-image-cover" src=${pet.image}>
    </article>
    <h2 class="name">${pet.name}</h2>
    <h3 class="breed">${pet.breed}</h3>
    <div class="action">
        <a class="btn" href="/dashboard/${pet._id}">Details</a>
    </div>
</div>`


export async function dashboardPage(ctx) {
    const pets = await getDashboardPets();

    ctx.render(dashboardTemp(pets))
}