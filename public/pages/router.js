import { registerPage } from "./register.js";
import { loginPage } from "./login.js";
import { homePage } from "./home.js";

function pageRouter() {
    const routes = {
        '/': loginPage,
        '/login': loginPage,
        '/register': registerPage,
        '/home': homePage,
    }

    const getPage = (path) => routes[path]()

    return {
        ...routes,
        getPage,
    }
}

export default pageRouter;