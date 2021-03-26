import { createAlert } from "../helpers.js";
import { handleScroll } from "./handleScroll.js";

// load and handle upload page functionality
export const handleUpload = () => {
    const fileInput = document.getElementById("file-input");
    const token = localStorage.getItem("token");
    const body = document.querySelector("body");
    const imgPreview = document.getElementById("img-preview");
    body.removeEventListener("scroll", handleScroll);

    // if an image is uploaded to the page, preview the image
    fileInput.addEventListener("change", () => {
        const img = fileInput.files[0];
        const imgReader = new FileReader();

        imgReader.onloadend = () => {
            imgPreview.src = imgReader.result;
        };

        if (img) {
            imgReader.readAsDataURL(img);
        } else {
            imgPreview.src = "";
        }
    });

    // submit/upload button functionality
    const uploadBtn = document.getElementById("upload-btn");
    uploadBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const postDescription = document.getElementById("description").value;

        // check if any fields are empty
        if (postDescription.length === 0) {
            createAlert("Please add a post description", "danger");
            return;
        } else if (fileInput.files[0] === undefined) {
            createAlert("Please upload an image", "danger");
            return;
        }

        // read file and upload image to backend
        const reader = new FileReader();
        reader.readAsDataURL(fileInput.files[0]);
        reader.onload = () => {
            const body = {
                description_text: postDescription,
                src: reader.result.split(",")[1],
            };

            // send post request to upload image
            window.api
                .postAPIRequest("post", body, token)
                .then((data) => {
                    if (data.status === 400) {
                        createAlert(
                            "Malformed Request / Image could not be processed",
                            "danger"
                        );
                    } else if (data.status === 403) {
                        createAlert("Invalid Auth Token", "danger");
                    } else if (data.status === 200) {
                        createAlert("Post successfully created", "success");

                        // reset upload form
                        document.getElementById("upload-form").reset();
                        imgPreview.src = "";
                    }
                })
                .catch((error) => {
                    createAlert("Error uploading image", "danger");
                    console.log(error);
                });
        };
    });
};
