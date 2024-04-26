import { generateRecipeCards } from "./recipesCard.js";
import { getCurrentTab } from "./tabIdentifier.js";

async function search(feed, header) {
    const divSearch = document.createElement("div");
    const divSearchContent = document.createElement("div");
    const divResult = document.createElement("div");
    const divRecipe = document.createElement("div");
    const divCategory = document.createElement("div");
    const inputRecipe = document.createElement("input");
    const inputCategory = document.createElement("input");
    const btnAddCategory = document.createElement("button");
    const categoriesSelected = document.createElement("p");
    const btnSearch = document.createElement("button");

    const divinputCategory = document.createElement("div");
    const headerAll = document.getElementById("all");
    const headerFollowing = document.getElementById("following");
    const headerSeacherUser = document.getElementById("search-user");
    const headerSearchFavorite = document.getElementById("search-header");

    const currentTab = getCurrentTab();
    if (currentTab === "search") {
        headerAll.style.display = "none";
        headerFollowing.style.display = "none";
        headerSeacherUser.style.display = "none";
        headerSearchFavorite.style.display = "block";

        headerSearchFavorite.innerText = "Buscar receitas"
        headerSearchFavorite.classList.add("roboto","searche-title")
    }

    divSearch.appendChild(divSearchContent);
    divSearch.appendChild(divResult);

    divSearchContent.classList.add("search-menu");

    divRecipe.appendChild(divCategory);

    divSearchContent.appendChild(divRecipe);
    divSearchContent.appendChild(btnSearch);

    btnSearch.classList.add("post-btn1");
    btnSearch.id = "search-btn";

    divRecipe.appendChild(inputRecipe);
    divRecipe.classList.add("search-recipe");
    inputRecipe.placeholder = "Nome da receita...";
    inputRecipe.classList.add("search-input");

    divCategory.classList.add("search-category")
    divinputCategory.classList.add("post-component-input");
    inputCategory.classList.add("post-input-add");
    btnAddCategory.classList.add("post-btn-add");
    categoriesSelected.classList.add("search-categories-selected");

    divinputCategory.appendChild(inputCategory);
    divinputCategory.appendChild(btnAddCategory);

    divCategory.appendChild(divinputCategory);
    divCategory.appendChild(categoriesSelected);

    inputCategory.placeholder = "Nome da categoria...";
    btnAddCategory.textContent = "+";
    const categories = [];

    btnAddCategory.addEventListener("click", () => {
        const category = inputCategory.value.trim();
        if (category !== "") {
            categories.push(category);
            categoriesSelected.innerText = categories.join(",  ");
            inputCategory.value = "";
        }
    });

    btnSearch.textContent = "Buscar";
    btnSearch.addEventListener("click", async () => {
        let recipeName = inputRecipe.value;
        let recipeCategories = categories.join(",");

        if (!recipeName) {
            recipeName = "";
        }
        if (!recipeCategories) {
            recipeCategories = "";
        }


        const recipes = await getSearche(recipeName, recipeCategories);

        const quantity = recipes.data.length;

        inputCategory.value = "";
        inputRecipe.value = "";
        categories.value = "";

        generateRecipeCards(recipes, quantity, divResult);

    });

    feed.appendChild(divSearch);
}

async function getSearche(recipeName, categories) {
    try {
        console.log("try");

        const response = await fetch(`/api/recipe/search?recipe_name=${recipeName}&category=${categories}`);
        console.log("response:", response);

        const data = await response.json();
        if (!response.ok) {
            throw new Error('Erro ao tentar buscar receitas');
        }
        console.log("data:", data);
        return data;
    } catch (error) {
        console.error('Erro ao tentar recuperar dados da receita/categorias buscada:', error.message);
    }
}

export { search }; 