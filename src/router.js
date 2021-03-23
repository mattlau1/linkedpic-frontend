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

    // Render the component in the "root" div

    // NOTE TO SELF: NEED TO ADD ALL THE HTML TO INDEX
    // AND TOGGLE VISIBLITY BASED ON PATH

    // remove all children of root node
    while (document.getElementById("root").firstChild) {
        document.getElementById("root").firstChild.remove();
    }

    // append page and alert area to root node
    document.getElementById("root").appendChild(component.render());
    document.getElementById("root").appendChild(Alert.render());

    if (path === "/register") {
        console.log("register page");
        handleRegister(api);
    }
    if (path === "/login" || path === "/") {
        console.log("login page");
        handleLogin(api);
    }
    if (path.startsWith("/feed")) {
        console.log("feed page");
        handleFeed(api);
    }
};

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
