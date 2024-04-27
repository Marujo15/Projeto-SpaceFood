import { favorites } from "../home.js";
import { getCurrentTab } from "./tabIdentifier.js";

async function buttonSave(recipe, divButtons, recipesData, recipe_id) {
    const feed = document.getElementById("feed");
    const modal = document.getElementById('recipeModal');
    const divSave = document.createElement("div");
    const imgSave = document.createElement("img");
    const textSave = document.createElement("p");
    divButtons.appendChild(divSave);
    divSave.id = "save";
    divSave.appendChild(imgSave);
    divSave.appendChild(textSave);
    textSave.classList.add("icone-space");
    imgSave.style.width = "20px";

    const favoriteData = await recipeFavoriteData();

    if (favoriteData && favoriteData.data) {
        const isFavorited = favoriteData.data.some(fav => fav.recipe_id === recipe.recipe_id);
        if (isFavorited) {
            imgSave.src = "../static/svg/bookmark_fav.svg";
            textSave.innerText = "Favoritado";
        } else {
            imgSave.src = "../static/svg/bookmark.svg";
            textSave.innerText = "Favoritar";
        }
    } else {
        imgSave.src = "../static/svg/bookmark.svg";
        textSave.innerText = "Favoritar";
    }

    divSave.addEventListener("click", async () => {
        const fav = await addFavorite(recipe_id, recipesData);
        if (fav) {
            imgSave.src = "../static/svg/bookmark_fav.svg";
            textSave.innerText = "Favoritado";
        } else {
            await deleteFavorite(recipe_id, recipesData);
            imgSave.src = "../static/svg/bookmark.svg";
            textSave.innerText = "Favoritar";

            const currentTab = getCurrentTab();
            if (currentTab === "favorite") {
                favorites(feed, modal);
            }
        }
    });
}

async function addFavorite(recipe_id, recipesData) {
    try {
        const response = await fetch(`/api/favorite/${recipe_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipesData)
        });
        if (!response.ok) {
            const error = await response.json();
            console.log(error.error);
            return false;
        }
        return true;
    } catch (error) {
        console.error('Erro ao tentar verificar a existencia da receita em favoritos:', error.message);
        alert('Erro ao tentar verificar a existencia da receita em favoritos', error.message);
    }
}

async function deleteFavorite(recipe_id, recipesData) {
    try {
        const response = await fetch(`/api/favorite/${recipe_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipesData)
        });
        if (!response.ok) {
            const error = await response.json();
            console.log(error.error);
        }

    } catch (error) {
        console.error('Erro ao recuperar dados da receita:', error.message);
        // errorMessage.innerText = error.message;
    }
}

async function recipeFavoriteData() {
    try {
        const response = await fetch(`/api/favorite/`);
        const data = await response.json();
        if (response.status === 404) {
            return false;
        }
        if (!response.ok) {
            throw new Error('Erro ao tentar recuperar os dados da receita');
        }
        return data;

    } catch (error) {
        console.error('Erro ao recuperar dados da receita:', error.message);
        errorMessage.innerText = error.message;
        return false;
    }
}

export { buttonSave, recipeFavoriteData }