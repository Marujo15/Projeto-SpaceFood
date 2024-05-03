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

    const icon = await iconBtnFavorite(recipe);
    imgSave.src = icon.imgSave;
    textSave.innerText = icon.textSave;

    divSave.addEventListener("click", async () => {
        const favoriteData = JSON.parse(localStorage.getItem('favoriteData'));

        const isFavorited = favoriteData.data.some(item => item.recipe_id === recipe_id);

        if (isFavorited) {
            deleteFavorite(recipe_id, recipesData);

            imgSave.src = "../static/svg/bookmark.svg";
            textSave.innerText = "Favoritar";

            favoriteData.data = favoriteData.data.filter(item => item.recipe_id !== recipe_id);

            localStorage.setItem('favoriteData', JSON.stringify(favoriteData));

            const currentTab = getCurrentTab();
            if (currentTab === "favorite") {
                favorites(feed, modal);

            }

        } else {

            addFavorite(recipe_id, recipesData);

            imgSave.src = "../static/svg/bookmark_fav.svg";
            textSave.innerText = "Favoritado";

            const newFavorite = { "recipe_id": recipe_id, "recipe_name": recipe.recipe_name, "recipe_image": recipe.recipe_image };

            favoriteData.data.push(newFavorite);

            localStorage.setItem('favoriteData', JSON.stringify(favoriteData));
        }
    });

    document.addEventListener('modalFechado', async () => {
        const icon = await iconBtnFavorite(recipe);
        imgSave.src = icon.imgSave;
        textSave.innerText = icon.textSave;
    });
}

async function iconBtnFavorite(recipe) {
    const favoriteData = JSON.parse(localStorage.getItem('favoriteData'));

    const data = {
        imgSave: "",
        textSave: "",
    }
    if (favoriteData && favoriteData.data) {
        const isFavorited = favoriteData.data.some(fav => fav.recipe_id === recipe.recipe_id);
        if (isFavorited) {
            data.imgSave = "../static/svg/bookmark_fav.svg";
            data.textSave = "Favoritado";
        } else {
            data.imgSave = "../static/svg/bookmark.svg";
            data.textSave = "Favoritar";
        }
    } else {
        data.imgSave = "../static/svg/bookmark.svg";
        data.textSave = "Favoritar";
    }
    return data;
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

export { buttonSave, recipeFavoriteData, iconBtnFavorite }