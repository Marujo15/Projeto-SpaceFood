async function recipesDetails(recipe_id, name, title) {
    const modal = document.getElementById('recipeModal');
    const modalContent = document.getElementById('recipe-content');
    const errorMessage = document.getElementById('error-message');

    try {
        const response = await fetch(`/api/recipe/recipe_id/${recipe_id}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Erro ao tentar recuperar os dados da receita');
        }

        modal.innerHTML = '';
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
        const divSave = document.createElement("div");
        const imgSave = document.createElement("div");
        const textSave = document.createElement("p");
        const divComment = document.createElement("div");
        const imgComemnt = document.createElement("img");
        const textComment = document.createElement("p");
        const divLike = document.createElement("div");
        const imgLike = document.createElement("img");
        const textLike = document.createElement("p");
        const divTitle = document.createElement("div");
        const divInfo = document.createElement("div");
        const divUser = document.createElement("div");
        const divTags = document.createElement("div");
        const divRecipe = document.createElement("div");
        const divImageRecipe = document.createElement("div");
        const divIngredients = document.createElement("div");
        const divPreparationMathod = document.createElement("div");
        const divButtons = document.createElement("div");

        // Montar a estrutura dos elementos
        divCard.append(divTitle);
        divCard.append(divInfo);
        divCard.append(divRecipe);
        divCard.append(divButtons);

        divTitle.append(recipeTitle);
        recipeTitle.id = "recipe-title";
        recipeTitle.innerText = title;

        divInfo.append(divUser);
        divInfo.append(divTags);
        divInfo.id = "tags";

        divUser.appendChild(imgUser);
        divUser.appendChild(username);
        imgUser.id = "user-image"; //ainda não vi como fazer
        username.id = "username";
        username.innerText = name;

        divRecipe.appendChild(divImageRecipe);
        divRecipe.appendChild(divIngredients);
        divRecipe.appendChild(divPreparationMathod);

        divImageRecipe.appendChild(imgRecipe);
        imgRecipe.id = "recipe-image"; //ainda não tem 

        divIngredients.appendChild(titleIngredient);
        divIngredients.appendChild(listIngredient);
        titleIngredient.innerText = "Ingredientes";
        listIngredient.id = "ingredient";

        divPreparationMathod.appendChild(titlePreparationMathod);
        divPreparationMathod.appendChild(listPreparationMathod);
        titlePreparationMathod.innerText = "Modo de Preparo";
        listPreparationMathod.id = "preparet-method";

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

        recipeTitle.innerText = data.name;

        data.ingredient.forEach(ingredient => {
            const element = document.createElement("li");
            element.innerText = ingredient;
            listIngredient.appendChild(element);
        });

        data.step.forEach(step => {
            const element = document.createElement("li");
            element.innerText = step;
            listPreparationMathod.appendChild(element);
        });

        data.category.forEach(category => {
            const element = document.createElement("li");
            element.innerText = category;
            listIngredient.appendChild(element);
        });

        imgRecipe.src = "";//ainda não vi como fazer

        modalContent.appendChild(divCard);
        return divCard;

    } catch (error) {
        console.error('Erro ao recuperar dados da receita:', error.message);

        errorMessage.style.display = "flex";
        errorMessage.innerText = "Erro ao carregar os detalhes da receita. Por favor, tente novamente mais tarde"
        
        return error;
    }
}

export { recipesDetails };
