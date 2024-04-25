import { recipesDetails } from "./detailsRecipes.js";
import { buttonComment } from "./btnComment.js";
import { buttonLike } from "./btnlike.js";
import { buttonSave } from "./btnfavorite.js";

const modalContent = document.getElementById('recipe-content');
const errorMessage = document.getElementById('error-message');

async function recipesData() {
    try {
        const response = await fetch(`/api/recipe/`);
        const data = await response.json();
        console.log("data:", data);

        if (!response.ok) {
            throw new Error('Erro ao tentar recuperar os dados da receita');
        }
        return data;

    } catch (error) {
        console.error('Erro ao recuperar dados da receita:', error.message);
        errorMessage.innerText = error.message;
    }
}

function generateRecipeCards(recipesData, quantity, feed) {
    for (let i = recipesData.data.length - 1; i >= recipesData.data.length - quantity && i >= 0; i--) {
        const recipe = recipesData.data[i];

        const divCard = document.createElement("div");
        const imgUser = document.createElement("img");
        const username = document.createElement("p");
        const recipeTitle = document.createElement("p");
        const imgRecipe = document.createElement("img");
        const divUser = document.createElement("div");
        const divRecipe = document.createElement("div");
        const divButtons = document.createElement("div");
        const divDetails = document.createElement("div");

        divDetails.appendChild(divUser);
        divDetails.appendChild(divRecipe);
        divCard.append(divDetails);
        divCard.append(divButtons);

        divCard.classList.add(`post-div`)

        divUser.classList.add("post-div-perfil")
        divUser.appendChild(imgUser);
        divUser.appendChild(username);
        imgUser.id = "user-image";
        username.id = "username";
        imgUser.id = "user-image";
        username.id = "username";

        divRecipe.classList.add("post-div-title");
        divRecipe.appendChild(recipeTitle);
        divRecipe.appendChild(imgRecipe);
        recipeTitle.id = "recipe-title";
        imgRecipe.id = "recipe-image";
        recipeTitle.id = "recipe-title";
        imgRecipe.id = "recipe-image";

        const recipe_id = recipe.recipe_id;

        divButtons.classList.add("post-div-buttons");
        buttonSave(recipe, divButtons, recipesData, recipe_id);
        buttonComment(recipe, divButtons, divCard, recipe_id);
       buttonLike(recipe, divButtons, recipe_id);

        imgUser.src = ""; //
        username.innerText = recipe.name_user;
        recipeTitle.innerText = recipe.recipe_name;
        if (recipe.recipe_image !== "") {
            imgRecipe.src = `../assets/uploads/recipe/${recipe.recipe_id}`;
        }

        divDetails.addEventListener("click", () => {
            modalContent.innerHTML = "";
            recipesDetails(recipe.recipe_id, recipe.recipe_name, recipe.name_user, recipe, recipesData);

        });
        feed.appendChild(divCard);
    }

}

export { generateRecipeCards, recipesData };
