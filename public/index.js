import createRouter from './pages/router.js';

const pageRouter = createRouter();
const root = document.getElementById('root');

window.addEventListener('customEvent', (e) => {
    const path = e.detail.path;

    const page = pageRouter.getPage(path);

    history.pushState(null, null, path);

    root.innerHTML = "";
    root.appendChild(page);
});

const actualPath = window.location.pathname
const actualPage = pageRouter.getPage(actualPath)
root.appendChild(actualPage)

window.addEventListener('popstate', () => {
    const newPath = window.location.pathname; 
    
    const page = pageRouter.getPage(newPath); 
    
    root.innerHTML = '';
    root.appendChild(page);
});