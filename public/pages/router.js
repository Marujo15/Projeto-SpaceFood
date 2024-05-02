import { registerPage } from "./register.js";
import { loginPage } from "./login.js";
import { homePage } from "./home.js";

function pageRouter() {
    const routes = {
        '/': homePage,
        '/login': loginPage,
        '/register': registerPage,
        '/home': homePage,
    }

    const getPage = (path) => {

        if (routes[path] === undefined || routes[path] === null) {
            history.pushState(null, null, '/');
            return routes['/']()
        }

        return routes[path]()
    }

    return {
        ...routes,
        getPage,
    };
}

export default pageRouter;