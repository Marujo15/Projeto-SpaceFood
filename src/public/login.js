const loginContent = `
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Kaushan+Script&family=Roboto:wght@300;400;500;700;900&display=swap"
        rel="stylesheet">
    <title>SpaceFood</title>
    <link rel="stylesheet" href="./static/css/loginStyle.css">
</head>


<body>
    <div class="fundo">
        <img class="stars" src="./static/svg/stars.svg">
        <img class="planeta1" src="./static/svg/planeta.svg">
        <img class="planeta2" src="./static/svg/planeta2.svg">
    </div>

    <header class="text-div">
        <span class="kaushan txt-sp1">Welcome to</span>
        <span class="kaushan txt-sp2">Space</span>
        <span class="kaushan txt-sp3">Food</span>
    </header>

    <main class="login-display">
        <form>
            <input type="text" placeholder="Username" id="username-input" required>
            <input type="password" placeholder="Password" id="password-input" required>
            <div class="options">
                <div class="remember-checkbox">
                    <input type="checkbox" id="remember">
                    <label for="remember">Lembrar-se de mim</label>
                </div>
                <button type="button" id="register-submit-button">Criar uma nova conta</button>
            </div>
            <div class="submit-btn-div">
                <button class="roboto" type="submit" id="login-submit-button">Entrar</button>
            </div>
        </form>
    </main>
</body>
<script src="./static/js/loginScript.js"></script>

</html>
`

const loginPage =  (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.send(loginContent)
}

module.exports = loginPage