import { handleRegister } from "./functionality/handleRegister.js";
import { handleLogin } from "./functionality/handleLogin.js";
import { handleFeed } from "./functionality/handleFeed.js";
import { handleProfile } from "./functionality/handleProfile.js";
import API from "./api.js";

const routes = [
    { path: "/", component: Login },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/feed", component: Feed },
    { path: "/profile", component: Profile },
];

const url = "http://localhost:5000";
const api = new API(url);
let token = 0;

// Simple SPA router by Raffaele Pizzari (used < 10 lines of code)
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

    if (path === "/register") {
        // append page and alert area to root node
        root.appendChild(component.render());
        handleRegister(api);
    }
    if (path === "/login" || path === "/") {
        // append page and alert area to root node
        root.appendChild(component.render());
        handleLogin(api);
    }
    if (path.startsWith("/feed")) {
        // append page and alert area to root node
        root.appendChild(Navbar.render());
        root.appendChild(component.render());
        handleFeed(api);
    }
    if (path.startsWith("/profile")) {
        root.appendChild(Navbar.render());
        root.appendChild(Profile.render(api));
        handleProfile(api);
    }
};

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
