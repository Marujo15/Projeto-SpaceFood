function Perfil() {
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
    const perfilButtonFollowEdit = document.createElement('div')
    const perfilButton = document.createElement('div')
    
    const perfilPhoto = document.createElement('img')
    
    const perfilIdName = document.createElement('span')
    const perfilIdUsername = document.createElement('span')
    const bio = document.createElement('span')
    const perfilFollowingSpan = document.createElement('span')
    const perfilIdFollowing = document.createElement('span')
    const perfilFollowerSpan = document.createElement('span')
    const perfilIdFollowers = document.createElement('span')
    
    const follow = document.createElement('button')
    const edit = document.createElement('button')
    
    
    perfilHeader.classList.add('perfil-header')
    perfilHeader.appendChild(perfilImgNameUsername)
    perfilHeader.appendChild(perfilBioFollowingFollowers)
    perfilHeader.appendChild(perfilButtonFollowEdit)
    
    
    perfilImgNameUsername.classList.add('perfil-img-name-username')
    perfilImgNameUsername.appendChild(perfilImg)
    perfilImgNameUsername.appendChild(perfilNameUsername)
    
    perfilImg.classList.add('perfil-img')
    perfilImg.appendChild(perfilPhoto)
    
    perfilPhoto.src='#'
    perfilPhoto.alt='perfil-photo' 
    
    perfilNameUsername.classList.add('perfil-name-username')
    perfilNameUsername.appendChild(perfilClassName)
    perfilNameUsername.appendChild(perfilClassUsername)
    
    perfilClassName.classList.add('perfil-class-name')
    perfilClassName.appendChild(perfilIdName)
    
    perfilIdName.innerText = "Nome do usuário salvo no banco de dados"
    
    perfilClassUsername.classList.add('perfil-class-username')
    perfilClassUsername.appendChild(perfilIdUsername)
    
    perfilIdUsername.innerText = "Username do usuário salvo no banco de dados"
    
    perfilBioFollowingFollowers.classList.add('perfil-bio-following-followers')
    perfilBioFollowingFollowers.appendChild(perfilBio)
    perfilBioFollowingFollowers.appendChild(perfilFollowingFollowers)
    
    perfilBio.classList.add('perfil-bio')
    perfilBio.appendChild(bio)
    
    bio.innerText = "Bio do usuário no banco de dados"
    
    perfilFollowingFollowers.classList.add('perfil-following-followers')
    perfilFollowingFollowers.appendChild(perfilFollowing)
    perfilFollowingFollowers.appendChild(perfilFollowers)
    
    perfilFollowing.classList.add('perfil-following')
    perfilFollowing.appendChild(perfilFollowingSpan)
    perfilFollowing.appendChild(perfilIdFollowing)
    
    perfilFollowingSpan.style.fontWeight='600'
    perfilFollowingSpan.innerText='Following: '
    
    perfilIdFollowing.id='perfil-id-following'
    perfilIdFollowing.innerText='Número de pessoas que o usuário está seguindo'
    
    perfilFollowers.classList.add('perfil-followers')
    perfilFollowers.appendChild(perfilFollowerSpan)
    perfilFollowers.appendChild(perfilIdFollowers)
    
    perfilFollowerSpan.style.fontWeight='600'
    perfilFollowerSpan.innerText='Followers: '
    
    perfilIdFollowers.id='perfil-id-followers'
    perfilIdFollowers.innerText='Número de pessoas que seguem o usuário'
    
    perfilButtonFollowEdit.classList.add('perfil-button-follow-edit')
    perfilButtonFollowEdit.appendChild(perfilButton)
    
    perfilButton.classList.add('perfil-button')
    perfilButton.appendChild(follow)
    perfilButton.appendChild(edit)
    
    follow.classList.add('follow')
    follow.classList.add('hide')
    follow.addEventListener('click', () => {
    
    })
    
    edit.classList.add('edit')
    edit.addEventListener('click', () => {
    
    })

    return perfilHeader
}