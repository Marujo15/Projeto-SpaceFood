import { buttonComment } from "./btnComment.js";
import { buttonLike } from "./btnlike.js";
import { buttonSave } from "./btnfavorite.js";
import { getCurrentTab, setCurrentTab } from "./tabIdentifier.js";

async function recipesDetails(recipe_id, name_user, user_image, publication, recipeData) {
    const currentTab = getCurrentTab();
    setCurrentTab("details");

    const modal = document.getElementById('recipeModal');
    const modalContent = document.getElementById('recipe-content');
    const errorMessage = document.getElementById('error-message');
    const closeModal = document.getElementById('closeModal');
    closeModal.style.display = "flex";

    errorMessage.innerHTML = "";

    closeModal.addEventListener('click', () => {
        const modal = document.getElementById('recipeModal');
        modal.style.display = 'none';
        setCurrentTab(currentTab);

        if(modal.classList.contains("modal-details")){
            modal.classList.remove("modal-details");
            modal.classList.add("modal");
        }
    });

    if(modal.classList.contains("modal")){
        modal.classList.remove("modal");
        modal.classList.add("modal-details");
    }

    try {
        const response = await fetch(`/api/recipe/${recipe_id}`);

        const data = await response.json();
        console.log("data do try,",data);
        if (!response.ok) {
            throw new Error('Erro ao tentar recuperar os dados da receita');
        }

        const recipe = data.data;

        modalContent.innerHTML = '';
        modal.style.display = "flex";

        const divCard = document.createElement("div");
        const divImageUser = document.createElement("div");
        const imgUser = document.createElement("img");
        const username = document.createElement("p");
        const publicationDate = document.createElement("p");
        const divUsernamePublication = document.createElement("div");
        const recipeTitle = document.createElement("p");
        const imgRecipe = document.createElement("img");
        const titleIngredient = document.createElement("p");
        const listIngredient = document.createElement("ul");
        const titlePreparationMathod = document.createElement("p");
        const listPreparationMathod = document.createElement("ol");
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
        recipeTitle.textContent = recipe.recipe_name;

        divInfo.append(divUser);
        divInfo.append(divTags);
        divTags.id = "tags";

        divImageUser.appendChild(imgUser)
        divImageUser.classList.add("details-image-user");
        imgUser.classList.add("details-container-image-user");

        divUser.appendChild(divImageUser);
        divUser.appendChild(divUsernamePublication);
        divUser.classList.add("details-user")
        publicationDate.classList.add("card-published");
        username.classList.add("comment-username");

        publicationDate.innerText = publication;

        divUsernamePublication.appendChild(username);
        divUsernamePublication.appendChild(publicationDate)
        divUsernamePublication.classList.add("details-info-username-date");
        
        username.id = "username-details";
        username.innerText = name_user;

        if (user_image === null) {
            imgUser.src = "static/svg/newUser.svg"
        } else {
            imgUser.src = `./assets/${user_image}`;
        }

        divRecipe.classList.add("div-recipe-details");
        divRecipe.appendChild(divImageRecipe);
        divRecipe.appendChild(divIngredients);
        divRecipe.appendChild(divPreparationMathod);

        divImageRecipe.classList.add("div-recipe-details-itens");
        divIngredients.classList.add("div-recipe-details-itens");
        divPreparationMathod.classList.add("div-recipe-details-itens");

        divImageRecipe.appendChild(imgRecipe);
        imgRecipe.id = "recipe-image-details"; 
        imgRecipe.src = `../assets/${recipe.recipe_image}`;
        console.log("imgRecipe",imgRecipe); 
        console.log("recipe_image",recipe.recipe_image); 

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


        recipeTitle.innerText = recipe.recipe_name;

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
        //trocar para tags.innerText = recipe.category.join(",  ")?


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
