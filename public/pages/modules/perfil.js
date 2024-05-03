import { home } from "../home.js"
import { perfilModal } from "./perfilModalEdit.js"
import { generateRecipeCards, recipesDataPerfil } from "./recipesCard.js"
import { setCurrentTab } from "./tabIdentifier.js"

export async function perfil(feed, otherData, editOrFollow, modal, modalContent, aside) {

    console.log('data perfil:', otherData)

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

    const header = document.getElementById("header-btn");
    const headerAll = document.getElementById("all");
    const headerFollowing = document.getElementById("following");
    const headerSearchFavorite = document.getElementById("search-header");

    header.style.display = "flex";
    headerAll.style.display = "none";
    headerFollowing.style.display = "none";
    headerSearchFavorite.style.display = "block";

    header.style.borderBottom = "1px solid #0000004f";
    headerSearchFavorite.innerText = "Perfil";
    headerSearchFavorite.classList.add("roboto", "searche-title");

    const imgBanner = document.createElement("img")
    imgBanner.src = "../static/svg/banner.jpg"
    perfilHeader.style.backgroundImage = `url('${imgBanner.src}')`;
    perfilHeader.style.backgroundSize = "cover";
    perfilHeader.style.backgroundPosition = "center";

    perfilHeader.classList.add('perfil-header')
    perfilHeader.appendChild(perfilImgNameUsername)
    perfilHeader.appendChild(perfilBioFollowingFollowers)
    perfilHeader.appendChild(perfilButtonDiv)

    perfilImgNameUsername.classList.add('perfil-img-name-username')
    perfilImgNameUsername.appendChild(perfilImg)
    perfilImgNameUsername.appendChild(perfilNameUsername)

    perfilImg.classList.add('perfil-img')
    perfilImg.appendChild(perfilPhoto)

    perfilPhoto.src = "/assets/" + otherData.data.user_image
    perfilPhoto.alt = 'perfil-photo'

    perfilNameUsername.classList.add('perfil-name-username')
    perfilNameUsername.appendChild(perfilClassName)
    perfilNameUsername.appendChild(perfilClassUsername)

    perfilClassName.classList.add('perfil-class-name')
    perfilClassName.appendChild(perfilIdName)

    perfilIdName.innerText = otherData.data.user_name
    perfilIdName.id = "perfil-user-name"

    perfilClassUsername.classList.add('perfil-class-username')
    perfilClassUsername.appendChild(perfilIdUsername)

    perfilIdUsername.innerText = '@' + otherData.data.user_username
    perfilIdUsername.id = 'perfil-user-username'

    perfilBioFollowingFollowers.classList.add('perfil-bio-following-followers')
    perfilBioFollowingFollowers.appendChild(perfilBio)
    perfilBioFollowingFollowers.appendChild(perfilFollowingFollowers)

    perfilBio.classList.add('perfil-bio')
    perfilBio.appendChild(bio)
    bio.classList.add("bio");

    bio.innerText = otherData.data.user_biography

    perfilFollowingFollowers.classList.add('perfil-following-followers')
    perfilFollowingFollowers.appendChild(perfilFollowing)
    perfilFollowingFollowers.appendChild(perfilFollowers)

    perfilFollowing.classList.add('perfil-following')
    perfilFollowing.appendChild(perfilFollowingSpan)
    perfilFollowing.appendChild(perfilIdFollowing)

    perfilFollowingSpan.style.fontWeight = '600'
    perfilFollowingSpan.innerText = 'Seguindo: '

    perfilIdFollowing.id = 'perfil-id-following'
    perfilIdFollowing.innerText = otherData.data.following_count

    perfilFollowers.classList.add('perfil-followers')
    perfilFollowers.appendChild(perfilFollowerSpan)
    perfilFollowers.appendChild(perfilIdFollowers)

    perfilFollowerSpan.style.fontWeight = '600'
    perfilFollowerSpan.innerText = 'Seguidores: '

    perfilIdFollowers.id = 'perfil-id-followers'
    perfilIdFollowers.innerText = otherData.data.followers_count

    perfilButtonDiv.classList.add('perfil-button-div')
    perfilButtonDiv.appendChild(perfilButton)

    perfilButton.classList.add('perfil-button')
    perfilButton.appendChild(button)

    if (editOrFollow === "follow") {
        let alreadyFollow = false

        try {
            const response = await fetch(`/api/user/0`)
            if (!response.ok) {
                throw response.status
            }
            const myData = await response.json()
            console.log(`myData:`, myData);

            if (myData.data.user_id === otherData.data.user_id) {
                const newModal = document.getElementById('recipeModal')
                const newModalContent = document.getElementById('recipe-content')
                const userName = myData.data.user_name
                const userUsername = myData.data.user_username
                const userObj = { userName, userUsername }

                feed.innerHTML = ''
                newModal.style.display = "none";
                setCurrentTab('perfil')
                perfil(feed, myData, "edit", newModal, newModalContent, userObj)
                return
            }

            try {
                const fResponse = await fetch(`/api/follow/followers/${otherData.data.user_id}`)
                if (!fResponse.ok) {
                    throw `Falha ao verificar seguidores do outro usuário: ${fResponse.status}`
                }
                const fData = await fResponse.json()

                for (let i = 0; i < fData.data.length; i++) {
                    const perfil = fData.data[i];
                    if (perfil.user_id === myData.data.user_id) {
                        alreadyFollow = true;
                    }
                }
            }
            catch (error) {
                console.error(error);
            }

        } catch (error) {
            console.error(error);
            const newModal = document.getElementById('recipeModal')
            setCurrentTab("home");
            newModal.style.display = "none";
            home(feed, newModal);
        }

        if (alreadyFollow) {
            button.id = 'followingButton'
            button.innerText = "Seguindo"
            button.addEventListener('click', async () => {
                try {
                    const unfollowRes = await fetch(`/api/follow/${otherData.data.user_id}`, {
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                    if (!unfollowRes.ok) {
                        throw `Erro ao deixar de seguir`
                    }
                } catch (error) {
                    console.error(error);
                }

                const userID = otherData.data.user_id

                fetch(`/api/user/${userID}`)
                    .then(response => response.json())
                    .then(data => {
                        feed.innerHTML = ""
                        setCurrentTab('perfil')
                        perfil(feed, data, 'follow')
                    })
                    .catch(err => {
                        console.error(err);
                    })
            })
        }
        else {
            button.id = 'followButton'
            button.innerText = "Seguir"
            button.addEventListener('click', async () => {
                try {
                    const followRes = await fetch(`/api/follow/${otherData.data.user_id}`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                    if (!followRes.ok) {
                        throw `Erro ao seguir este usuário`
                    }
                } catch (error) {
                    console.error(error);
                }
                const userID = otherData.data.user_id

                fetch(`/api/user/${userID}`)
                    .then(response => response.json())
                    .then(data => {
                        feed.innerHTML = ""
                        setCurrentTab('perfil')
                        perfil(feed, data, 'follow')
                    })
                    .catch(err => {
                        console.error(err);
                    })
            })
        }
    }
    else if (editOrFollow === "edit") {
        button.classList.add('edit')
        button.innerText = "Editar"
        button.addEventListener('click', () => {
            modal.style.display = "block"
            perfilModal(feed, otherData, editOrFollow, modalContent, modal, aside, { perfilIdUsername, perfilIdName, bio })
        })
    }
    else {
        feed.innerHTML = ""
        setCurrentTab("home");
        home(feed, modal);
    }

    recipesDataPerfil(otherData.data.user_id).then(data => {
        getPosts(data, data.length);
    }).catch(error => {
        console.error(error);
    });

    async function getPosts(data, quantity) {
        try {
            generateRecipeCards(data, quantity, feed);
        } catch (error) {
            console.error(error);
        }
    }


    feed.appendChild(perfilHeader)



    // generateRecipeCards(data, parseInt(data.data.length), feed)
}