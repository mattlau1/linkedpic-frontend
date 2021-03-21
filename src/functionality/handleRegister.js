import { createAlert } from "./createAlert.js";

export const handleRegister = (api) => {
    // add background to registration page
    const body = document.getElementById("root");
    body.classList.add("bg");

    document.getElementById("registerbtn").addEventListener("click", (e) => {
        e.preventDefault();
        const firstName = document.getElementById("firstnameinput").value;
        const lastName = document.getElementById("lastnameinput").value;
        const email = document.getElementById("emailinput").value;
        const username = document.getElementById("usernameinput").value;
        const password = document.getElementById("passwordinput1").value;
        const confirmPassword = document.getElementById("passwordinput2").value;

        if (firstName === "") {
            createAlert("Missing first name", "danger");
            return;
        }

        if (lastName === "") {
            createAlert("Missing last name", "danger");
            return;
        }

        if (password !== confirmPassword) {
            createAlert("Passwords must match", "danger");
            return;
        }

        if (email === "") {
            createAlert("Missing email", "danger");
            return;
        }

        const signupBody = {
            username: username,
            password: password,
            email: email,
            name: `${firstName} ${lastName}`,
        };

        api.postAPIRequest("auth/signup", signupBody)
            .then((data) => {
                if (data.status === 400) {
                    createAlert("Missing username or password", "danger");
                } else if (data.status === 409) {
                    createAlert("Username has already been taken", "danger");
                } else if (data.status === 200) {
                    // successful register - send to login page
                    data.json().then((result) => {
                        window.location.hash = "#/login";
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                // createAlert(`Error: ${error}`, "danger");
            });
    });
};
