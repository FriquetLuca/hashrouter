import { config } from "../config/config.js";
const projectLength = config.projectName.length;
const prefix = projectLength > 0 ? `/${config.projectName}/#` : '/#';
window.location.replace(`${prefix}${window.location.pathname.substr(projectLength + 1)}`);