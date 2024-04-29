import { home } from "../home.js"
import { perfilModal } from "./perfilModalEdit.js"
import { generateRecipeCards } from "./recipesCard.js"
import { setCurrentTab } from "./tabIdentifier.js"

export async function perfil(feed, data, editOrFollow, modal, modalContent, aside) {

    const perfilHeader = document.createElement('div')
    const perfilImgNameUsername = document.createElement('div')
    const perfilImg = document.createElement('div')
    const perfilNameUsername = document.createElement('div')
    const perfilClassName = document.createElement('div')
    const perfilClassUsername = document.createElement('div')
    const perfilBioFollowingFollowers = document.createElement('div')
    const perfilBio = document.createElement('div')
    const perfilFollowingFollowers = document.createElement('div')
    const perfilFollowing = document.createElement('div')
    const perfilFollowers = document.createElement('div')
    const perfilButtonDiv = document.createElement('div')
    const perfilButton = document.createElement('div')

    const perfilPhoto = document.createElement('img')

    const perfilIdName = document.createElement('span')
    const perfilIdUsername = document.createElement('span')
    const bio = document.createElement('span')
    const perfilFollowingSpan = document.createElement('span')
    const perfilIdFollowing = document.createElement('span')
    const perfilFollowerSpan = document.createElement('span')
    const perfilIdFollowers = document.createElement('span')

    const button = document.createElement('button')

    async function perfilGET(id) {
        try {
            const response = await fetch(`/api/user/${id}`)

            const data = await response.json()

            if (!response.ok) {
                throw console.error(data.error)
            }

            return data
        }

        catch (error) {
            console.error("Erro ao fazer requisição ao Banco de dados: ", error)
            feed.innerHTML = ""
            setCurrentTab("home");
            home(feed, modal);
        }
    }

    const recipesData = await perfilGET(data.id)

    perfilHeader.classList.add('perfil-header')
    perfilHeader.appendChild(perfilImgNameUsername)
    perfilHeader.appendChild(perfilBioFollowingFollowers)
    perfilHeader.appendChild(perfilButtonDiv)


    perfilImgNameUsername.classList.add('perfil-img-name-username')
    perfilImgNameUsername.appendChild(perfilImg)
    perfilImgNameUsername.appendChild(perfilNameUsername)

    perfilImg.classList.add('perfil-img')
    perfilImg.appendChild(perfilPhoto)

    perfilPhoto.src = recipesData.data.user_image
    perfilPhoto.alt = 'perfil-photo'

    perfilNameUsername.classList.add('perfil-name-username')
    perfilNameUsername.appendChild(perfilClassName)
    perfilNameUsername.appendChild(perfilClassUsername)

    perfilClassName.classList.add('perfil-class-name')
    perfilClassName.appendChild(perfilIdName)

    perfilIdName.innerText = recipesData.data.user_name
    perfilIdName.id = "user-name"

    perfilClassUsername.classList.add('perfil-class-username')
    perfilClassUsername.appendChild(perfilIdUsername)

    perfilIdUsername.innerText = '@' + recipesData.data.user_username
    perfilIdUsername.id = 'user-username'

    perfilBioFollowingFollowers.classList.add('perfil-bio-following-followers')
    perfilBioFollowingFollowers.appendChild(perfilBio)
    perfilBioFollowingFollowers.appendChild(perfilFollowingFollowers)

    perfilBio.classList.add('perfil-bio')
    perfilBio.appendChild(bio)

    bio.innerText = recipesData.data.user_biography

    perfilFollowingFollowers.classList.add('perfil-following-followers')
    perfilFollowingFollowers.appendChild(perfilFollowing)
    perfilFollowingFollowers.appendChild(perfilFollowers)

    perfilFollowing.classList.add('perfil-following')
    perfilFollowing.appendChild(perfilFollowingSpan)
    perfilFollowing.appendChild(perfilIdFollowing)

    perfilFollowingSpan.style.fontWeight = '600'
    perfilFollowingSpan.innerText = 'Following: '

    perfilIdFollowing.id = 'perfil-id-following'
    perfilIdFollowing.innerText = recipesData.data.following_count

    perfilFollowers.classList.add('perfil-followers')
    perfilFollowers.appendChild(perfilFollowerSpan)
    perfilFollowers.appendChild(perfilIdFollowers)

    perfilFollowerSpan.style.fontWeight = '600'
    perfilFollowerSpan.innerText = 'Followers: '

    perfilIdFollowers.id = 'perfil-id-followers'
    perfilIdFollowers.innerText = recipesData.data.followers_count

    perfilButtonDiv.classList.add('perfil-button-div')
    perfilButtonDiv.appendChild(perfilButton)

    perfilButton.classList.add('perfil-button')
    perfilButton.appendChild(button)

    if (editOrFollow === "follow") {
        button.classList.add('follow')
        button.innerText = "Seguir"
        button.addEventListener('click', () => {
            alert("follow")
        })
    }
    else if (editOrFollow === "edit") {
        button.classList.add('edit')
        button.innerText = "Editar"
        button.addEventListener('click', () => {
            modal.style.display = "block"
            perfilModal(feed, data, editOrFollow, modalContent, modal, aside, { perfilIdUsername, perfilIdName, bio })
        })
    }
    else {
        feed.innerHTML = ""
        setCurrentTab("home");
        home(feed, modal);
    }

    feed.appendChild(perfilHeader)



    generateRecipeCards(recipesData, parseInt(recipesData.data.length), feed)
}