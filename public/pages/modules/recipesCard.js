import { recipesDetails } from "./detailsRecipes.js";
import { buttonComment } from "./btnComment.js";
import { buttonLike } from "./btnlike.js";
import { buttonSave } from "./btnfavorite.js";


async function recipesData() {
    try {
        const response = await fetch(`/api/recipe/`);
        const data = await response.json();
        console.log("data recipeData:", data);

        if (!response.ok) {
            throw new Error('Erro ao tentar recuperar os dados da receita');
        }
        return data;

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
    } else if (minutes >= 1 && minutes < 60) {
        return `${Math.floor(minutes)} m`;
    } else if (hours >= 1 && hours <= 24) {
        return `${Math.floor(hours)} h`; 
    } else if (days >= 1 && days <= 7) {
        return `${Math.floor(days)} d`; 
    } else {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const localDate = recipeDate.toLocaleDateString(undefined, options);

        return localDate;
    }
}

function generateRecipeCards(recipesData, quantity, feed) {
    const modalContent = document.getElementById('recipe-content');

    for (let i = 0; i < quantity; i++) {
        const recipe = recipesData.data[i];
        console.log('recipe:', recipe)

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

        if (recipe.user_image === null) {
            imgUser.src = "static/svg/newUser.svg"
        } else {
            imgUser.src = `./assets/${recipe.user_image}`;
        }

        username.innerText = recipe.name_user;

        const elapseDate = elapseTime(recipe.recipe_date); 

        publicationDate.innerText = elapseDate;
        recipeTitle.innerText = recipe.recipe_name;

        divDetails.addEventListener("click", () => {
            modalContent.innerHTML = "";
            recipesDetails(recipe.recipe_id, recipe.name_user, recipe.user_image, elapseDate, recipesData);
            console.log("recipe", recipe);
        });
        feed.appendChild(post);
    }

}

export { generateRecipeCards, recipesData };
