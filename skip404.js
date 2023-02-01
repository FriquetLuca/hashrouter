import { config } from "./config.js";
let m=config.projectName;
let n=m.length;
window.location.replace(n>0?`/${m}/#`:'/#'+window.location.pathname.substr(n+1));