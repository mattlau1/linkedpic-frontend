/**
 * Given a js file object representing a jpg or png image, such as one taken
 * from a html file input element, return a promise which resolves to the file
 * data as a data url.
 * More info:
 *   https://developer.mozilla.org/en-US/docs/Web/API/File
 *   https://developer.mozilla.org/en-US/docs/Web/API/FileReader
 *   https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
 *
 * Example Usage:
 *   const file = document.querySelector('input[type="file"]').files[0];
 *   console.log(fileToDataUrl(file));
 * @param {File} file The file to be read.
 * @return {Promise<string>} Promise which resolves to the file as a data url.
 */
export function fileToDataUrl(file) {
    const validFileTypes = ["image/jpeg", "image/png", "image/jpg"];
    const valid = validFileTypes.find((type) => type === file.type);
    // Bad data, let's walk away.
    if (!valid) {
        throw Error("provided file is not a png, jpg or jpeg image.");
    }

    const reader = new FileReader();
    const dataUrlPromise = new Promise((resolve, reject) => {
        reader.onerror = reject;
        reader.onload = () => resolve(reader.result);
    });
    reader.readAsDataURL(file);
    return dataUrlPromise;
}

// gets current username from navbar href
export const getCurrentUsername = () => {
    const profileUrl = document.getElementById("navbar-profile");
    const urlSplit = profileUrl.href.split("/");
    return urlSplit[urlSplit.length - 1];
};

// creates an alert with given text and type that times out after
// a set duration
export const createAlert = (text, type) => {
    const area = document.getElementById("alert-area");
    const newAlert = document.createElement("div");
    newAlert.classList.add("alert");
    newAlert.classList.add("alert-dismissible");
    newAlert.classList.add("fade");
    newAlert.classList.add("show");

    // alert-danger, alert-success etc.
    newAlert.classList.add(`alert-${type}`);

    newAlert.innerText = text;
    area.appendChild(newAlert);
    const bsAlert = new bootstrap.Alert(newAlert);
    const duration = 3000;
    setTimeout(() => {
        bsAlert.close();
    }, duration);
};
