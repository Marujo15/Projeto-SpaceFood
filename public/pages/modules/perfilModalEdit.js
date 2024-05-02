import { home } from "../home.js"
import event from "./event.js"
import { perfil } from "./perfil.js"
import { setCurrentTab } from "./tabIdentifier.js"

export async function perfilModal(feed, data, editOrFollow, modalContent, modal, aside, perfilDiv) {
    modalContent.innerHTML = ""

    /* div's */
    const perfilModalEditDiv = document.createElement('div')

    const perfilModalImgNameUsername = document.createElement('div')
    const perfilModalBio = document.createElement('div')
    const perfilModalButtonDiv = document.createElement('div')

    /* <div class="perfil-modal-img-name-username"> */
    const perfilModalContainerImgInputs = document.createElement('div')

    const perfilModalImg = document.createElement('div')
    const perfilModalNameUsername = document.createElement('div')

    const perfilModalInput = document.createElement('div')

    /* h1, span's and buttons's */
    const h1 = document.createElement('h1')

    const img = document.createElement('img')

    const spanPerfilModalMessage = document.createElement('span')

    const perfilModalBioInput = document.createElement('textarea')

    const nameInput = document.createElement('input')
    const usernameInput = document.createElement('input')
    const inputPerfilPhoto = document.createElement('input')
    const perfilModalPasswordInput = document.createElement('input')

    const changePhotoButton = document.createElement('button')
    const perfilModalButton = document.createElement('button')

    perfilModalEditDiv.classList.add('perfil-modal-edit-div')

    perfilModalEditDiv.appendChild(h1)
    h1.innerText = "Editar Perfil"

    perfilModalEditDiv.appendChild(perfilModalImgNameUsername)

    perfilModalImgNameUsername.classList.add('perfil-modal-img-name-username')
    perfilModalImgNameUsername.appendChild(perfilModalContainerImgInputs)

    perfilModalContainerImgInputs.classList.add('perfil-modal-container-img-inputs')
    perfilModalContainerImgInputs.appendChild(perfilModalImg)

    perfilModalImg.classList.add('perfil-modal-img')
    perfilModalImg.appendChild(img)

    img.alt = "perfil-photo"
    img.src = "/assets/" + data.data.user_image

    perfilModalContainerImgInputs.appendChild(perfilModalNameUsername)

    perfilModalNameUsername.classList.add('perfil-modal-name-username')
    perfilModalNameUsername.appendChild(nameInput)

    nameInput.type = "text"
    nameInput.placeholder = "Nome:"
    nameInput.value = data.data.user_name
    nameInput.id = 'perfil-modal-name-input'

    perfilModalNameUsername.appendChild(usernameInput)

    usernameInput.type = "text"
    usernameInput.placeholder = "Nome de usuário:"
    usernameInput.value = data.data.user_username
    usernameInput.id = 'perfil-modal-username-input'
    usernameInput,addEventListener('input', () => {
        usernameInput.value = usernameInput.value
            .toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]/g, "_");
        
    })
    usernameInput.addEventListener('blur', async () => {
        try {
            const response = await fetch(`/api/user/register/username/${document.getElementById('perfil-modal-username-input').value.trim()}`)

            const data1 = await response.json()

            console.log('response:', response)
            console.log('data1', data1)

            if (document.getElementById('perfil-modal-username-input').value.trim() === data.data.user_username) {
                spanPerfilModalMessage.innerText = 'Este é o seu nome de usuário 😊'
                spanPerfilModalMessage.style.color = '#6EDA53'
            }
            else if (!response.ok) {
                spanPerfilModalMessage.innerText = 'Nome de usuário ja cadastrado'
                spanPerfilModalMessage.style.color = '#B81E19'
            }
            else {
                spanPerfilModalMessage.innerText = 'Nome de usuário disponível ✅'
                spanPerfilModalMessage.style.color = '#6EDA53'
            }
        }
        catch (error) {
            console.log("Erro ao requisitar /api/user/register/username: ", error)
        }

    })

    perfilModalImgNameUsername.appendChild(perfilModalInput)

    perfilModalInput.classList.add('perfil-modal-input')
    perfilModalInput.appendChild(changePhotoButton)

    changePhotoButton.innerText = "Mudar foto"
    changePhotoButton.addEventListener('click', () => {
        inputPerfilPhoto.click()
    })

    perfilModalInput.appendChild(inputPerfilPhoto)

    inputPerfilPhoto.id = 'input-perfil-photo'
    inputPerfilPhoto.type = 'file'
    let selectedFile = null
    inputPerfilPhoto.addEventListener('change', (e) => {
        selectedFile = e.target.files[0]
        const photo = e.target.files;
        const fr = new FileReader();
        fr.onload = function () {
            img.src = fr.result;
        }
        fr.readAsDataURL(photo[0]);
    })

    perfilModalInput.appendChild(spanPerfilModalMessage)

    spanPerfilModalMessage.id = "span-perfil-modal-message"

    perfilModalEditDiv.appendChild(perfilModalBio)

    perfilModalBio.classList.add("perfil-modal-bio")
    perfilModalBio.appendChild(perfilModalBioInput)
    perfilModalBio.appendChild(perfilModalButtonDiv)

    perfilModalBioInput.id = "perfil-modal-bio-input"
    perfilModalBioInput.placeholder = "Bio:"
    perfilModalBioInput.cols = "30"
    perfilModalBioInput.rows = "10"
    perfilModalBioInput.innerText = data.data.user_biography

    perfilModalButtonDiv.classList.add('perfil-modal-button-div')
    perfilModalButtonDiv.appendChild(perfilModalPasswordInput)
    perfilModalButtonDiv.appendChild(perfilModalButton)

    perfilModalPasswordInput.id = "perfil-modal-password-input"
    perfilModalPasswordInput.type = 'password'
    perfilModalPasswordInput.placeholder = "Confirme com senha:"

    perfilModalButton.id = "perfil-modal-button"
    perfilModalButton.innerText = "Salvar"
    perfilModalButton.addEventListener('click', async (e) => {
        e.preventDefault()

        const message = spanPerfilModalMessage

        const newName = String(nameInput.value)
        const newUsername = String(usernameInput.value)
        const newBiography = String(perfilModalBioInput.value)
        const password = perfilModalPasswordInput.value

        const oldUsername = String(data.data.user_username)

        /* Primeiro ele verifica se a senha esta correta */
        try {
            const loginObj = {
                "username": String(oldUsername),
                "password": String(password).trim()
            }

            const response = await fetch(`/api/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginObj)
            })

            if (!response.ok) {
                message.style.color = '#B81E19'
                message.innerText = "Senha incorreta"
            }
            else {
                /* Aqui ele vai tentar jogar as mudanças no banco de dados */
                try {
                    const newDates = {
                        "name": String(newName),
                        "username": String(newUsername),
                        "biography": String(newBiography)
                    }

                    const formData = new FormData();
                    formData.append('file', selectedFile);
                    formData.append('data', JSON.stringify(newDates));

                    const bodyObj = selectedFile !== null ? formData : JSON.stringify(newDates)

                    const response = await fetch(`/api/user/${data.data.user_id}`, {
                        method: 'PUT',
                        body: bodyObj
                    });

                    if (!response.ok) {
                        message.style.color = '#B81E19'
                        message.innerText = "Erro, por favor verifique os campos"
                    }

                    else {
                        /* 
                            Aqui ele vai fazer um login de novo só q dessa 
                            vez com o nome certo isso por conta de que o 
                            token de sessão armazena um data, e eu quero 
                            poder atualizar o data que esta no token de 
                            sessão com as novas modificações  
                        */
                        try {
                            const loginObj2 = {
                                username: newUsername,
                                password: password
                            }

                            const response = await fetch(`/api/user/login`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(loginObj2)
                            })

                            if (!response.ok) {
                                console.error("Erro ao atualizar dados na pagina, favor sair e reentrar")
                            }

                            const customEvent = event('/home');
                            window.dispatchEvent(customEvent);
                        }
                        catch (error) {
                            console.error("terceiro trycatch:", error)
                        }
                    }

                    const { userName, userUsername } = aside

                    const { perfilIdUsername, perfilIdName, bio } = perfilDiv

                    userName.innerText = newName
                    perfilIdName.innerText = newName

                    userUsername.innerText = newUsername
                    perfilIdUsername.innerText = newUsername

                    bio.innerText = newBiography

                    modal.style.display = 'none'
                }
                catch (error) {
                    message.style.color = '#B81E19'
                    message.innerText = "Erro, por favor tente de novo"
                    console.error("Erro ao atualizar dados no banco de dados: ", error)
                }
            }
        }
        catch (error) {
            message.style.color = '#B81E19'
            message.innerText = "Erro ao verificar senha, por favor tente de novo."
        }
    })

    document.getElementById('closeModal').style.display = "flex"
    document.getElementById('closeModal').addEventListener('click', () => {
        modal.style.display = "none"
    })

    modalContent.appendChild(perfilModalEditDiv)
}
