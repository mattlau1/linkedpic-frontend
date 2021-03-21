const routes = [
  { path: "/", component: login },
  { path: "/login", component: login },
  { path: "/register", component: register },
];

// Simple SPA router by Raffaele Pizzari (used < 10 lines of code)
// https://dev.to/pixari/build-a-very-basic-spa-javascript-router-2k4p
const router = () => {
  // Find the component based on the current path
  const path = location.hash.slice(1).toLowerCase() || "/";

  // If there's no matching route, get the "Error" component
  const { component = ErrorComponent } =
    routes.find((r) => r.path.match(new RegExp(`^\\${path}$`, "gmi"))) ||
    undefined ||
    {};

  // Render the component in the "root" div
  document.getElementById("root").innerHTML = component.render();
};

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
