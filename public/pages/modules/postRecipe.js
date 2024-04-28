import { home } from "../home.js";

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
    const listStep = document.createElement("ol");

    errorMessage.classList.add("modal-error");
    errorMessage.innerText = '';
    if (modal.classList.contains("modal")) {
        modal.classList.remove("modal");
        modal.classList.add("modal-post");
    }

    divPost.classList.add("post-recipe");
    divDetails.classList.add("post-recipe-name-category");
    divContent.classList.add("post-content");
    divImage.classList.add("post-image");
    divRecipe.classList.add("post-recipe-content");
    divCategory.classList.add("post-component-input");
    divAddIngredient.classList.add("post-component-input");
    divElement.classList.add("post-element");

    closeModal.style.display = "none";

    divPost.id = "div-post";

    divPost.appendChild(divTitle);
    divPost.appendChild(divDetails);
    divPost.appendChild(divContent);

    divTitle.appendChild(textTitle);
    textTitle.innerText = "Postar Receita";
    textTitle.id = "post-title";

    divDetails.appendChild(div);
    divDetails.appendChild(divTag);
    divTag.classList.add("post-tag");

    div.appendChild(inputTitleRcipe);
    div.appendChild(divCategory);
    inputTitleRcipe.placeholder = "Nome da receita...";
    inputTitleRcipe.classList.add("post-input");
    div.classList.add("post-div-input-category");

    divCategory.appendChild(inputCategory);
    divCategory.appendChild(buttonCategory);
    inputCategory.placeholder = "Categoria da receita...";
    inputCategory.classList.add("post-input-add");
    buttonCategory.innerText = "+";
    buttonCategory.classList.add("post-btn-add");

    divContent.appendChild(divImage);
    divContent.appendChild(divRecipe);
    //começa aqui
    const formImage = document.createElement('form');
    formImage.classList.add("post-btn-contnt");

    const imageName = document.createElement('div');
    imageName.classList.add('input-group');

    const nameInput = document.createElement('input');
    nameInput.setAttribute('name', 'name');
    nameInput.setAttribute('id', 'name');
    nameInput.setAttribute('placeholder', 'Nome da imagem');
    nameInput.classList.add("post-input");

    imageName.appendChild(nameInput);

    const imageFile = document.createElement('div');
    imageFile.classList.add('post-form-image');

    const imageRecipeSelected = document.createElement('img');
    imageFile.appendChild(imageRecipeSelected);
    imageRecipeSelected.id = "preview-image";

    const fileInput = document.createElement('input');
    fileInput.setAttribute('id', 'file');
    fileInput.setAttribute('type', 'file');
    fileInput.style.display = "none";

    const btnFileInput = document.createElement('button');
    btnFileInput.textContent = "Escolher arquivo";
    btnFileInput.classList.add("post-btn2")
    btnFileInput.appendChild(fileInput);

    const uploadImage = document.createElement('button');
    uploadImage.classList.add('post-btn2');
    uploadImage.textContent = 'Fazer Upload';

    formImage.appendChild(imageName);
    formImage.appendChild(imageFile);
    formImage.appendChild(btnFileInput);
    formImage.appendChild(uploadImage);

    divImage.appendChild(formImage);

    let selectedFile = null;

    btnFileInput.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (event) => {
        selectedFile = event.target.files[0];
        const tgt = event.target || window.event.srcElement;
        const files = tgt.files;
        const fr = new FileReader();
        fr.onload = function () {
            imageRecipeSelected.src = fr.result;
            imageRecipeSelected.style.height = "100%";
        }
        fr.readAsDataURL(files[0]);
    });

    formImage.addEventListener('submit', async (event) => {
        event.preventDefault();
    });

    divRecipe.appendChild(divButtomIngredientMethodo);
    divRecipe.appendChild(divElement);
    divRecipe.appendChild(divButton);

    divButtomIngredientMethodo.classList.add("post-btn-contnt");
    divButtomIngredientMethodo.appendChild(btnIngredient);
    divButtomIngredientMethodo.appendChild(btnStep);
    btnIngredient.innerText = "Ingredientes";
    btnStep.innerText = "Modo de Preparo";
    btnIngredient.classList.add("post-btn2");
    btnStep.classList.add("post-btn2");

    divElement.appendChild(divElementIngredient);
    divElement.appendChild(divElementStep);
    divElement.id = "element";

    const divInsertIngredient = document.createElement("div")
    divInsertIngredient.appendChild(divAddIngredient);
    divElementIngredient.appendChild(divInsertIngredient);
    divElementIngredient.appendChild(listIngredient);
    divElementIngredient.classList.add("post-element");
    listIngredient.id = "list-ingredient";
    divInsertIngredient.classList.add("post-insert-ingredients-steps");

    divAddIngredient.appendChild(inputAddIngredient);
    divAddIngredient.appendChild(buttonAddIngredient);
    inputAddIngredient.placeholder = "Escreva o ingrediente";
    inputAddIngredient.classList.add("post-input-add");
    buttonAddIngredient.innerText = "+";
    buttonAddIngredient.classList.add("post-btn-add");

    const divInserStep = document.createElement("div")
    divInserStep.appendChild(divAddStep);
    divElementStep.appendChild(divInserStep);
    divElementStep.appendChild(listStep);
    divAddStep.classList.add("post-component-input");
    divElementStep.style.display = "none";
    divElementStep.classList.add("post-element");
    listStep.id = "list-step";
    divInserStep.classList.add("post-insert-ingredients-steps");


    divAddStep.appendChild(inputAddStep);
    divAddStep.appendChild(buttonAddStep);
    inputAddStep.placeholder = "Escreva o metodo de preparo...";
    inputAddStep.classList.add("post-input-add");
    buttonAddStep.innerText = "+";
    buttonAddStep.classList.add("post-btn-add");

    divButton.appendChild(buttonExit);
    divButton.appendChild(buttonAddRecipe);
    buttonExit.innerText = "Voltar";
    buttonExit.classList.add("post-btn1");
    buttonAddRecipe.innerText = "Postar";
    buttonAddRecipe.classList.add("post-btn1");
    divButton.classList.add("post-btn-contnt");

    modalContent.innerHTML = "";
    modalContent.appendChild(divPost);
    modal.appendChild(modalContent);

    modal.style.display = "block";

    btnIngredient.style.background = "#03071E";
    btnStep.style.background = "#03071ee7";
    btnIngredient.addEventListener("click", () => {
        divElementStep.style.display = "none";
        divElementIngredient.style.display = "flex";
        btnIngredient.style.background = "#03071E";
        btnStep.style.background = "#03071ee7";
    });

    btnStep.addEventListener("click", () => {
        divElementStep.style.display = "flex";
        divElementIngredient.style.display = "none";
        btnStep.style.background = "#03071E";
        btnIngredient.style.background = "#03071ee7";

    });

    const categories = [];
    buttonCategory.addEventListener("click", () => {
        const categoryValue = inputCategory.value;

        if (categoryValue.trim() !== "") {
            categories.push(categoryValue);

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
            divTag.appendChild(divCategory);

            inputCategory.value = "";
        }
    });

    const ingredients = [];
    buttonAddIngredient.addEventListener("click", () => {
        const inputValue = inputAddIngredient.value;

        if (inputValue.trim() !== "") {
            ingredients.push(inputValue);

            const list = document.createElement("li");
            const container = document.createElement("div");
            const ingredient = document.createElement("p");
            const deleteIngredient = document.createElement('div');
            ingredient.innerText = inputValue;
            deleteIngredient.innerText = "X";

            deleteIngredient.classList.add("post-delete");
            container.classList.add("post-recipe-list");

            deleteIngredient.addEventListener("click", () => {
                const index = ingredients.indexOf(inputValue);

                if (index !== -1) {
                    ingredients.splice(index, 1);
                    deleteIngredient.parentNode.remove();

                }
            });

            container.appendChild(ingredient);
            container.appendChild(deleteIngredient);
            list.appendChild(container);
            listIngredient.appendChild(list);

            inputAddIngredient.value = "";
        }
    });

    const steps = [];
    buttonAddStep.addEventListener("click", () => {
        const inputValue = inputAddStep.value;

        if (inputValue.trim() !== "") {
            steps.push(inputValue);

            const list = document.createElement("li");
            const container = document.createElement("div");
            const step = document.createElement("p");
            const deleteStep = document.createElement('div');
            step.innerText = inputValue;
            deleteStep.innerText = "X";

            deleteStep.addEventListener("click", () => {
                const index = steps.indexOf(inputValue);

                if (index !== -1) {
                    steps.splice(index, 1);
                    list.remove();
                    // deleteStep.parentNode.remove();
                }

            });

            container.classList.add("post-recipe-list");
            deleteStep.classList.add("post-delete");


            container.appendChild(step);
            container.appendChild(deleteStep);
            list.appendChild(container);
            listStep.appendChild(list);

            inputAddStep.value = "";
        }
    });

    buttonAddRecipe.addEventListener("click", async () => {
        const recipeData = {
            "name": inputTitleRcipe.value,
            "ingredient": ingredients,
            "step": steps,
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
            console.log("post-categories ", categories);
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
        if (modal.classList.contains("modal-post")) {
            modal.classList.remove("modal-post");
            modal.classList.add("modal");
        }
    });

}

export { createRecipeCard };