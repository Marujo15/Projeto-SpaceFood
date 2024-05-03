async function buttonLike(recipesData, divButtons, recipe_id) {
    const divLike = document.createElement("div");
    const imgLike = document.createElement("img");
    const textLike = document.createElement("p");
    divButtons.appendChild(divLike);
    divLike.id = "like";
    divLike.appendChild(imgLike);
    divLike.appendChild(textLike);
    imgLike.style.width = "20px";

    const icon = await iconBtnLike(recipe_id);
    imgLike.src = icon.imgLike;
    textLike.innerText = icon.textLike;

    divLike.addEventListener("click", async () => {
        const likeData = JSON.parse(localStorage.getItem('likeData'));
        const isLiked = likeData.data.some(item => item.recipe_id === recipe_id);

        if (isLiked) {
            deleteLike(recipe_id, recipesData);
            imgLike.src = "../static/svg/like.svg";
            textLike.innerText = "Curtir";

            likeData.data = likeData.data.filter(item => item.recipe_id !== recipe_id);
            localStorage.setItem('likeData', JSON.stringify(likeData));

        } else {
            addLike(recipe_id, recipesData);

            imgLike.src = "../static/svg/liked.svg";
            textLike.innerText = "Curtido";

            const newLike = { "recipe_id": recipe_id, "user_id": "", };
            likeData.data.push(newLike);
            localStorage.setItem('likeData', JSON.stringify(likeData));
        }
    });

    document.addEventListener('modalFechado', async () => {
        const icon = await iconBtnLike(recipe_id);
        imgLike.src = icon.imgLike;
        textLike.innerText = icon.textLike;
    });
}

async function iconBtnLike(recipe_id) {
    const likeData = JSON.parse(localStorage.getItem('likeData'));

    const data = {
        imgLike: "",
        textLike: "",
    }

    if (likeData && likeData.data) {
        const isLiked = likeData.data.some(like => like.recipe_id === recipe_id);
        if (isLiked) {
            data.imgLike = "../static/svg/liked.svg";
            data.textLike = "Curtido";
        } else {
            data.imgLike = "../static/svg/like.svg";
            data.textLike = "Curtir";
        }
    } else {
        data.imgLike = "../static/svg/like.svg";
        data.textLike = "Curtir";
    }
    return data;
}

async function addLike(recipe_id, recipesData) {
    try {
        const response = await fetch(`/api/like/${recipe_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipesData)
        });
        if (!response.ok) {
            const error = await response.json();
            console.log(error.error);
            return false;
        }
        return true;
    } catch (error) {
        console.error('Erro ao tentar verificar a existencia da receita em likes:', error.message);
    }
}

async function deleteLike(recipe_id, likeData) {
    try {
        const response = await fetch(`/api/like/${recipe_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(likeData)
        });
        if (!response.ok) {
            const error = await response.json();
            console.log(error.error);
        }

    } catch (error) {
        console.error('Erro ao recuperar dados da receita:', error.message);
    }
}

async function getLike() {
    try {
        const response = await fetch(`/api/like/0`);
        const data = await response.json();

        if (response.status === 404) {
            return false;
        }
        if (!response.ok) {
            throw new Error("Não foi possivel recuperar o like da receita");
        }
        return data;
    } catch (error) {
        console.error(error.message);
        return false;
    }
}


export { buttonLike, getLike }