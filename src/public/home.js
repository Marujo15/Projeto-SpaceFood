const homeContent = `
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Kaushan+Script&family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./static/css/homeStyle.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <title>SpaceFood</title>
</head>

<body>

    <header>
        <div class="header-logo">
            <span class="logo-space kaushan">Space</span>
            <span class="logo-food kaushan">Food</span>
        </div>
        <div class="header-buttons">
            <button class="roboto header-button-all selected">Todos</button>
            <button class="roboto header-button-following">Seguindo</button>
        </div>
    </header>

    <div class="aside-main">

        <aside>
            <div class="abas">
                <button id=home class="aba-home aba-button">
                    <i class='bx bxs-home'></i>
                    <span class="roboto">Início</span>
                </button>
                <button id="search" class="aba-search aba-button">
                    <i class='bx bx-search'></i>
                    <span class="roboto">Pesquisar</span>
                </button>
                <button id="favorites" class="aba-favorites aba-button">
                    <i class='bx bxs-bookmark'></i>
                    <span class="roboto">Favoritos</span>
                </button>
            </div>

            <div id="post" class="button-write">
                <button class="roboto-5">Escrever</button>
            </div>

            <div class="button-user-div">
                <button class="button-user">
                    <img src="#" alt="user-photo">
                    <div class="user-details">
                        <span id="user-name">
                            Usuário1
                        </span>
                        <span id="user-username">
                            @usuario1
                        </span>
                    </div>
                </button>
            </div>
        </aside>

        <main class="posts">

            <div id="recipeModal" class="modal" style="display: none;">
                <button id="closeModal" class="close-modal">X</button>
                <div id="recipe-content" class="modal-content"></div>
                <div id="error-message" class="error-message" style="display: none;"></div>
            </div>
        </main>
    </div>
</body>
<script type="module" src="./static/js/homeScript.js"></script>

</html>
`

const homePage = (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.send(homeContent)
}

module.exports = homePage