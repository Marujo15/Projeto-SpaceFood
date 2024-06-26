import { search } from "./modules/search.js";
import event from "./modules/event.js"
import { createRecipeCard } from "./modules/postRecipe.js";
import { generateRecipeCards, recipesData, recipesDataFollowers } from "./modules/recipesCard.js";
import { recipeFavoriteData } from "./modules/btnfavorite.js";
import { setCurrentTab, getCurrentTab } from "./modules/tabIdentifier.js";
import { perfil } from "./modules/perfil.js"

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
                <div id="header-btn" class="header-buttons">
                    <button id="all" class="roboto header-button-all selected">Todos</button>
                    <button id="following" class="roboto header-button-following">Seguindo</button>
                    <div id="search-header"></div>
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
                            <img src="#" id="user-image" alt="user-photo">
                            <div class="user-details">
                                <span id="user-name"></span>
                                <span id="user-username"></span>
                            </div>
                        </button>
                        <button id="logout-button">
                            <img class="logout-svg" src="../static/svg/logout.svg">
                            <span>Sair</span>
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
    const modalContent = document.getElementById('recipe-content')
    const headerFollowing = document.getElementById("following");
    const btnAll = document.getElementById("all");
    const logoutButton = document.getElementById('logout-button')

    async function getLogin() {
        try {
            const response = await fetch(`/api/user/0`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await response.json();

            if (!response.ok) {
                await fetch(`/api/user/login`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                const customEvent = event('/login');
                window.dispatchEvent(customEvent);
                throw new Error("Erro ao recuperar dados do usuário");
            }
            return data;
        }

        catch (error) {
            await fetch(`/api/user/login`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            console.error(error.message);
            const customEvent = event('/login');
            window.dispatchEvent(customEvent);
        }
    }

    const data = await getLogin();



    const userName = document.getElementById('user-name')
    const userUsername = document.getElementById('user-username')
    const userImage = document.getElementById('user-image')

    userName.innerText = data.data.user_name
    userUsername.innerText = '@' + data.data.user_username
    userImage.src = `/assets/${data.data.user_image}`

    home(feed, modal);

    headerFollowing.addEventListener("click", () => {
        folowed(feed, modal)
        modal.style.display = "none";
        history.pushState(null, null, '/following');
    });

    btnAll.addEventListener("click", () => {
        setCurrentTab("home");
        home(feed, modal);
        modal.style.display = "none";
        history.pushState(null, null, '/posts');
    })

    btnHome.addEventListener("click", () => {
        setCurrentTab("home");
        home(feed, modal);
        modal.style.display = "none";
        history.pushState(null, null, '/posts');
    });

    btnPost.addEventListener("click", () => {
        modal.style.display = "none";
        createRecipeCard();
    });

    btnSearch.addEventListener("click", () => {
        feed.innerHTML = '';
        modal.style.display = "none";
        setCurrentTab("search");
        search(feed);
        history.pushState(null, null, '/search');
    });

    btnFavorites.addEventListener("click", () => {
        feed.innerHTML = '';
        modal.style.display = "none";
        setCurrentTab("favorite");
        console.log("fav?", getCurrentTab());
        favorites(feed, modal);
        history.pushState(null, null, '/favorites');
    });

    btnPerfil.addEventListener('click', () => {
        feed.innerHTML = '';
        modal.style.display = "none";
        setCurrentTab("perfil");

        const header = document.getElementById("header-btn");
        const currentTab = getCurrentTab();

        if (currentTab === "perfil") {
            header.style.display = "none";
        }

        fetch(`/api/user/0`)
            .then(response => response.json())
            .then(data => {
                feed.innerHTML = ""
                perfil(feed, data, "edit", modal, modalContent, { userName, userUsername })
            })
            .catch(err => {
                console.error(err);
            })
        history.pushState(null, null, '/perfil');
    })

    logoutButton.addEventListener('click', () => {
        fetch('/api/user/login', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                feed.innerHTML = ""
                modal.style.display = "none";
                const customEvent = event('/login')
                window.dispatchEvent(customEvent)
            })
            .catch(err => {
                console.error(err);
            })
        localStorage.removeItem('likeData');
        localStorage.removeItem('favoriteData');
    })
}

export function favorites(feed, modal) {
    feed.innerHTML = '';
    modal.style.display = "none";

    const header = document.getElementById("header-btn");
    const headerAll = document.getElementById("all");
    const headerFollowing = document.getElementById("following");
    const headerSearchFavorite = document.getElementById("search-header");

    const currentTab = getCurrentTab();
    if (currentTab === "favorite") {
        header.style.display = "flex";
        headerAll.style.display = "none";
        headerFollowing.style.display = "none";
        headerSearchFavorite.style.display = "block";

        header.style.borderBottom = "1px solid #0000004f";
        headerSearchFavorite.innerText = "Favoritos";
        headerSearchFavorite.classList.add("roboto", "searche-title");
    }

    recipeFavoriteData().then(data => {
        getPosts(data, data.data.length);
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

    const header = document.getElementById("header-btn");
    const headerAll = document.getElementById("all");
    const headerFollowing = document.getElementById("following");
    const headerSearchFavorite = document.getElementById("search-header");

    const currentTab = getCurrentTab();
    if (currentTab === "home") {
        header.style.display = "flex";
        headerAll.style.display = "block";
        headerFollowing.style.display = "block";
        headerSearchFavorite.style.display = "none";
        header.style.borderBottom = "1px solid #0000004f";

        if (headerFollowing.classList.contains("selected")) {
            headerAll.classList.add("selected");
            headerFollowing.classList.remove("selected");
        }
    }

    recipesData().then(data => {
        getPosts(data, data.data.length);
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

export async function folowed(feed, modal) {
    feed.innerHTML = '';
    modal.style.display = "none";

    const header = document.getElementById("header-btn");
    const headerAll = document.getElementById("all");
    const headerFollowing = document.getElementById("following");
    const headerSearchFavorite = document.getElementById("search-header");

    const currentTab = getCurrentTab();
    if (currentTab === "home") {
        header.style.display = "flex";
        headerAll.style.display = "block";
        headerFollowing.style.display = "block";
        headerSearchFavorite.style.display = "none";
        header.style.borderBottom = "1px solid #0000004f";

        if (headerAll.classList.contains("selected")) {
            headerAll.classList.remove("selected");
            headerFollowing.classList.add("selected");
        }
    }

    recipesDataFollowers().then(data => {
        console.log("data home follow", data)
        getPosts(data, data.data.length);
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