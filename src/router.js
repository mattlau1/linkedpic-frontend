import { handleRegister } from "./functionality/handleRegister.js";
import { handleLogin } from "./functionality/handleLogin.js";
import { handleFeed } from "./functionality/handleFeed.js";
import API from "./api.js";

const routes = [
    { path: "/", component: Login },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/feed", component: Feed },
];

const url = "http://localhost:5000";
const api = new API(url);

// Simple SPA router by Raffaele Pizzari (used < 10 lines of code)
// https://dev.to/pixari/build-a-very-basic-spa-javascript-router-2k4p
const router = () => {
    // Find the component based on the current path
    let path = location.hash.slice(1).toLowerCase() || "/";
    if (path.match(/\//g).length >= 2) {
        path = "/" + path.match(new RegExp("/(.*)/"))[1];
    }

    const { component } =
        routes.find((r) => r.path.match(new RegExp(`^\\${path}$`, "gmi"))) ||
        undefined ||
        {};

    const root = document.getElementById("root");

    // clear page by removing all children of root node
    while (root.firstChild) {
        root.firstChild.remove();
    }

    if (path === "/register") {
        console.log("register page");
        // append page and alert area to root node
        root.appendChild(component.render());
        root.appendChild(Alert.render());
        handleRegister(api);
    }
    if (path === "/login" || path === "/") {
        console.log("login page");
        // append page and alert area to root node
        root.appendChild(component.render());
        root.appendChild(Alert.render());
        handleLogin(api);
    }
    if (path.startsWith("/feed")) {
        console.log("feed page");
        // append page and alert area to root node
        root.appendChild(Navbar.render());
        root.appendChild(component.render());
        root.appendChild(Alert.render());
        root.appendChild(Modal.render());
        handleFeed(api);
    }
};

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
