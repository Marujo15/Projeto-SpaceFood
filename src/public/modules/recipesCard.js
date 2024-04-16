import { recipesDetails } from "./detailsRecipes";

const divCard = document.createElement("div");
const imgUser = document.createElement("img");
const username = document.createElement("p");
const recipeTitle = document.createElement("p");
const imgRecipe = document.createElement("img");
const divSave = document.createElement("div");
const imgSave = document.createElement("div");
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

divUser.appendChild(imgUser);
divUser.appendChild(username);
imgUser.id = "user-image"; //ainda não fizemos a parte de upload de imagens
username.id = "username"; //vai pegar do banco

divRecipe.appendChild(recipeTitle);
divRecipe.appendChild(imgRecipe);
recipeTitle.id = "recipe-title"; //vai pegar do banco
imgRecipe.id = "recipe-image"; //ainda não tem 

divButtons.appendChild(divSave);
divButtons.appendChild(divComment);
divButtons.appendChild(divLike);
divSave.id = "save";
divComment.id = "comment";
divLike.id = "like";

divSave.appendChild(imgSave);
divSave.appendChild(textSave);
imgSave.src = ""; //por o caminho do icon 
textSave.innerText = "Salvar";
divSave.addEventListener("click", () => { });

divComment.appendChild(imgComemnt);
divComment.appendChild(textComment);
imgComemnt.src = ""; //por o caminho do icon 
textComment.innerText = "Comentários";
divComment.addEventListener("click", () => { });

divLike.appendChild(imgLike);
divLike.appendChild(textLike);
imgLike.src = ""; //por o caminho do icon 
textLike.innerText = "Curtir";
divLike.addEventListener("click", () => { });

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


function generateRecipeCards(recipesData, quantity, feed) {
    const feed = document.querySelector("main");
    
    for (let i = recipesData.length - 1; i >= recipesData.length - quantity && i >= 0; i--) {
        const recipe = recipesData[i];
        username.innerText = recipe.name;
        recipeTitle.innerText = recipe.title;
        imgUser.src = "";//ainda não vi como fazer
        imgRecipe.src = "";//ainda não vi como

        divCard.addEventListener("click", ()=>{
            recipesDetails(recipe.recipe_id, recipe.name, recipe.title);
        });

        feed.appendChild(divCard);
    }
}

export { generateRecipeCards, recipesData };
