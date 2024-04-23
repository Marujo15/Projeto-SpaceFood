import { getCurrentTab } from "./tabIdentifier.js";

function toggleCommentButton(divComment, add, eventHandler) {
    if (add) {
        divComment.addEventListener("click", eventHandler);
    } else {
        divComment.removeEventListener("click", eventHandler);
    }
}

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
    toggleCommentButton(divComment, true, () => eventButton(recipe, divCard, recipe_id, divComment));

    divButtons.appendChild(divComment);
}

function eventButton(recipe, divCard, recipe_id, divComment) {
    generateComments(recipe, divCard, recipe_id, divComment);
    toggleCommentButton(divComment, false, () => eventButton(recipe, divCard, recipe_id, divComment));
}

function generateComments(recipe, card, recipe_id, divComment) {

    const divComments = document.createElement("div");
    const divWriteComent = document.createElement("div");
    const inputComment = document.createElement("input");
    const btnComment = document.createElement("button");
    const divPublishedComments = document.createElement("div");
    const btnClose = document.createElement("button");

    divComments.appendChild(btnClose);
    divComments.appendChild(divPublishedComments);
    divComments.appendChild(divWriteComent);
    divComments.classList.add("comments");
    btnClose.textContent = "X";
    btnClose.classList.add("close-comment");
    btnClose.addEventListener("click", () => {
        divComments.remove();
        toggleCommentButton(divComment, true, () => eventButton(recipe, divCard, recipe_id, divComment));
    });

    divWriteComent.classList.add("write-comment");
    divPublishedComments.classList.add("published-comments")
    divWriteComent.appendChild(inputComment);
    divWriteComent.appendChild(btnComment);

    if (getCurrentTab() !== "details") {
        btnComment.classList.add("write-comment-btn-feed");
    }
    else {
        btnComment.classList.add("write-comment-btn-details");
    }

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
            comment.classList.add("comment");
            imagUserComment.classList.add("comment-user-image");

            const imagUser = document.createElement("img");
            imagUser.src = ""; //data.user_image
            imagUserComment.appendChild(imagUser);

            divinfo.appendChild(divUser);
            divinfo.appendChild(divUserComment);

            const username = document.createElement("p");
            username.innerText = data.name_user;
            username.classList.add("comment-username");
            divUser.appendChild(username);

            const comentary = document.createElement("p");
            comentary.innerText = data.commentary_text;
            divUserComment.appendChild(comentary);

            if (getCurrentTab() !== "details") {
                divComments.classList.add("comments-feed");
                comentary.classList.add("comment-txt");
                btnClose.classList.add("close-comment-feed");
                inputComment.classList.add("write-input-feed");


            } else {
                comentary.classList.add("comment-txt-details");
                btnClose.classList.add("close-comment-details");
                inputComment.classList.add("write-input-details");

            }

            comment.appendChild(imagUserComment);

            comment.appendChild(divinfo);
            divComment.appendChild(comment);
        }

    }

    card.appendChild(divComments);
}

export { buttonComment };