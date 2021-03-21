import { createAlert } from "./createAlert.js";

export const handleLogin = (api) => {
    // add background to login page
    const body = document.getElementById("root");
    body.classList.add("bg");

    document.getElementById("loginbtn").addEventListener("click", (e) => {
        e.preventDefault();
        const username = document.getElementById("usernameinput").value;
        const password = document.getElementById("passwordinput").value;

        const loginBody = {
            username: username,
            password: password,
        };

        api.postAPIRequest("auth/login", loginBody)
            .then((data) => {
                if (data.status === 400) {
                    createAlert("Missing Username/Password", "danger");
                } else if (data.status === 403) {
                    createAlert("Invalid Username/Password", "danger");
                } else if (data.status === 200) {
                    // successful register - send to login page
                    data.json().then((result) => {
                        createAlert("Login Successful", "success");
                        window.location.hash = "#/feed";
                        console.log(result);
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                // createAlert(`Error: ${error}`, "danger");
            });
    });
};
