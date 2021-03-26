import { createAlert } from "../helpers.js";
import { handleScroll } from "./handleScroll.js";

// load and handle settings page functionality
export const handleSettings = () => {
    const email = document.getElementById("account-email");
    const name = document.getElementById("account-name");
    const newPassword1 = document.getElementById("account-first-pass");
    const newPassword2 = document.getElementById("account-second-pass");
    const updateBtn = document.getElementById("update-button");
    const body = document.querySelector("body");
    body.removeEventListener("scroll", handleScroll);

    // get logged in user information
    const token = localStorage.getItem("token");
    window.api
        .getAPIUserData(token)
        .then((user) => {
            email.value = user.email;
            name.value = user.name;

            updateBtn.addEventListener("click", (e) => {
                e.preventDefault();
                if (newPassword1.value !== newPassword2.value) {
                    createAlert("Passwords must match", "danger");
                    return;
                } else if (newPassword1.value.length === 0) {
                    createAlert("Password cannot be empty", "danger");
                    return;
                } else if (email.value.length === 0) {
                    createAlert("Email cannot be empty", "danger");
                    return;
                } else if (name.value.length === 0) {
                    createAlert("Name cannot be empty", "danger");
                    return;
                }

                // send put request to update account information
                const body = {
                    email: email.value,
                    name: name.value,
                    password: newPassword1.value,
                };
                window.api
                    .putAPIRequestTokenBody("user", body, token)
                    .then((data) => {
                        if (data.status === 400) {
                            createAlert("Malformed User Object", "danger");
                        } else if (data.status === 403) {
                            createAlert("Invalid Auth Token", "danger");
                        } else if (data.status === 404) {
                            createAlert("User Not Found", "danger");
                        } else if (data.status === 200) {
                            createAlert(
                                "Successfully updated account information",
                                "success"
                            );
                        }
                    })
                    .catch((error) => {
                        createAlert(
                            "Error Updating Account Information",
                            "danger"
                        );
                        console.log(error);
                    });
            });
        })
        .catch((error) => {
            createAlert("Error Retrieving User Information", "danger");
            console.log(error);
        });
};
