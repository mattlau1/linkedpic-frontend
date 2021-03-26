import { handleRegister } from "./functionality/handleRegister.js";
import { handleLogin } from "./functionality/handleLogin.js";
import { handleFeed } from "./functionality/handleFeed.js";
import { handleProfile } from "./functionality/handleProfile.js";
import { handleNavbar } from "./functionality/handleNavbar.js";
import { handleUpload } from "./functionality/handleUpload.js";
import { handleSettings } from "./functionality/handleSettings.js";
import API from "./api.js";

const routes = [
    { path: "/", component: Login },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/feed", component: Feed },
    { path: "/profile", component: Profile },
    { path: "/upload", component: Upload },
    { path: "/settings", component: Settings },
];

const url = "http://localhost:5500";
const api = new API(url);

// Based off Simple SPA router by Raffaele Pizzari (used < 10 lines of code)
// https://dev.to/pixari/build-a-very-basic-spa-javascript-router-2k4p
const router = () => {
    // Find the component based on the current path
    let path = location.hash.slice(1).toLowerCase() || "/";

    const { component } =
        routes.find((r) => r.path.match(new RegExp(`^\\${path}$`, "gmi"))) ||
        undefined ||
        {};

    const root = document.getElementById("root");

    // clear page by removing all children of root node
    while (root.firstChild) {
        root.firstChild.remove();
    }
    root.appendChild(Alert.render());
    root.appendChild(Modal.render());
    window.api = api;

    // check path and append components accordingly
    if (path === "/register") {
        root.appendChild(component.render());
        handleRegister();
    } else if (path === "/login" || path === "/") {
        root.appendChild(component.render());
        handleLogin();
    } else if (path === "/feed") {
        root.appendChild(Navbar.render());
        root.appendChild(component.render());
        handleNavbar();
        handleFeed();
    } else if (path.startsWith("/profile")) {
        root.appendChild(Navbar.render());
        root.appendChild(Profile.render());
        handleNavbar();
        handleProfile();
    } else if (path === "/upload") {
        root.appendChild(Navbar.render());
        root.appendChild(component.render());
        handleNavbar();
        handleUpload();
    } else if (path === "/settings") {
        root.appendChild(Navbar.render());
        root.appendChild(component.render());
        handleNavbar();
        handleSettings();
    } else {
        root.appendChild(Navbar.render());
        root.appendChild(Error.render());
    }
};

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
