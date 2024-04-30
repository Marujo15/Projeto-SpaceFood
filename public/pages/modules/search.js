import { generateRecipeCards } from "./recipesCard.js";
import { getCurrentTab } from "./tabIdentifier.js";

async function search(feed) {
    const divSearch = document.createElement("div");
    const divSearchContent = document.createElement("div");
    const divResult = document.createElement("div");
    const divRecipe = document.createElement("div");
    const divCategory = document.createElement("div");
    const inputRecipe = document.createElement("input");
    const inputCategory = document.createElement("input");
    const btnAddCategory = document.createElement("button");
    const categoriesSelected = document.createElement("div");
    const btnSearch = document.createElement("button");
    const searchResults = document.createElement("p");

    const divinputCategory = document.createElement("div");
    
    const header = document.getElementById("header-btn");
    const headerAll = document.getElementById("all");
    const headerFollowing = document.getElementById("following");
    const headerSearchFavorite = document.getElementById("search-header");

    const currentTab = getCurrentTab();
    if (currentTab === "search") {
        header.style.display = "flex";
        headerAll.style.display = "none";
        headerFollowing.style.display = "none";
        headerSearchFavorite.style.display = "block";

        header.style.borderBottom = "0px";
        headerSearchFavorite.innerText = "Buscar receitas"
        headerSearchFavorite.classList.add("roboto", "searche-title");
    }

    divSearch.appendChild(divSearchContent);
    divSearch.appendChild(searchResults);
    divSearch.appendChild(divResult);

    divSearchContent.classList.add("search-menu");
    searchResults.classList.add("search-result");

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
        const categoryValue = inputCategory.value.trim();

        if (categoryValue !== "") {
            categories.push(categoryValue);
            categoriesSelected.style.display = "flex";

            const divCategory = document.createElement("div");
            const category = document.createElement("p");
            const deleteCategory = document.createElement('div');
            category.innerText = categoryValue;
            deleteCategory.innerText = "X";

            divCategory.classList.add("post-div-category");
            category.classList.add("post-content-category");
            deleteCategory.classList.add("post-delete");

            deleteCategory.addEventListener("click", () => {
                const index = categories.indexOf(categoryValue);

                if (index !== -1) {
                    categories.splice(index, 1);
                    deleteCategory.parentNode.remove();
                }
            });

            divCategory.appendChild(category);
            divCategory.appendChild(deleteCategory);

            categoriesSelected.appendChild(divCategory);
            inputCategory.value = "";
        }
    });

    btnSearch.textContent = "Buscar";
    btnSearch.addEventListener("click", async () => {
        categoriesSelected.innerText = "";
        categoriesSelected.value = "";

        let recipeName = inputRecipe.value;
        let recipeCategories = categories.join(",");

        if (recipeName === undefined) {
            recipeName = "";
        }
        if (recipeCategories === undefined) {
            recipeCategories = "";
        }

        const recipes = await getSearche(recipeName, recipeCategories);
        let quantity;

        if (recipes) {
            quantity = recipes.data.length;
        } else {
            quantity = 0;
        }
        console.log("qaunt", quantity);

        if (quantity === 1) {
            searchResults.innerText = `${quantity} resultado encontrado.`
        } else if (quantity === 0) {
            searchResults.innerText = `Nenhum resultado encontrado.`
        }
        else {
            searchResults.innerText = `${quantity} resultados encontrados.`
        }

        inputCategory.value = "";
        inputRecipe.value = "";
        categories.value = "";

        divResult.innerText = "";
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