async function recipesDetails(recipe_id, recipe_name, name_user) {
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
    });

    try {
        console.log("try");

        const response = await fetch(`/api/recipe/${recipe_id}`);
        console.log("response", response);

        const data = await response.json();
        console.log("data", data);

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
        const divSave = document.createElement("div");
        const imgSave = document.createElement("img");
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
        const tags = document.createElement("p");
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
        recipeTitle.innerText = recipe_name;

        divInfo.append(divUser);
        divInfo.append(divTags);
        divTags.id = "tags";

        divUser.appendChild(imgUser);
        divUser.appendChild(username);
        imgUser.id = "user-image"; //ainda não vi como fazer
        username.id = "username";
        username.innerText = name_user;

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
        imgSave.src = "../static/svg/bookmark.svg";
        imgSave.style.width = "20px";
        textSave.innerText = "Salvar";
        divSave.addEventListener("click", () => { });

        divComment.appendChild(imgComemnt);
        divComment.appendChild(textComment);
        imgComemnt.src = "../static/svg/comment.svg";
        imgComemnt.style.width = "20px";
        textComment.innerText = "Comentários";
        divComment.addEventListener("click", () => { });

        divLike.appendChild(imgLike);
        divLike.appendChild(textLike);
        imgLike.src = "../static/svg/like.svg";
        imgLike.style.width = "20px";
        textLike.innerText = "Curtir";
        divLike.addEventListener("click", () => { });

        recipeTitle.innerText = recipe_name;

        const recipe = data.data;
        console.log("divCard: ", divCard);
        console.log("recipe: ", recipe);


        recipe.ingredient_names.forEach(ingredient => {
            const element = document.createElement("li");
            element.innerText = ingredient;
            listIngredient.appendChild(element);
        });
        console.log("for 1 ");

        recipe.preparation_steps.forEach(step => {
            const element = document.createElement("li");
            element.innerText = step;
            listPreparationMathod.appendChild(element);
        });

        // recipe.category_names.forEach(category => {
        //     tags.innerText += " " + category;
        //     divTags.appendChild(tags);
        // });

        imgRecipe.src = "";//ainda não vi como fazer

        modalContent.style.display = "block";
        modalContent.appendChild(divCard);
        console.log("modalContent: ", modalContent);

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
