import { config } from "../config/config.js";
const projectLength = config.projectName.length;
const prefix = projectLength > 0 ? `/${config.projectName}/#` : '/#';
let newLocation = `${prefix}${window.location.pathname.substr(projectLength + 1)}`;
if(window.location.search.length > 0) {
    newLocation = `${newLocation}${window.location.search}`;
}
window.location.replace(newLocation);