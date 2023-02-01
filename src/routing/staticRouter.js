// The config file
import { config } from "../config/config.js";
// The routes...
import Home from "./routes/home.js";
import About from "./routes/about.js";
import Contact from "./routes/contact.js";
import FourOFour from "./routes/404.js";
// A hash router, kinda
class StaticRouter {
    constructor(allRouteControllers) {
        this.content = document.querySelector(config.rootElement);
        this.routes = {};
        for(const route of allRouteControllers) {
            const currentRoute = route();
            this.routes[currentRoute.route] = () => {
                content.innerHTML = currentRoute.content;
            };
        }
        const index = this.routes[config.indexRoute];
        this.routes[`/${config.projectName}/`] = index;
        this.routes[`/index.html`] = index;
        this.routes[`/`] = index;
    }
    handleNavigation(path) {
        const route = this.routes[path] || this.routes['/404'];
        route();
    };
    addRoute(routeController) {
        this.routes[routeController.route] = () => {
            content.innerHTML = routeController.content;
        };
    }
}
// Create the router
const router = new StaticRouter([
    Home,
    About,
    Contact,
    FourOFour
]);
document.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'A') {
      event.preventDefault();
      const href = target.getAttribute('url');
      history.pushState({}, '', `/${config.projectName}${href}`);
      router.handleNavigation(href);
    }
});
window.addEventListener('popstate', () => {
    router.handleNavigation(location.pathname);
});
const splittedURL = location.href.split("#");
switch(splittedURL.length) {
    case 2:
        history.pushState({}, '', `/${config.projectName}${splittedURL[1]}`);
        router.handleNavigation(splittedURL[1]);
        break;
    default:
        router.handleNavigation(location.pathname);
        break;
}
export default router;