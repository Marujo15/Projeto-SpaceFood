export function registerPage() {
    const registerContent = document.createElement('div')
    registerContent.innerHTML = `
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
        
        <title>SpaceFood</title>
    </head>
    
    <body> 
        <link rel="stylesheet" href="./static/css/registerStyle.css">
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
                <input type="text" placeholder="Nome de usuário" id="username-input" required>
                <input type="text" placeholder="Nome" id="name-input" required>
                <input type="email" placeholder="Email" id="email-input" required>
                <input type="password" placeholder="Senha" id="password-input" required>
                <input type="password" placeholder="Confirme a senha" id="confirm-password-input" required>
                <div class="submit-btn-div">
                    <button class="roboto" type="submit" id="submit-button">Cadastrar</button>
                </div>
            </form>
        </main>
    </body>
    </html>
    `
    document.getElementById("root").innerHTML = '';
    document.getElementById("root").appendChild(registerContent);
    registerScript()
    return registerContent
}

export function registerScript() {
    const inputUsename = document.getElementById("username-input");
    const inputName = document.getElementById("name-input");
    const inputEmail = document.getElementById("email-input");
    const inputPassword = document.getElementById("password-input");
    const inputConfirmPassword = document.getElementById("confirm-password-input");
    const buttonSubmit = document.getElementById('submit-button');

    inputUsename.addEventListener("blur", async () => {
        const username = inputUsename.value;
        try {
            const response = await fetch(`/api/user/register/username/${username}`);
            const data = await response.json();

            if (!response.ok) {
                alert('Este username já está em uso. Por favor, escolha outro.');
            }
        } catch (error) {
            alert('Ocorreu um erro ao verificar o username.');
        }
    });

    inputEmail.addEventListener("blur", async () => {
        const email = inputEmail.value;
        try {
            const response = await fetch(`/api/user/register/email/${email}`);
            const data = await response.json();

            if (!response.ok) {
                alert('Este email já está cadastrado.');
            }
        } catch (error) {
            console.error('Ocorreu um erro ao verificar o email.');
        }
    });

    buttonSubmit.addEventListener("click", async (e) => {

        e.preventDefault()

        const userData = {
            name: inputName.value,
            username: inputUsename.value,
            email: inputEmail.value,
            password: inputPassword.value
        };
        const confirmPassword = inputConfirmPassword.value;

        if (userData.password !== confirmPassword) {
            alert('As senhas não coincidem.');
            return;
        }

        try {
            const response = await fetch('/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                throw new Error('Erro ao cadastrar usuário');
            }

            const data = await response.json();
            window.location.href = "/login";

        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error.message);
            console.error('Ocorreu um erro ao cadastrar o usuário.');
        }

    });
}