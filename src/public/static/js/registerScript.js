/* const inputUsename = document.getElementById("username-input");
const inputName = document.getElementById("name-input");
const inputEmail = document.getElementById("email-input");
const inputPassword = document.getElementById("password-input");
const inputConfirmPassword = document.getElementById("confirm-password-input");
const buttonSubmit = document.querySelector('button');

inputUsename.addEventListener("blur", async () => {
  console.log("entrou");
  const username = inputUsename.value;
  try {
    const response = await fetch(`/api/user/register/username/${username}`);
    const data = await response.json();

    if (data.exists) {
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

    if (data.exists) {
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
    console.log('Usuário cadastrado com sucesso:', data);
    window.location.href = "/login";

  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error.message);
    console.error('Ocorreu um erro ao cadastrar o usuário.');
  }

}); */