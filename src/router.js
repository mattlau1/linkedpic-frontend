import { handleRegister } from "./functionality/handleRegister.js";
import { handleLogin } from "./functionality/handleLogin.js";
import { handleFeed } from "./functionality/handleFeed.js";
import { handleProfile } from "./functionality/handleProfile.js";
import { handleNavbar } from "./functionality/handleNavbar.js";
import { handleUpload } from "./functionality/handleUpload.js";
import API from "./api.js";

const routes = [
    { path: "/", component: Login },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/feed", component: Feed },
    { path: "/profile", component: Profile },
    { path: "/upload", component: Upload },
];

const url = "http://localhost:5000";
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

    // check path and append components accordingly
    if (path === "/register") {
        root.appendChild(component.render());
        handleRegister(api);
    } else if (path === "/login" || path === "/") {
        root.appendChild(component.render());
        handleLogin(api);
    } else if (path === "/feed") {
        root.appendChild(Navbar.render());
        root.appendChild(component.render());
        handleNavbar(api);
        handleFeed(api);
    } else if (path.startsWith("/profile")) {
        root.appendChild(Navbar.render());
        root.appendChild(Profile.render(api));
        handleNavbar(api);
        handleProfile(api);
    } else if (path === "/upload") {
        root.appendChild(Navbar.render());
        root.appendChild(component.render(api));
        handleNavbar(api);
        handleUpload(api);
    }
};

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
