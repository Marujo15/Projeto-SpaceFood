import { recipeFavoriteData } from './modules/btnfavorite.js';
import { getLike } from './modules/btnlike.js';
import event from './modules/event.js'

export const loginPage = () => {
    const loginContent = document.createElement('div')
    loginContent.classList.add("login-content")

    loginContent.innerHTML = `
<link rel="stylesheet" href="../static/css/loginStyle.css">
<div class="fundo">
    <img class="stars" src="../static/svg/stars.svg">
    <img class="planeta1" src="../static/svg/planeta.svg">
    <img class="planeta2" src="../static/svg/planeta2.svg">
</div>

<header class="text-div">
    <span class="kaushan txt-sp1">Bem-vindo ao</span>
    <span class="kaushan txt-sp2">Space</span>
    <span class="kaushan txt-sp3">Food</span>
</header>

<main class="login-display">
    <form>
        <input type="text" placeholder="Nome de usúario" id="username-input" required>
        <input type="password" placeholder="Senha" id="password-input" required>
        <div class="options">
            <button type="button" id="register-submit-button">Criar uma nova conta</button>
            <button class="roboto" type="submit" id="login-submit-button">Entrar</button>
        </div>
        <div class="submit-btn-div">
            <span class="error-message"></span>
        </div>
    </form>
</main>
`;
    document.getElementById("root").innerHTML = '';
    document.getElementById("root").appendChild(loginContent);

    loginScript()

    return loginContent
}

export async function loginScript() {

    const inputUsername = document.getElementById("username-input");
    const inputPassword = document.getElementById("password-input");
    const buttonRegister = document.getElementById("register-submit-button");
    const buttonLogin = document.getElementById("login-submit-button");
    const message = document.querySelector(".error-message");

    buttonRegister.addEventListener("click", (e) => {
        e.preventDefault();
        const switchPage = event('/register')
        window.dispatchEvent(switchPage);
    });

    buttonLogin.addEventListener("click", async (e) => {
        e.preventDefault();
        const userData = {
            "username": String(inputUsername.value),
            "password": String(inputPassword.value),
        };

        try {
            const response = await fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            const data = await response.json();

            if (!response.ok) {
                const errorMessage = data.error
                throw 'Erro ao fazer login: ' + errorMessage;
            }
            
            const favoriteData = await recipeFavoriteData();
            localStorage.setItem('favoriteData', JSON.stringify(favoriteData));
            
            const likeData = await getLike();
            localStorage.setItem('likeData', JSON.stringify(likeData));

            const switchPage = event('/');
          
            window.dispatchEvent(switchPage);

            return {data};

        } catch (error) {
            message.innerText = "Erro ao fazer login."
            console.error(error);
        }
    });
}