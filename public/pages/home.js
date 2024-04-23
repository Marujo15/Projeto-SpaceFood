/* const jwt = require('jsonwebtoken');
const config = require('../.../src/config'); */
import event from "./modules/event.js"
import { createRecipeCard } from "./modules/postRecipe.js";
import { generateRecipeCards, recipesData, recipeFavoriteData } from "./modules/recipesCard.js";

export const homePage = () => {

    const homeContent = document.createElement('div');
    homeContent.classList.add('home-content')
    homeContent.innerHTML = `
        <link rel="stylesheet" href="../static/css/homeStyle.css">
        <header>
            <div class="header-logo">
                <span class="logo-space kaushan">Space</span>
                <span class="logo-food kaushan">Food</span>
            </div>
            <div class="header-buttons">
                <button class="roboto header-button-all selected">Todos</button>
                <button class="roboto header-button-following">Seguindo</button>
            </div>
        </header>
        <div class="aside-main">
            <aside>
                <div class="abas">
                    <button id=home class="aba-home aba-button">
                        <i class='bx bxs-home'></i>
                        <span class="roboto">Início</span>
                    </button>
                    <button id="search" class="aba-search aba-button">
                        <i class='bx bx-search'></i>
                        <span class="roboto">Pesquisar</span>
                    </button>
                    <button id="favorites" class="aba-favorites aba-button">
                        <i class='bx bxs-bookmark'></i>
                        <span class="roboto">Favoritos</span>
                    </button>
                </div>
                <div id="post" class="button-write">
                    <button class="roboto-5">Escrever</button>
                </div>
                <div class="button-user-div">
                    <button class="button-user">
                        <img src="#" alt="user-photo">
                        <div class="user-details">
                            <span id="user-name"></span>
                            <span id="user-username"></span>
                        </div>
                    </button>
                </div>
            </aside>
            <main class="posts">
                <div id="feed" class="posts-feed"></div>
                <div id="recipeModal" class="modal" style="display: none;">
                    <button id="closeModal" class="close-modal">X</button>
                    <div id="recipe-content" class="modal-content"></div>
                    <div id="error-message" class="error-message" style="display: none;"></div>
                </div>
            </main>
        </div>
        `;

    document.getElementById("root").innerHTML = '';
    document.getElementById("root").appendChild(homeContent);
    homeScript()

    root.appendChild(homeContent)

    return homeContent
}

export async function homeScript() {

    const feed = document.getElementById("feed");
    const modal = document.getElementById('recipeModal');
    const btnHome = document.getElementById("home");
    const btnPost = document.getElementById("post");
    const btnSearch = document.getElementById("search");
    const btnFavorites = document.getElementById("favorites");

    try {
        const response = await fetch(`/api/user/login`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const data = await response.json()

        if (!response.ok) {
            alert(data.error);
            // deletar cookies
            const customEvent = event('/');
            window.dispatchEvent(customEvent);
        }
    } 
    catch (error) {
        alert(data.error);
        // deletar cookies
        const customEvent = event('/');
        window.dispatchEvent(customEvent);
    }



    const userName = document.getElementById('user-name')
    const userUsername = document.getElementById('user-username')

    userName.innerText = data.name
    userUsername.innerText = '@' + data.username

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


}
