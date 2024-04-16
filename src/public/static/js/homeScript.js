const { createRecipeCard } = require("../../modules/postRecipe");
const { generateRecipeCards, recipesData } = require("../../modules/recipesCard");

const feed = document.querySelector("main");
const btnHome = document.getElementById("home");
const btnPost = document.getElementById("post");
const btnSearch = document.getElementById("search");
const btnFavorites = document.getElementById("favorites");

home();

btnHome.addEventListener("click", () => {
    feed.innerHTML = '';
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

}

