import { config } from "../config/config.js";
const projectLength = config.projectName.length;
const prefix = projectLength > 0 ? `/${config.projectName}/#` : '/#';
const newLocation = `${prefix}${window.location.pathname.substr(projectLength + 1)}`;
if(window.location.search.length > 0) {
    window.location.replace(`${newLocation}/${window.location.search}`);
} else {
    window.location.replace(newLocation);
}