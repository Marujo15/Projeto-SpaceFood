async function buttonLike(recipesData, divButtons, recipe_id) {
    const divLike = document.createElement("div");
    const imgLike = document.createElement("img");
    const textLike = document.createElement("p");
    divButtons.appendChild(divLike);
    divLike.id = "like";

    divLike.appendChild(imgLike);
    divLike.appendChild(textLike);

    const likeData = await getLikeData(recipe_id);

    if (likeData === false) {
        imgLike.src = "../static/svg/like.svg";
        textLike.innerText = "Curtir";
    } else {
        imgLike.src = "../static/svg/liked.svg";
        textLike.innerText = "Curtido";
    }

    imgLike.style.width = "20px";

    divLike.addEventListener("click", async () => {

        const like = await addLike(recipe_id, recipesData);
        if (like !== false) {
            console.log("like?",like);
            imgLike.src = "../static/svg/liked.svg";
            textLike.innerText = "Curtido";
        } else {
            await deleteLike(recipe_id, recipesData);
            imgLike.src = "../static/svg/like.svg";
            textLike.innerText = "Curtir";
        }
    });

    async function getLikeData(recipe_id) {
        try {
            const response = await fetch(`/api/like/${recipe_id}`);
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

    async function addLike(recipe_id, recipesData) {
        console.log("likeData:",likeData);
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
            return true ;
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
}
export { buttonLike }