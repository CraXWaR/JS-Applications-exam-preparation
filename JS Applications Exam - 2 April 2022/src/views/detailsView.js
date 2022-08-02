import { html } from "../lib.js";
import { deletePetById, getPetById } from "../api/pets.js";
import { getUserData } from "../util.js";

const detailsTemp = (pet, ifOwner, onDelete) => html`
<section id="detailsPage">
    <div class="details">
        <div class="animalPic">
            <img src=${pet.image}>
        </div>
        <div>
            <div class="animalInfo">
                <h1>Name: ${pet.name}</h1>
                <h3>Breed: ${pet.breed}</h3>
                <h4>Age: ${pet.age}</h4>
                <h4>Weight: ${pet.weight}</h4>
                <h4 class="donation">Donation: 0$</h4>
            </div>
            ${ifOwner ? html`
            <div class="actionBtn">
            <!-- Only for registered user and creator of the pets-->
                <a href="/edit/${pet._id}" class="edit">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
                <!--(Bonus Part) Only for no creator and user-->
                <a  href="" class="donate">Donate</a>
        </div>` : ''}
        </div>
    </div>
</section>`;
            
export async function detailsPage(ctx) {
    const pet = await getPetById(ctx.params.id);
    const userData = getUserData();
    const ifOwner = userData?.id == pet._ownerId;

    ctx.render(detailsTemp(pet, ifOwner, onDelete));

    async function onDelete() {
        
        const choice = confirm('Are u sure u want to delete this post?');

        if (choice) {
            await deletePetById(ctx.params.id);
            ctx.page.redirect('/');
        }
    }
}