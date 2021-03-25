// creates an alert in #alert-area with given text and type
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
