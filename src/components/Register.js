const Register = {
    render: () => {
        // title
        const titleRow = document.createElement("div");
        const titleContainer = document.createElement("div");
        const titleText = document.createElement("div");

        titleText.className = "display-4";
        titleText.innerText = "LinkedPic";
        titleContainer.className = "col-10 text-center mt-5 mb-4";
        titleRow.className = "row justify-content-center";

        titleContainer.appendChild(titleText);
        titleRow.appendChild(titleContainer);

        // smaller title/description
        const descriptionRow = document.createElement("div");
        const descriptionContainer = document.createElement("div");
        const descriptionText = document.createElement("div");

        descriptionRow.className = "row justify-content-center";
        descriptionContainer.className = "col-10 mb-2";
        descriptionText.className = "h5";
        descriptionText.innerText = "Create an Account";

        descriptionContainer.appendChild(descriptionText);
        descriptionRow.appendChild(descriptionContainer);

        // firstname input
        const firstnameInput = document.createElement("input");
        const firstnameFormGroup = document.createElement("div");
        const firstnameContainer = document.createElement("div");

        firstnameInput.type = "text";
        firstnameInput.className = "form-control";
        firstnameInput.id = "firstnameinput";
        firstnameInput.placeholder = "First Name";
        firstnameFormGroup.className = "form-group";
        firstnameContainer.className = "col-5";

        firstnameFormGroup.appendChild(firstnameInput);
        firstnameContainer.appendChild(firstnameFormGroup);

        // lastname input
        const lastnameInput = document.createElement("input");
        const lastnameFormGroup = document.createElement("div");
        const lastnameContainer = document.createElement("div");

        lastnameInput.type = "text";
        lastnameInput.className = "form-control";
        lastnameInput.id = "lastnameinput";
        lastnameInput.placeholder = "Last Name";
        lastnameFormGroup.className = "form-group";
        lastnameContainer.className = "col-5";

        lastnameFormGroup.appendChild(lastnameInput);
        lastnameContainer.appendChild(lastnameFormGroup);

        // full name container
        const fullnameRow = document.createElement("div");

        fullnameRow.className = "row justify-content-center pb-2";

        fullnameRow.appendChild(firstnameContainer);
        fullnameRow.appendChild(lastnameContainer);

        // email
        const emailRow = document.createElement("div");
        const emailContainer = document.createElement("div");
        const emailFormGroup = document.createElement("div");
        const emailInput = document.createElement("input");

        emailInput.type = "email";
        emailInput.className = "form-control";
        emailInput.id = "emailinput";
        emailInput.placeholder = "Email Address";
        emailFormGroup.className = "form-group";
        emailContainer.className = "col-10";
        emailRow.className = "row justify-content-center pb-2 pt-2";

        emailFormGroup.appendChild(emailInput);
        emailContainer.appendChild(emailFormGroup);
        emailRow.appendChild(emailContainer);

        // username input
        const usernameRow = document.createElement("div");
        const usernameContainer = document.createElement("div");
        const usernameFormGroup = document.createElement("div");
        const usernameInput = document.createElement("input");

        usernameInput.type = "text";
        usernameInput.className = "form-control";
        usernameInput.id = "usernameinput";
        usernameInput.placeholder = "Username";
        usernameFormGroup.className = "form-group";
        usernameContainer.className = "col-10";
        usernameRow.className = "row justify-content-center pb-2 pt-2";

        usernameFormGroup.appendChild(usernameInput);
        usernameContainer.appendChild(usernameFormGroup);
        usernameRow.appendChild(usernameContainer);

        // password input 1
        const firstPasswordRow = document.createElement("div");
        const firstPasswordContainer = document.createElement("div");
        const firstPasswordFormGroup = document.createElement("div");
        const firstPasswordInput = document.createElement("input");

        firstPasswordInput.type = "password";
        firstPasswordInput.className = "form-control";
        firstPasswordInput.id = "passwordinput1";
        firstPasswordInput.placeholder = "Password";
        firstPasswordFormGroup.className = "form-group";
        firstPasswordContainer.className = "col-10";
        firstPasswordRow.className = "row justify-content-center pb-2 pt-2";

        firstPasswordFormGroup.appendChild(firstPasswordInput);
        firstPasswordContainer.appendChild(firstPasswordFormGroup);
        firstPasswordRow.appendChild(firstPasswordContainer);

        // password input 2
        const secondPasswordRow = document.createElement("div");
        const secondPasswordContainer = document.createElement("div");
        const secondPasswordFormGroup = document.createElement("div");
        const secondPasswordInput = document.createElement("input");

        secondPasswordInput.type = "password";
        secondPasswordInput.className = "form-control";
        secondPasswordInput.id = "passwordinput2";
        secondPasswordInput.placeholder = "Confirm Password";
        secondPasswordFormGroup.className = "form-group";
        secondPasswordContainer.className = "col-10";
        secondPasswordRow.className = "row justify-content-center pb-2 pt-2";

        secondPasswordFormGroup.appendChild(secondPasswordInput);
        secondPasswordContainer.appendChild(secondPasswordFormGroup);
        secondPasswordRow.appendChild(secondPasswordContainer);

        // login button
        const registerBtnRow = document.createElement("div");
        const registerBtnContainer = document.createElement("div");
        const registerBtn = document.createElement("a");

        registerBtnRow.className = "row justify-content-center pb-2 pt-2";
        registerBtnContainer.className = "col-10 text-center";
        registerBtn.id = "registerbtn";
        registerBtn.type = "submit";
        registerBtn.className = "btn btn-primary w-100";
        registerBtn.innerText = "Register";

        registerBtnContainer.appendChild(registerBtn);
        registerBtnRow.appendChild(registerBtnContainer);

        // horizontal rule
        const hr = document.createElement("hr");

        // description for register button
        const loginDescriptionRow = document.createElement("div");
        const loginDescriptionContainer = document.createElement("div");
        const loginDescriptionText = document.createElement("p");

        loginDescriptionRow.className = "row justify-content-center pt-2";
        loginDescriptionContainer.className = "col-10 text-center";
        loginDescriptionText.innerText = "Already have an account?";

        loginDescriptionContainer.appendChild(loginDescriptionText);
        loginDescriptionRow.appendChild(loginDescriptionContainer);

        // log in button
        const loginBtnRow = document.createElement("div");
        loginBtnRow.className = "row justify-content-center pb-2";
        const loginBtnContainer = document.createElement("div");
        loginBtnContainer.className = "col-10 text-center";
        const loginBtn = document.createElement("a");
        loginBtn.id = "login-button";
        loginBtn.href = "#/login";
        loginBtn.type = "button";
        loginBtn.className = "btn btn-primary";
        loginBtn.innerText = "Log In";

        loginBtnContainer.appendChild(loginBtn);
        loginBtnRow.appendChild(loginBtnContainer);

        // registration form
        const registerForm = document.createElement("form");
        registerForm.appendChild(titleRow);
        registerForm.appendChild(descriptionRow);
        registerForm.appendChild(fullnameRow);
        registerForm.appendChild(emailRow);
        registerForm.appendChild(usernameRow);
        registerForm.appendChild(firstPasswordRow);
        registerForm.appendChild(secondPasswordRow);
        registerForm.appendChild(registerBtnRow);
        registerForm.appendChild(hr);
        registerForm.appendChild(loginDescriptionRow);
        registerForm.appendChild(loginBtnRow);

        // container for registration form
        const registerFormContainer = document.createElement("div");
        registerFormContainer.className =
            "col-sm-5 col-md-4 col-lg-4 m-0 p-0 min-vh-100 no-gutters registration-form";

        registerFormContainer.appendChild(registerForm);

        // container for background view
        const bgViewContainer = document.createElement("div");
        bgViewContainer.className =
            "col-sm-7 col-md-8 col-lg-8 p-0 visible-lg-block hidden-lg";

        // page container row
        const pgContainerRow = document.createElement("div");
        pgContainerRow.id = "register-form";
        pgContainerRow.className = "row justify-content-center m-0 p-0";

        pgContainerRow.appendChild(bgViewContainer);
        pgContainerRow.appendChild(registerFormContainer);

        // page container
        const pgContainer = document.createElement("div");
        pgContainer.className = "container-fluid m-0 p-0";
        pgContainer.appendChild(pgContainerRow);

        return pgContainer;
    },
};
