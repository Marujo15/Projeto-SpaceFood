function buttonLike(recipe, divButtons) {
    const divLike = document.createElement("div");
    const imgLike = document.createElement("img");
    const textLike = document.createElement("p");
    divButtons.appendChild(divLike);
    divLike.id = "like";

    divLike.appendChild(imgLike);
    divLike.appendChild(textLike);
    imgLike.src = "../static/svg/like.svg";
    imgLike.src = "../static/svg/like.svg";
    imgLike.style.width = "20px";
    textLike.innerText = "Curtir";
    divLike.addEventListener("click", () => {
        console.log("Curtir receita ", recipe.recipe_name);
    
    });

}

export { buttonLike };