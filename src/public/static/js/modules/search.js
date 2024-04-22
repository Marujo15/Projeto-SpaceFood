import { generateRecipeCards } from "./recipesCard.js";

async function search(feed) {
    const divSearch = document.createElement("div");
    const divSearchContent = document.createElement("div");
    const divResult = document.createElement("div");
    const divRecipe = document.createElement("div");
    const divCategory = document.createElement("div");
    const divCategoryInput = document.createElement("div");
    const divCategorySelected = document.createElement("div");
    const chekcboxRecipe = document.createElement("input");
    const inputRecipe = document.createElement("input");
    const inputCategory = document.createElement("input");
    const chekcboxCategory = document.createElement("input");
    const btnAddCategory = document.createElement("button");
    const categoriesSelected = document.createElement("p");
    const btnSearch = document.createElement("button");

    divSearch.appendChild(divSearchContent);
    divSearch.appendChild(divResult);

    divSearchContent.appendChild(divRecipe);
    divSearchContent.appendChild(divCategory);
    divSearchContent.appendChild(btnSearch);

    divRecipe.appendChild(chekcboxRecipe);
    divRecipe.appendChild(inputRecipe);
    chekcboxRecipe.type = "checkbox";
    inputRecipe.placeholder = "Nome da receita...";

    divCategory.appendChild(divCategoryInput);
    divCategory.appendChild(divCategorySelected);

    divCategoryInput.appendChild(chekcboxCategory);
    divCategoryInput.appendChild(inputCategory);
    divCategoryInput.appendChild(btnAddCategory);
    divCategoryInput.appendChild(categoriesSelected);

    chekcboxCategory.type = "checkbox";
    inputCategory.placeholder = "Nome da categoria...";
    btnAddCategory.textContent = "+";
    const categories = [];

    btnAddCategory.addEventListener("click", () => {
        const category = inputCategory.value.trim();
        if (category !== "") {
            categories.push(category);
            categoriesSelected.innerText = categories.join(" ,");
        }
    });

    btnSearch.textContent = "Buscar";
    btnSearch.addEventListener("click", async () => {
        let recipeName = inputRecipe.value;
        let recipeCategories = categories.join(",");

        if (!chekcboxRecipe.checked) {
            recipeName = "";
        }
        if (!chekcboxCategory.checked) {
            recipeCategories = "";
        }
        console.log("recipeName:",recipeName);
        console.log("recipeCategories:",recipeCategories);

        const recipes = await getSearche(recipeName, recipeCategories);
        console.log("recipes:",recipes);

        const quantity = recipes.data.length;

        generateRecipeCards(recipes, quantity, divResult);

    });

    feed.appendChild(divSearch);
}

async function getSearche(recipeName, categories) {
    try {
        console.log("try");

        const response = await fetch(`/api/recipe/search?recipe_name=${recipeName}&category=${categories}`);
                console.log("response:",response);

        const data = await response.json();
        if (!response.ok) {
            throw new Error('Erro ao tentar buscar receitas');
        }
        console.log("data:",data);
        return data;
    } catch (error) {
        console.error('Erro ao tentar recuperar dados da receita/categorias buscada:', error.message);
    }
}

export { search }; 