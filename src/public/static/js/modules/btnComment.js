function buttonComment(recipe, divButtons, divCard, recipe_id) {
    const divComment = document.createElement("div");
    const imgComemnt = document.createElement("img");
    const textComment = document.createElement("p");
    divComment.id = "comment";
    divComment.appendChild(imgComemnt);
    divComment.appendChild(textComment);
    imgComemnt.src = "../static/svg/comment.svg";

    imgComemnt.style.width = "20px";
    textComment.innerText = "Comentários";
    divComment.addEventListener("click", () => {
        generateComments(recipe, divCard, recipe_id);
    });
    divButtons.appendChild(divComment);
}

function generateComments(recipe, card, recipe_id) {

    const divComments = document.createElement("div");
    const divWriteComent = document.createElement("div");
    const inputComment = document.createElement("input");
    const btnComment = document.createElement("button");
    const divPublishedComments = document.createElement("div");
    const btnClose = document.createElement("button");

    divComments.appendChild(btnClose);
    divComments.appendChild(divPublishedComments);
    divComments.appendChild(divWriteComent);
    btnClose.textContent = "X";
    btnClose.addEventListener("click", () => {
        divComments.remove();
    });
    divWriteComent.style.border = "solid 4px red";
    divPublishedComments.style.height = "300px";
    divPublishedComments.style.border = "solid 4px gold";


    divWriteComent.appendChild(inputComment);
    divWriteComent.appendChild(btnComment);
    inputComment.placeholder = "Escreva um comnentário...";
    btnComment.textContent = "Publicar";
    btnComment.addEventListener("click", async () => {
        const data = {
            "recipe_id": recipe.recipe_id,
            "user_id": recipe.user_id,
            "commentary": inputComment.value,
        }
        try {
            const response = await fetch(`/api/commentary/${recipe_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                const error = await response.json();
                console.log(error.error);
            }
            getComments(recipe_id);
        } catch (error) {
            console.error('Erro ao tentar publicar comentário:', error.message);
            alert('Erro ao tentar publicar comentário', error.message);
        }

    });


    getComments(recipe_id);

    //função get para pegar os comentários
    async function getComments(recipe_id) {
        try {
            const response = await fetch(`/api/commentary/${recipe_id}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error('Erro ao tentar recuperar os comentários receita');
            }

            showComments(data, divPublishedComments);

        } catch (error) {
            console.error('Erro ao recuperar os comentários da receita:', error.message);
            // errorMessage.innerText = error.message;
        }
    }

    function showComments(commentary, divComment) {
        divPublishedComments.innerHTML = '';
        console.log("data showComments  :", commentary.data);

        for (let i = commentary.data.length - 1; i >= 0; i--) {
            const data = commentary.data[i];
            console.log("comentário  :", data.commentary_text);

            const comment = document.createElement("div");
            const imagUserComment = document.createElement("div");
            const divinfo = document.createElement("div");
            const divUser = document.createElement("div");
            const divUserComment = document.createElement("div");

            const imagUser = document.createElement("img");
            imagUser.src = ""; //data.user_image
            imagUserComment.appendChild(imagUser);

            divinfo.appendChild(divUser);
            divinfo.appendChild(divUserComment);

            const username = document.createElement("p");
            username.innerText = data.name_user;
            divUser.appendChild(username);

            const comentary = document.createElement("p");
            comentary.innerText = data.commentary_text;
            divUserComment.appendChild(comentary);

            comment.appendChild(imagUserComment);
            divinfo.style.border = "solid 3px magenta";
            divinfo.style.height = "40px";

            comment.appendChild(divinfo);
            divComment.appendChild(comment);
        }

    }


    divComments.style.border = "solid 4px blue";
    divComments.style.background = "white";
    card.appendChild(divComments);
}

export { buttonComment };