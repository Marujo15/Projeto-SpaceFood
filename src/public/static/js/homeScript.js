import { createRecipeCard } from "./modules/postRecipe.js";
import { generateRecipeCards, recipesData } from "./modules/recipesCard.js";
import { recipeFavoriteData } from "./modules/btnfavorite.js";
import { setCurrentTab } from "./modules/tabIdentifier.js";

const feed = document.getElementById("feed");
const modal = document.getElementById('recipeModal');
const btnHome = document.getElementById("home");
const btnPost = document.getElementById("post");
const btnSearch = document.getElementById("search");
const btnFavorites = document.getElementById("favorites");

home(feed, modal);

btnHome.addEventListener("click", () => {
    setCurrentTab("home");
    home(feed, modal);
});

btnPost.addEventListener("click", () => {
    createRecipeCard();
});

btnSearch.addEventListener("click", () => {
    feed.innerHTML = '';
    search();
});

btnFavorites.addEventListener("click", () => {
    setCurrentTab("favorite");
    favorites(feed, modal);
});

function home(feed, modal) {
    feed.innerHTML = '';
    modal.style.display = "none";
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

function favorites(feed, modal) {
    feed.innerHTML = '';
    modal.style.display = "none";
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

export { favorites, home };