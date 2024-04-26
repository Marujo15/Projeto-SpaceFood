/* const jwt = require('jsonwebtoken');
const config = require('../.../src/config'); */

import event from "./modules/event.js"
import { search } from "./modules/search.js";
import { createRecipeCard } from "./modules/postRecipe.js";
import { generateRecipeCards, recipesData } from "./modules/recipesCard.js";
import { recipeFavoriteData } from "./modules/btnfavorite.js";
import { setCurrentTab } from "./modules/tabIdentifier.js";
import { perfil } from "./modules/perfil.js";


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
                    <button id="all" class="roboto header-button-all selected">Todos</button>
                    <button id="following" class="roboto header-button-following">Seguindo</button>
                    <div id="search-header"></div>
                    <div id="search-user"></div>
                </div>
            </header>
            <div class="aside-main">
                <aside>
                    <div class="abas">
                        <button id=home class="aba-home aba-button">
                            <i class='bx bxs-home'></i>
                            <span class="roboto icone-space">Início</span>
                        </button>
                        <button id="search" class="aba-search aba-button">
                            <i class='bx bx-search'></i>
                            <span class="roboto icone-space">Pesquisar</span>
                        </button>
                        <button id="favorites" class="aba-favorites aba-button">
                            <i class='bx bxs-bookmark'></i>
                            <span class="roboto icone-space">Favoritos</span>
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
    homeScript();

    return homeContent;
}

export async function homeScript() {

    const feed = document.getElementById("feed");
    const modal = document.getElementById('recipeModal');
    const btnHome = document.getElementById("home");
    const btnPost = document.getElementById("post");
    const btnSearch = document.getElementById("search");
    const btnFavorites = document.getElementById("favorites");
    const btnPerfil = document.querySelector(".button-user")

    // const headerAll = document.getElementById("all");
    // const headerFollowing = document.getElementById("following");
    // const headerSeacherUser = document.getElementById("search-user");
    // const headerSearchFavorite = document.getElementById("search-header");

    async function getLogin() {
        try {
            const response = await fetch(`/api/user/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            console.log("response:", response)
            const data = await response.json();
            console.log("data:", data)

            if (!response.ok) {
                // deletar cookies
                const customEvent = event('/');
                window.dispatchEvent(customEvent);
                throw new Error("Erro ao recuperar dados do usuário");
            }
            return data;
        }

        catch (error) {
            console.error(error.message);
            const customEvent = event('/');
            window.dispatchEvent(customEvent);
        }
        if (!response.ok) {
            // deletar cookies
            const customEvent = event('/');
            window.dispatchEvent(customEvent);
            throw new Error("Erro ao recuperar dados do usuário");
        }
        return data;
    }



const data = await getLogin();

const userName = document.getElementById('user-name')
const userUsername = document.getElementById('user-username')

// userName.innerText = data.name
// userUsername.innerText = '@' + data.username

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
    setCurrentTab("search");
    search(feed);
});

btnFavorites.addEventListener("click", () => {
    setCurrentTab("favorite");
    favorites(feed, modal);
});

    btnPerfil.addEventListener('click', () => {
        feed.innerHTML = ''
        setCurrentTab('perfil')
        perfil(feed, data, "edit")
    })

}

export function favorites(feed, modal) {
    feed.innerHTML = '';
    modal.style.display = "none";
    const headerAll = document.getElementById("all");
    const headerFollowing = document.getElementById("following");
    const headerSeacherUser = document.getElementById("search-user");
    const headerSearchFavorite = document.getElementById("search-header");

    const currentTab = getCurrentTab();
    if (currentTab === "favorite") {
        headerAll.style.display = "none";
        headerFollowing.style.display = "none";
        headerSeacherUser.style.display = "none";
        headerSearchFavorite.style.display = "block";
        console.log("nova aba,", headerSearchFavorite);
        headerSearchFavorite.innerText = "Favoritos";
    }

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

export function home(feed, modal) {
    feed.innerHTML = '';
    modal.style.display = "none";
    recipesData().then(data => {
        getPosts(data, 10);
    }).catch(error => {
        console.error(error);
    });
    export function home(feed, modal) {
        feed.innerHTML = '';
        modal.style.display = "none";

        const headerAll = document.getElementById("all");
        const headerFollowing = document.getElementById("following");
        const headerSeacherUser = document.getElementById("search-user");
        const headerSearchFavorite = document.getElementById("search-header");

        const currentTab = getCurrentTab();
        if (currentTab === "home") {
            headerAll.style.display = "block";
            headerFollowing.style.display = "block";
            headerSeacherUser.style.display = "block";
            console.log("nova aba,", headerSearchFavorite);
            
            headerSearchFavorite.style.display = "none";
            
        }

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