import { createRecipeCard } from "./modules/postRecipe.js";
import { generateRecipeCards, recipesData, recipeFavoriteData } from "./modules/recipesCard.js";

const feed = document.getElementById("feed");
const modal = document.getElementById('recipeModal');
const btnHome = document.getElementById("home");
const btnPost = document.getElementById("post");
const btnSearch = document.getElementById("search");
const btnFavorites = document.getElementById("favorites");

home();

btnHome.addEventListener("click", () => {
    feed.innerHTML = '';
    modal.style.display = "none";
    home();
});

btnPost.addEventListener("click", () => {
    createRecipeCard();
});

btnSearch.addEventListener("click", () => {
    feed.innerHTML = '';
    search();
});

btnFavorites.addEventListener("click", () => {
    feed.innerHTML = '';
    modal.style.display = "none";
    favorites();
});

function home() {
    recipesData().then(data => {
        getPosts(data, 10);
    }).catch(error => {
        console.error(error);
    });

    async function getPosts(data, quantity) {
        try {
            generateRecipeCards(data, quantity, feed);
        } catch (error) {
            console.error(error);
        }
    }
}


function search() {

}

function favorites() {
    recipeFavoriteData().then(data => {
        getPosts(data, 10);
    }).catch(error => {
        console.error(error);
    });

    async function getPosts(data, quantity) {
        try {
            generateRecipeCards(data, quantity, feed);
        } catch (error) {
            console.error(error);
        }
    }
}