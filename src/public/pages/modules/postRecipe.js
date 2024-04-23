import { home } from "../homeScript.js";
import { buttonComment } from "./btnComment.js";

function createRecipeCard() {
    const feed = document.getElementById("feed");
    const modal = document.getElementById('recipeModal');
    const modalContent = document.getElementById('recipe-content');
    const errorMessage = document.getElementById('error-message');
    const closeModal = document.getElementById('closeModal');

    const divPost = document.createElement("div");
    const divTitle = document.createElement("div");
    const divCategory = document.createElement("div");
    const divDetails = document.createElement("div");
    const divRecipe = document.createElement("div");
    const divElement = document.createElement("div");
    const div = document.createElement("div");
    const divImage = document.createElement("div");
    const divButton = document.createElement("div");
    const divContent = document.createElement("div");
    const divButtomIngredientMethodo = document.createElement("div");
    const textTitle = document.createElement("p");
    const inputTitleRcipe = document.createElement("input");
    const divTag = document.createElement("div");
    const inputCategory = document.createElement("input");
    const buttonCategory = document.createElement("button");
    const btnIngredient = document.createElement("button");
    const btnStep = document.createElement("button");
    const buttonAddRecipe = document.createElement("button");
    const buttonExit = document.createElement("button");
    const divElementIngredient = document.createElement("div");
    const divElementStep = document.createElement("div");
    const divAddIngredient = document.createElement("div");
    const divAddStep = document.createElement("div");
    const inputAddIngredient = document.createElement("input");
    const inputAddStep = document.createElement("input");
    const buttonAddIngredient = document.createElement("button");
    const buttonAddStep = document.createElement("button");
    const listIngredient = document.createElement("ul");
    const listStep = document.createElement("ul");

    divPost.style.border = "2px solid red"; // Definindo uma borda vermelha para divPost
    divTitle.style.border = "2px solid blue"; // Definindo uma borda azul para divTitle
    divCategory.style.border = "2px solid green"; // Definindo uma borda verde para divCategory
    divDetails.style.border = "2px solid yellow"; // Definindo uma borda amarela para divDetails
    divRecipe.style.border = "2px solid orange"; // Definindo uma borda laranja para divRecipe
    divElement.style.border = "2px solid purple"; // Definindo uma borda roxa para divElement
    div.style.border = "2px solid cyan"; // Definindo uma borda ciano para div
    divImage.style.border = "2px solid pink"; // Definindo uma borda rosa para divImage
    divButton.style.border = "2px solid brown"; // Definindo uma borda marrom para divButton
    divContent.style.border = "2px solid magenta"; // Definindo uma borda magenta para divContent
    divButtomIngredientMethodo.style.border = "2px solid lime"; // Definindo uma borda verde limão para divButtomIngredientMethodo

    divPost.classList.add("post-recipe");
    divDetails.classList.add("post-recipe-name-category");
    divContent.classList.add("post-content");
    divImage.classList.add("post-image");
    divRecipe.classList.add("post-recipe-content");
    divCategory.classList.add("post-add-category");
    divButtomIngredientMethodo.classList.add("post-btn-ingredient-methodo");
    divElement.classList.add("post-element");


    // buttonAddIngredient.classList.add("post-btn");
    // buttonAddRecipe.classList.add("post-btn");
    // buttonAddStep.classList.add("post-btn");
    // buttonCategory.classList.add("post-btn");
    // buttonExit.classList.add("post-btn");
    
    closeModal.style.display = "none";

    divPost.id = "div-post";

    divPost.appendChild(divTitle);
    divPost.appendChild(divDetails);
    divPost.appendChild(divContent);

    divTitle.appendChild(textTitle);
    textTitle.innerText = "Postar Receita";

    divDetails.appendChild(div);
    divDetails.appendChild(divTag);

    div.appendChild(inputTitleRcipe);
    div.appendChild(divCategory);
    inputTitleRcipe.placeholder = "Nome da receita...";
    inputTitleRcipe.id = "recipe-name";

    divCategory.appendChild(inputCategory);
    divCategory.appendChild(buttonCategory);
    inputCategory.placeholder = "Categoria...";
    inputCategory.id = "category";
    buttonCategory.innerText = "+";
    buttonCategory.id = "button-category";

    divContent.appendChild(divImage);
    divContent.appendChild(divRecipe);

    const formImage = document.createElement('form');
    formImage.id = 'form';

    const imageName = document.createElement('div');
    imageName.classList.add('input-group');

    const nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'name');
    nameLabel.textContent = 'Nome da imagem';

    const nameInput = document.createElement('input');
    nameInput.setAttribute('name', 'name');
    nameInput.setAttribute('id', 'name');
    nameInput.setAttribute('placeholder', 'Nome da imagem');

    imageName.appendChild(nameLabel);
    imageName.appendChild(nameInput);

    const imageFile = document.createElement('div');
    imageFile.classList.add('input-group');

    const fileLabel = document.createElement('label');
    fileLabel.textContent = 'Escolha a imagem';

    const fileInput = document.createElement('input');
    fileInput.setAttribute('id', 'file');
    fileInput.setAttribute('type', 'file');

    imageFile.appendChild(fileLabel);
    imageFile.appendChild(fileInput);

    const uploadImage = document.createElement('button');
    uploadImage.classList.add('submit-btn');
    uploadImage.textContent = 'Fazer Upload';

    formImage.appendChild(imageName);
    formImage.appendChild(imageFile);
    formImage.appendChild(uploadImage);

    divImage.appendChild(formImage);

    let selectedFile = null;

    fileInput.addEventListener('change', (event) => {
        selectedFile = event.target.files[0];
    });

    formImage.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            console.error('Nenhum arquivo selecionado');
            errorMessage.innerText = "Nenhum arquivo selecionado";
        }
    });

    divRecipe.appendChild(divButtomIngredientMethodo);
    divRecipe.appendChild(divElement);
    divRecipe.appendChild(divButton);

    divButtomIngredientMethodo.appendChild(btnIngredient);
    divButtomIngredientMethodo.appendChild(btnStep);
    btnIngredient.innerText = "Ingredientes";
    btnStep.innerText = "Modo de Preparo";
    btnIngredient.id = "button-ingredient";
    btnStep.id = "button-preparation-method";

    const  divinputIngredient = document.createElement("div");
    const  divinputSteps = document.createElement("div");
    divElement.appendChild(divElementIngredient);
    divElement.appendChild(divElementStep);

    divElement.id = "element";

    divElementIngredient.appendChild(divAddIngredient);
    divElementIngredient.appendChild(listIngredient);
    divElementIngredient.id = "div-ingredients";
    divElementIngredient.classList.add = "add-ingredients"
    listIngredient.id = "list-ingredient";

    divAddIngredient.appendChild(divinputIngredient);
    divAddIngredient.appendChild(divinputIngredient);
    divinputIngredient.appendChild(divElementIngredient);
    inputAddIngredient.placeholder = "Escreva o ingrediente";
    inputAddIngredient.id = "ingredient";
    buttonAddIngredient.innerText = "+";
    buttonAddIngredient.id = "button-add-ingredient";

    divElementStep.appendChild(divAddStep);
    divElementStep.appendChild(listStep);
    divElementStep.id = "div-step";
    divElementStep.classList.add = "add-steps";
    divElementStep.style.display = "none";
    listStep.id = "list-step";

    divAddStep.appendChild(inputAddStep);
    divAddStep.appendChild(buttonAddStep);
    inputAddStep.placeholder = "Escreva o metodo de preparo...";
    inputAddStep.id = "step";
    buttonAddStep.innerText = "+";
    buttonAddStep.id = "button-add-step";

    divButton.appendChild(buttonExit);
    divButton.appendChild(buttonAddRecipe);
    buttonExit.innerText = "Voltar";
    buttonExit.id = "button-exit";
    buttonAddRecipe.innerText = "Postar";
    buttonAddRecipe.id = "button-add";

    modalContent.innerHTML = "";
    modalContent.appendChild(divPost);
    modal.appendChild(modalContent);

    modal.style.display = "block";

    btnIngredient.addEventListener("click", () => {
        divElementStep.style.display = "none";
        divElementIngredient.style.display = "flex";
    });

    btnStep.addEventListener("click", () => {
        divElementStep.style.display = "flex";
        divElementIngredient.style.display = "none";
    });

    const categories = [];
    buttonCategory.addEventListener("click", () => {
        if (inputCategory.value.trim() !== "") {
            categories.push(inputCategory.value);
            const category = document.createElement("p");
            category.innerText = "";
            category.innerText = categories.join(", ");
            divTag.appendChild(category);
        }
    });

    const ingredient = [];
    buttonAddIngredient.addEventListener("click", () => {
        if (inputAddIngredient.value.trim() !== "") {
            ingredient.push(inputAddIngredient.value);
            const list = document.createElement("li");
            list.innerText = inputAddIngredient.value;
            listIngredient.appendChild(list);
        }
    });

    const step = [];
    buttonAddStep.addEventListener("click", () => {
        if (inputAddStep.value.trim() !== "") {
            step.push(inputAddStep.value);
            const list = document.createElement("li");
            list.innerText = inputAddStep.value;
            listStep.appendChild(list);
        }
    });

    buttonAddRecipe.addEventListener("click", async () => {
        const recipeData = {
            "name": inputTitleRcipe.value,
            "ingredient": ingredient,
            "step": step,
            "category": categories,
            "image": nameInput.value,
        };
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('data', JSON.stringify(recipeData));

        try {
            const response = await fetch('/api/recipe/create', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error);
            }

            const data = await response.json();
            home(feed, modal);

        } catch (error) {
            console.error('Erro ao cadastrar receita:', error.message);

            errorMessage.style.display = "flex";
            errorMessage.innerText = error.message;
            modal.appendChild(errorMessage);
            return error;
        }
    });

    buttonExit.addEventListener("click", () => {
        modal.style.display = "none";
        errorMessage.innerText = "";
    });

}

export { createRecipeCard };