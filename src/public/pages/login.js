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
    `;
    document.getElementById("root").innerHTML = '';
    document.getElementById("root").appendChild(loginContent);

    loginScript()

    return loginContent
}

export function loginScript() {

    const inputUsername = document.getElementById("username-input");
    const inputPassword = document.getElementById("password-input");
    const buttonRegister = document.getElementById("register-submit-button");
    const buttonLogin = document.getElementById("login-submit-button");
    const checkboxRemember = document.getElementById('remember')



    // checkboxRemenber.addEventListener("",()=>{
    //     const remember = checkboxRemenber.value;
    //     if(remember){

    //     }
    // });

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

            if (!response.ok) {
                throw new Error('Erro ao fazer login');
            }

            const data = await response.json();
            console.log('data login:', data);

            const switchPage = event('/home');
            window.dispatchEvent(switchPage);

            return data;
        } catch (error) {
            console.error('Erro ao fazer login:', error.message);
            alert('Erro ao fazer login.');
        }
    });
}
