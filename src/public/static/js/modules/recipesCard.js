import { generateComments } from "./comment.js";
import { recipesDetails } from "./detailsRecipes.js";
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

async function recipeFavoriteData() {
    try {
        const response = await fetch(`/api/favorite/`);
        const data = await response.json();
        console.log("data fav:", data);

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
        const divSave = document.createElement("div");
        const imgSave = document.createElement("img");
        const textSave = document.createElement("p");
        const divComment = document.createElement("div");
        const imgComemnt = document.createElement("img");
        const textComment = document.createElement("p");
        const divLike = document.createElement("div");
        const imgLike = document.createElement("img");
        const textLike = document.createElement("p");
        const divUser = document.createElement("div");
        const divRecipe = document.createElement("div");
        const divButtons = document.createElement("div");

        divCard.append(divUser);
        divCard.append(divRecipe);
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

        divButtons.classList.add("post-div-buttons");
        divButtons.appendChild(divSave);
        divButtons.appendChild(divComment);
        divButtons.appendChild(divLike);
        divSave.id = "save";
        divComment.id = "comment";
        divLike.id = "like";

        divSave.appendChild(imgSave);
        divSave.appendChild(textSave);
        imgSave.src = "../static/svg/bookmark.svg";
        imgSave.style.width = "20px";
        textSave.innerText = "Salvar";
        divSave.addEventListener("click", async (event) => {
            event.stopPropagation();
            console.log("Salvando receita ", recipe.recipe_name);
            try {
                const response = await fetch(`/api/favorite/${recipe.recipe_id}`, {
                    method: 'POST',
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
                console.error('Erro ao tentar salvar receita:', error.message);
                alert('Erro ao tentar salvar receita', error.message);
            }
        });

        divComment.appendChild(imgComemnt);
        divComment.appendChild(textComment);
        imgComemnt.src = "../static/svg/comment.svg";

        imgComemnt.style.width = "20px";
        textComment.innerText = "Comentários";
        divComment.addEventListener("click", (event) => {
            event.stopPropagation();
            console.log("Comentar receita ", recipe.recipe_name);
            console.log("recipeData ", recipe);
            generateComments(recipe, divCard);
        });

        divLike.appendChild(imgLike);
        divLike.appendChild(textLike);
        imgLike.src = "../static/svg/like.svg";
        imgLike.src = "../static/svg/like.svg";
        imgLike.style.width = "20px";
        textLike.innerText = "Curtir";
        divLike.addEventListener("click", (event) => {
            event.stopPropagation();
            console.log("Curtir receita ", recipe.recipe_name);
        
        });


        imgUser.src = ""; //
        username.innerText = recipe.name_user;
        recipeTitle.innerText = recipe.recipe_name;
        if (recipe.recipe_image !== "") {
            imgRecipe.src = `../assets/uploads/recipe/${}`;
        }

        divCard.addEventListener("click", () => {
            modalContent.innerHTML = "";
            recipesDetails(recipe.recipe_id, recipe.recipe_name, recipe.name_user, recipe);

        });
        feed.appendChild(divCard);
    }

}

export { generateRecipeCards, recipesData, recipeFavoriteData };
