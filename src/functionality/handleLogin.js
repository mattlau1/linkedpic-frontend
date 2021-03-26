import { createAlert, handleScroll } from "../helpers.js";

// load and handle login page functionality
export const handleLogin = () => {
    const body = document.querySelector("body");
    body.removeEventListener("scroll", handleScroll);
    document.getElementById("loginbtn").addEventListener("click", (e) => {
        e.preventDefault();
        const username = document.getElementById("usernameinput").value;
        const password = document.getElementById("passwordinput").value;

        const loginBody = {
            username: username,
            password: password,
        };

        window.api
            .postAPIRequest("auth/login", loginBody)
            .then((data) => {
                if (data.status === 400) {
                    createAlert("Missing Username/Password", "danger");
                } else if (data.status === 403) {
                    createAlert("Invalid Username/Password", "danger");
                } else if (data.status === 200) {
                    // successful register - send to login page
                    data.json().then((result) => {
                        createAlert("Login Successful", "success");
                        window.location.hash = `#/feed`;
                        localStorage.setItem("token", result.token);
                    });
                }
            })
            .catch((error) => {
                createAlert(`${error}\nIs the backend running?`, "danger");
                console.log(error);
            });
    });
};
