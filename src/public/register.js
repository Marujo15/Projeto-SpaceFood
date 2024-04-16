const registerContent = `
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link
        href="https://fonts.googleapis.com/css2?family=Kaushan+Script&family=Roboto:wght@300;400;500;700;900&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="./static/css/registerStyle.css">
    <title>SpaceFood</title>
</head>

<body>
    <div class="fundo">
        <img class="stars" src="./static/SVG/stars.svg">
        <img class="planeta1" src="./static/SVG/planeta.svg">
        <img class="planeta2" src="./static/SVG/planeta2.svg">
    </div>

    <header class="text-div">
        <span class="kaushan txt-sp1">Welcome to</span>
        <span class="kaushan txt-sp2">Space</span>
        <span class="kaushan txt-sp3">Food</span>
    </header>

    <main class="login-display">
        <form>
            <input type="text" placeholder="Username" id="username-input" required>
            <input type="text" placeholder="Name" id="name-input" required>
            <input type="email" placeholder="Email" id="email-input" required>
            <input type="password" placeholder="Password" id="password-input" required>
            <input type="password" placeholder="Confirm Password" id="confirm-password-input" required>
            <div class="submit-btn-div">
                <button class="roboto" type="submit" id="submit-button">Cadastrar</button>
            </div>
        </form>
    </main>
</body>
<script src="./static/js/registerScript.js"></script>
</html>
`

const registerPage =  (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.send(registerContent)
}

module.exports = registerPage