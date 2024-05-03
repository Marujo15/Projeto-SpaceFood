import { recipesDetails } from "./detailsRecipes.js";
import { buttonComment } from "./btnComment.js";
import { buttonLike } from "./btnlike.js";
import { buttonSave } from "./btnfavorite.js";
import { perfil } from "./perfil.js";
import { setCurrentTab } from "./tabIdentifier.js";


async function recipesData() {
    try {
        const response = await fetch(`/api/recipe/`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Erro ao tentar recuperar os dados da receita');
        }
        return data;

    } catch (error) {
        console.error('Erro ao recuperar dados da receita:', error.message);
    }
}

async function recipesDataFollowers() {
    try {
        const response = await fetch(`/api/recipe/following/`);

        const data = await response.json();
        if (!response.ok) {
            throw new Error('Erro ao tentar recuperar os dados da receita');
        }
        return data;

    } catch (error) {
        console.error('Erro ao recuperar dados da receita:', error.message);
    }
}

async function recipesDataPerfil(user_id) {
    try {
        const response = await fetch(`/api/recipe/`);
        const data = await response.json();

        const dataPerfil = [];
        for (let index = 0; index < data.data.length; index++) {
            const dataRecipes = data.data;
            if (dataRecipes[index].user_id === user_id) {
                dataPerfil.push(dataRecipes[index]);
            }
        }

        if (!response.ok) {
            throw new Error('Erro ao tentar recuperar os dados da receita');
        }
        return dataPerfil;

    } catch (error) {
        console.error('Erro ao recuperar dados da receita:', error.message);
    }
}

export function elapseTime(postDate) {
    const recipeDate = new Date(`${postDate}`);
    const end = new Date();

    const minutes = (end - recipeDate) / 60000;
    const hours = minutes / 60;
    const days = hours / 24;

    if (minutes < 1) {
        return "Agora a pouco"
    } else if (minutes === 1) {
        return `Há ${Math.floor(minutes)} minuto`;
    } else if (minutes > 1 && minutes < 60) {
        return `Há ${Math.floor(minutes)} minutos`;
    } else if (hours === 1) {
        return `Há ${Math.floor(hours)} hora`;
    } else if (hours > 1 && hours <= 24) {
        return `Há ${Math.floor(hours)} horas`;
    }else if (days === 1 ) {
        return `Há ${Math.floor(days)} dia`;
    } else if (days > 1 && days <= 7) {
        return `Há ${Math.floor(days)} dias`;
    } else {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const localDate = recipeDate.toLocaleDateString(undefined, options);

        return localDate;
    }
}

function generateRecipeCards(recipesData, quantity, feed) {
    const modalContent = document.getElementById('recipe-content');
    let recipes;

    if (recipesData.data) {
        recipes = recipesData.data;
    } else {
        recipes = recipesData;
    }

    for (let i = 0; i < quantity && i < recipes.length; i++) {
        const recipe = recipes[i];

        const post = document.createElement("div");
        const divCard = document.createElement("div");
        const divImageUser = document.createElement("div");
        const imgUser = document.createElement("img");
        const divUsernamePublication = document.createElement("div");
        const publicationDate = document.createElement("p");
        const username = document.createElement("p");
        const recipeTitle = document.createElement("p");
        const imgRecipe = document.createElement("img");
        const divUser = document.createElement("div");
        const divRecipe = document.createElement("div");
        const divButtons = document.createElement("div");
        const divDetails = document.createElement("div");

        divDetails.appendChild(divRecipe);
        divCard.appendChild(divUser);
        divCard.append(divDetails);
        divCard.append(divButtons);

        divCard.classList.add(`post-div`)
        post.appendChild(divCard);
        post.classList.add("post-content")

        divUser.classList.add("post-div-perfil")
        divUser.appendChild(divImageUser);
        divUser.appendChild(divUsernamePublication);
        divUser.classList.add("card-user")
        divUser.addEventListener("click", () => {

            const userID = recipe.user_id

            fetch(`/api/user/${userID}`)
                .then(response => response.json())
                .then(data => {
                    feed.innerHTML = ""
                    setCurrentTab('perfil')
                    perfil(feed, data, 'follow')
                })
                .catch(err => {
                    console.error(err);
                })

        })

        divImageUser.appendChild(imgUser);
        divImageUser.classList.add("card-image-user");
        imgUser.classList.add("image-user");

        divUsernamePublication.appendChild(username);
        divUsernamePublication.appendChild(publicationDate);
        divUsernamePublication.classList.add("info-user");
        publicationDate.classList.add("card-published");
        username.classList.add("comment-username");

        divRecipe.classList.add("post-div-title");
        divRecipe.appendChild(recipeTitle);
        divRecipe.appendChild(imgRecipe);
        recipeTitle.id = "recipe-title";
        imgRecipe.id = "recipe-image";
        imgRecipe.src = `../assets/${recipe.recipe_image}`;

        const recipe_id = recipe.recipe_id;

        divButtons.classList.add("post-div-buttons");
        buttonSave(recipe, divButtons, recipesData, recipe_id);
        buttonComment(recipe, divButtons, post, recipe_id);
        buttonLike(recipe, divButtons, recipe_id);

            imgUser.src = `./assets/${recipe.user_image}`;

        username.innerText = recipe.name_user;

        const elapseDate = elapseTime(recipe.recipe_date);

        publicationDate.innerText = elapseDate;
        recipeTitle.innerText = recipe.recipe_name;

        divDetails.addEventListener("click", () => {
            modalContent.innerHTML = "";
            recipesDetails(recipe.recipe_id, recipe.name_user, recipe.user_image, elapseDate, recipesData);
        });
        feed.appendChild(post);
    }

}

export { generateRecipeCards, recipesData, recipesDataPerfil, recipesDataFollowers };
