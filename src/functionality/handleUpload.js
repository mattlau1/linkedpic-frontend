import { createAlert } from "./createAlert.js";

export const handleUpload = (api) => {
    const fileInput = document.getElementById("file-input");
    const token = localStorage.getItem("token");

    // if an image is uploaded to the page, preview image
    fileInput.addEventListener("change", () => {
        const imgPreview = document.getElementById("img-preview");
        const img = fileInput.files[0];
        const imgReader = new FileReader();

        console.log(img);

        imgReader.onloadend = () => {
            imgPreview.src = imgReader.result;
        };

        if (img) {
            imgReader.readAsDataURL(img);
        } else {
            imgPreview.src = "";
        }
    });

    const uploadBtn = document.getElementById("upload-btn");
    uploadBtn.addEventListener("click", () => {
        const postDescription = document.getElementById("description").value;

        if (postDescription.length === 0) {
            createAlert("Please add a post description", "danger");
            return;
        } else if (fileInput.files[0] === undefined) {
            createAlert("Please upload an image", "danger");
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(fileInput.files[0]);
        reader.onload = () => {
            const body = {
                description_text: postDescription,
                src: reader.result.split(",")[1],
            };

            // send post request to upload image
            api.postAPIRequest("post", body, token)
                .then((data) => {
                    if (data.status === 400) {
                        createAlert(
                            "Malformed Request / Image could not be processed",
                            "danger"
                        );
                    } else if (data.status === 403) {
                        createAlert("Invalid Auth Token", "danger");
                    } else if (data.status === 200) {
                        data.json().then(() => {
                            createAlert("Post successfully created", "success");
                        });
                    }
                })
                .catch((error) => {
                    createAlert(`Error uploading image`, "danger");
                    console.log(error);
                });
        };
    });
};
