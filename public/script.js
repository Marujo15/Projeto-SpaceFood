import createRouter from './pages/router.js';

const pageRouter = createRouter();

window.addEventListener('customEvent', (e) => {
    const path = e.detail.path;

    const page = pageRouter.getPage(path);

    history.pushState({}, '', path);

    document.getElementById('root').innerHTML = "";
    document.getElementById('root').appendChild(page);
});

const actualPath = window.location.pathname;
const actualPage = pageRouter.getPage(actualPath)
document.getElementById('root').innerHTML = "";
document.getElementById('root').appendChild(actualPage)

window.addEventListener('popstate', () => {
    const newPath = window.location.pathname; 
    
    const page = pageRouter.getPage(newPath); 
    
    document.getElementById('root').innerHTML = '';
    document.getElementById('root').appendChild(page);
});