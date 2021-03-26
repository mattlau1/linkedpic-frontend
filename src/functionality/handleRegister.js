import { createAlert, handleScroll } from "../helpers.js";

// load and handle registration page functionality
export const handleRegister = () => {
    const body = document.querySelector("body");
    body.removeEventListener("scroll", handleScroll);
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

        window.api
            .postAPIRequest("auth/signup", signupBody)
            .then((data) => {
                if (data.status === 400) {
                    createAlert("Missing username or password", "danger");
                } else if (data.status === 409) {
                    createAlert("Username has already been taken", "danger");
                } else if (data.status === 200) {
                    // successful register - send to login page
                    window.location.hash = "#/login";
                }
            })
            .catch((error) => {
                createAlert(`${error}\nIs the backend running?`, "danger");
                console.log(error);
            });
    });
};
