const Alert = {
    render: () => {
        const alert = document.createElement("div");
        alert.id = "alert-area";
        alert.className = "col-5 text-center mt-5 mb-0";

        const alertRow = document.createElement("div");
        alertRow.className = "row justify-content-center";

        const alertContainer = document.createElement("div");
        alertContainer.className =
            "container-fluid m-0 p-0 position-absolute fixed-bottom";
        alertRow.appendChild(alert);
        alertContainer.appendChild(alertRow);

        return alertContainer;
    },
};
