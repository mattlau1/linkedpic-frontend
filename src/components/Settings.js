// renders static html elements for the settings page
const Settings = {
    render: () => {
        // title
        const title = document.createElement("div");
        title.className = "display-4 text-center";
        title.innerText = "Account Settings";

        // horizontal rule
        const hr = document.createElement("hr");

        // email input box
        const emailLabel = document.createElement("label");
        emailLabel.setAttribute("for", "description");
        emailLabel.className = "form-label";
        emailLabel.innerText = "Email Address";

        const emailInput = document.createElement("input");
        emailInput.type = "text";
        emailInput.id = "account-email";
        emailInput.className = "form-control form-control-md mb-4";
        emailInput.placeholder = "New Email Address";

        const emailFormGroup = document.createElement("div");
        emailFormGroup.className = "form-group";

        const emailContainer = document.createElement("div");
        emailContainer.className = "col-md-12";

        emailFormGroup.appendChild(emailLabel);
        emailFormGroup.appendChild(emailInput);
        emailContainer.appendChild(emailFormGroup);

        // name input box
        const nameLabel = document.createElement("label");
        nameLabel.setAttribute("for", "description");
        nameLabel.className = "form-label";
        nameLabel.innerText = "Full Name";

        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.id = "account-name";
        nameInput.className = "form-control form-control-md mb-4";
        nameInput.placeholder = "New Name";

        const nameFormGroup = document.createElement("div");
        nameFormGroup.className = "form-group";

        const nameContainer = document.createElement("div");
        nameContainer.className = "col-md-12";

        nameFormGroup.appendChild(nameLabel);
        nameFormGroup.appendChild(nameInput);
        nameContainer.appendChild(nameFormGroup);

        // password label
        const passwordLabel = document.createElement("label");
        passwordLabel.setAttribute("for", "description");
        passwordLabel.className = "form-label";
        passwordLabel.innerText = "Password";

        // first password input box
        const firstPassInput = document.createElement("input");
        const firstPassFormGroup = document.createElement("div");
        const firstPassContainer = document.createElement("div");

        firstPassInput.type = "password";
        firstPassInput.className = "form-control";
        firstPassInput.placeholder = "New Password";
        firstPassInput.id = "account-first-pass";
        firstPassFormGroup.className = "form-group";
        firstPassContainer.className = "col-md-6";

        firstPassFormGroup.appendChild(firstPassInput);
        firstPassContainer.appendChild(firstPassFormGroup);

        // confirm password input box
        const secondPassInput = document.createElement("input");
        const secondPassFormGroup = document.createElement("div");
        const secondPassContainer = document.createElement("div");

        secondPassInput.type = "password";
        secondPassInput.className = "form-control";
        secondPassInput.placeholder = "Confirm Password";
        secondPassInput.id = "account-second-pass";
        secondPassFormGroup.className = "form-group";
        secondPassContainer.className = "col-md-6";

        secondPassFormGroup.appendChild(secondPassInput);
        secondPassContainer.appendChild(secondPassFormGroup);

        // new password container
        const newPasswordRow = document.createElement("div");

        newPasswordRow.className = "row justify-content-center pb-2 mb-4";

        newPasswordRow.appendChild(passwordLabel);
        newPasswordRow.appendChild(firstPassContainer);
        newPasswordRow.appendChild(secondPassContainer);

        // update button
        const updateBtn = document.createElement("button");
        updateBtn.type = "submit";
        updateBtn.id = "update-button";
        updateBtn.className =
            "btn btn-dark text-center btn-outline-light w-100";
        updateBtn.innerText = "Update Information";

        const updateFormGroup = document.createElement("div");
        updateFormGroup.className = "form-group";

        const updateContainer = document.createElement("div");
        updateContainer.className = "col-md-12";

        updateFormGroup.appendChild(updateBtn);
        updateContainer.appendChild(updateFormGroup);

        // form
        const form = document.createElement("form");
        form.appendChild(emailContainer);
        form.appendChild(nameContainer);
        form.appendChild(newPasswordRow);
        form.appendChild(updateContainer);

        // form container
        const formContainer = document.createElement("div");
        formContainer.className = "col-md-6";

        formContainer.appendChild(title);
        formContainer.appendChild(hr);
        formContainer.appendChild(form);

        // left and right column gaps
        const leftColGap = document.createElement("div");
        leftColGap.className = "col-md-3";

        const rightColGap = document.createElement("div");
        rightColGap.className = "col-md-3";

        // page container row
        const pgContainerRow = document.createElement("div");
        pgContainerRow.className = "row justify-content-center pb-2 pt-2";
        pgContainerRow.appendChild(leftColGap);
        pgContainerRow.appendChild(formContainer);
        pgContainerRow.appendChild(rightColGap);

        // page container
        const pgContainer = document.createElement("div");
        pgContainer.className = "container-md-12";
        pgContainer.appendChild(pgContainerRow);

        // actual page
        const page = document.createElement("div");
        page.id = "settings";
        page.className = "container-md justify-content-center feed";

        page.appendChild(pgContainer);

        return page;
    },
};
