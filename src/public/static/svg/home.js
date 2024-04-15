const homeContent = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <h1>Autenticado!</h1>
    <p>Seja bem-vindo à aplicação <span id="username"></span>!</p>
    <input id="exit" type="button" value="Sair" />
</body>

<script>
    document.addEventListener('DOMContentLoaded', async function () {
        const response = await fetch('/api/user/login', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (data.error) {
            alert(data.error);
            fetch('/api/login', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }

            })
            window.location.href = "/login";
        }

        else {
            document.getElementById('username').textContent = data.name;
        }

        const exitButton = document.querySelector('#exit');

        exitButton.onclick = function () {
            fetch('/api/user/login', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            
            window.location.href = "/login";
        }
    });

    const exitButton = document.querySelector('#exit');

    exitButton.addEventListener('click', () => {
        fetch('/api/user/login', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        window.location.href = "/";
    })
</script>

</html>
`

const homePage =  (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.send(homeContent)
}

module.exports = homePage