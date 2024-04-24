import { buttonComment } from "./btnComment.js";
import { buttonLike } from "./btnlike.js";
import { buttonSave } from "./btnfavorite.js";
import { getCurrentTab, setCurrentTab } from "./tabIdentifier.js";

async function recipesDetails(recipe_id, recipe_name, name_user, recipe_image, recipeData) {
    const currentTab = getCurrentTab();
    setCurrentTab("details");

    const modal = document.getElementById('recipeModal');
    const modalContent = document.getElementById('recipe-content');
    const errorMessage = document.getElementById('error-message');
    const closeModal = document.getElementById('closeModal');
    closeModal.style.display = "flex";

    modal.style.border = "solid 2px pink";
    errorMessage.innerHTML = "";

    closeModal.addEventListener('click', () => {
        const modal = document.getElementById('recipeModal');
        modal.style.display = 'none';
        setCurrentTab(currentTab);
    });

    try {
        const response = await fetch(`/api/recipe/${recipe_id}`);

        const data = await response.json();

        if (!response.ok) {
            throw new Error('Erro ao tentar recuperar os dados da receita');
        }
        modalContent.innerHTML = '';
        modal.style.display = "flex";

        const divCard = document.createElement("div");
        const imgUser = document.createElement("img");
        const username = document.createElement("p");
        const recipeTitle = document.createElement("p");
        const imgRecipe = document.createElement("img");
        const titleIngredient = document.createElement("p");
        const listIngredient = document.createElement("ul");
        const titlePreparationMathod = document.createElement("p");
        const listPreparationMathod = document.createElement("ul");
        const divTitle = document.createElement("div");
        const divInfo = document.createElement("div");
        const divUser = document.createElement("div");
        const divTags = document.createElement("div");
        const tags = document.createElement("p");
        const divRecipe = document.createElement("div");
        const divImageRecipe = document.createElement("div");
        const divIngredients = document.createElement("div");
        const divPreparationMathod = document.createElement("div");
        const divButtons = document.createElement("div");

        divCard.append(divTitle);
        divCard.append(divInfo);
        divCard.append(divRecipe);
        divCard.append(divButtons);

        divTitle.append(recipeTitle); 
        recipeTitle.id = "recipe-title";
        recipeTitle.textContent = recipe_name;

        divInfo.append(divUser);
        divInfo.append(divTags);
        divTags.id = "tags";

        divUser.appendChild(imgUser);
        divUser.appendChild(username);
        imgUser.id = "user-image"; //ainda não vi como fazer
        username.id = "username";
        username.innerText = name_user;

        divRecipe.classList.add("div-recipe-details");
        divRecipe.appendChild(divImageRecipe);
        divRecipe.appendChild(divIngredients);
        divRecipe.appendChild(divPreparationMathod);

        divImageRecipe.appendChild(imgRecipe);
        imgRecipe.id = "recipe-image-details"; 
        imgRecipe.src = `../assets/${recipe_image}`;
        console.log("imgRecipe",imgRecipe); 
        console.log("recipe_image",recipe_image); 

        divIngredients.appendChild(titleIngredient);
        divIngredients.appendChild(listIngredient);
        titleIngredient.innerText = "Ingredientes";
        listIngredient.id = "ingredient";
        titleIngredient.classList.add("list-title");

        divPreparationMathod.appendChild(titlePreparationMathod);
        divPreparationMathod.appendChild(listPreparationMathod);
        titlePreparationMathod.innerText = "Modo de Preparo";
        listPreparationMathod.id = "preparet-method";
        titlePreparationMathod.classList.add("list-title");


        recipeTitle.innerText = recipe_name;

        const recipe = data.data;
        console.log("recipe details",recipe);
        console.log("recipeData details",recipeData);
        divButtons.classList.add("post-div-buttons");
        buttonSave(recipe, divButtons, recipeData, recipe_id);
        buttonComment(recipe, divButtons, divCard, recipe_id);
        buttonLike(recipeData, divButtons, recipe_id);
        
        recipe.ingredients.forEach(ingredient => {
            const element = document.createElement("li");
            element.innerText = ingredient;
            listIngredient.appendChild(element);
        });

        recipe.preparation_method.forEach(step => {
            const element = document.createElement("li");
            element.innerText = step;
            listPreparationMathod.appendChild(element);
        });

        // recipe.category.forEach(category => {
        //     tags.innerText += " " + category;
        //     divTags.appendChild(tags);
        // });

        imgRecipe.src = "";//ainda não vi como fazer

        modalContent.style.display = "block";
        modalContent.appendChild(divCard);

        modal.appendChild(closeModal);
        modal.appendChild(modalContent);

        return divCard;

    } catch (error) {
        console.error('Erro ao recuperar dados da receita:', error.message);

        errorMessage.style.display = "flex";
        errorMessage.innerText = "Erro ao carregar os detalhes da receita. Por favor, tente novamente mais tarde"

        return error;
    }
}

export { recipesDetails };
