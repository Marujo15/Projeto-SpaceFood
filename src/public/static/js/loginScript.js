/* const inputUsername = document.getElementById("username-input");
const inputPassword = document.getElementById("password-input");
const buttonRegister = document.getElementById("register-submit-button");
const buttonLogin = document.getElementById("login-submit-button");
const checkboxRemenber = document.getElementById('remember')

import pageRouter from "../../pages/router.js";

// checkboxRemenber.addEventListener("",()=>{
//     const remember = checkboxRemenber.value;
//     if(remember){

//     }
// });

buttonRegister.addEventListener("click", (event) => {
    event.preventDefault();
    pageRouter.getPage('/register')
    /* window.location.href = "/register"; 
});

buttonLogin.addEventListener("click", async (event) => {
    event.preventDefault(); 
    const userData = {
        "username" : String(inputUsername.value),
        "password" : String(inputPassword.value),
    }
    console.log('userData:', userData);
    try {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            const customEvent = createCustomEvent('/home');
            window.dispatchEvent(customEvent);
            throw new Error('Erro ao tentar fazer login');
        }
        window.location.href = "/home"
    } catch (error) {
        console.error('Erro ao fazer login:', error.message);
        alert('Erro ao fazer login.', error.message);
    }
}); */