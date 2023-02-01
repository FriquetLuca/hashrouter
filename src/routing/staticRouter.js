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
            const currentRoute = route(new URLSearchParams()).route;
            this.routes[currentRoute] = (params) => {
                content.innerHTML = route(params).content;
            };
        }
        const index = this.routes[config.indexRoute];
        this.skippablePath = [
            `/${config.projectName}/`,
            '/index.html',
            '/'
        ];
        this.skippablePath.forEach(p => this.routes[p] = index);
    }
    handleNavigation(path) {
        let splitedPath = path.split('?')[0];
        const isSplitable = (path) => {
            let splitable = true;
            for(const skip of this.skippablePath) {
                splitable = splitable && (skip !== path);
            }
            return splitable;
        }
        if(isSplitable(splitedPath) && splitedPath.endsWith("/")) {
            splitedPath = splitedPath.substring(0, splitedPath.length - 1);
        }
        const route = this.routes[splitedPath] || this.routes['/404'];
        route(new URLSearchParams(window.location.search));
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
        const currentURL = target.getAttribute('url');
        if(currentURL) {
            event.preventDefault();
            history.pushState({}, '', `/${config.projectName}${currentURL}`);
            router.handleNavigation(currentURL);
        }
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