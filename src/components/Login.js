const Login = {
    render: () => {
        // title
        const titleRow = document.createElement("div");
        titleRow.className = "row justify-content-center";

        const titleContainer = document.createElement("div");
        titleContainer.className = "col-10 text-center mt-5 mb-4";

        const titleText = document.createElement("div");
        titleText.className = "display-4";
        titleText.innerText = "LinkedPic";

        titleContainer.appendChild(titleText);
        titleRow.appendChild(titleContainer);

        // smaller title/description
        const descriptionRow = document.createElement("div");
        descriptionRow.className = "row justify-content-center";

        const descriptionContainer = document.createElement("div");
        descriptionContainer.className = "col-10 mb-2";

        const descriptionText = document.createElement("div");
        descriptionText.className = "h5";
        descriptionText.innerText = "Log In";

        descriptionContainer.appendChild(descriptionText);
        descriptionRow.appendChild(descriptionContainer);

        // username input
        const usernameRow = document.createElement("div");
        usernameRow.className = "row justify-content-center pb-2 pt-2";
        const usernameContainer = document.createElement("div");
        usernameContainer.className = "col-10";
        const usernameFormGroup = document.createElement("div");
        usernameFormGroup.className = "form-group";
        const usernameInput = document.createElement("input");
        usernameInput.type = "text";
        usernameInput.className = "form-control";
        usernameInput.id = "usernameinput";
        usernameInput.placeholder = "Username";

        usernameFormGroup.appendChild(usernameInput);
        usernameContainer.appendChild(usernameFormGroup);
        usernameRow.appendChild(usernameContainer);

        // password input
        const passwordRow = document.createElement("div");
        passwordRow.className = "row justify-content-center pb-2 pt-2";
        const passwordContainer = document.createElement("div");
        passwordContainer.className = "col-10";
        const passwordFormGroup = document.createElement("div");
        passwordFormGroup.className = "form-group";
        const passwordInput = document.createElement("input");
        passwordInput.type = "password";
        passwordInput.className = "form-control";
        passwordInput.id = "passwordinput";
        passwordInput.placeholder = "Password";

        passwordFormGroup.appendChild(passwordInput);
        passwordContainer.appendChild(passwordFormGroup);
        passwordRow.appendChild(passwordContainer);

        // login button
        const loginBtnRow = document.createElement("div");
        loginBtnRow.className = "row justify-content-center pb-2 pt-2";
        const loginBtnContainer = document.createElement("div");
        loginBtnContainer.className = "col-10 text-center";
        const loginBtn = document.createElement("a");
        loginBtn.id = "loginbtn";
        loginBtn.type = "submit";
        loginBtn.className = "btn btn-primary w-100";
        loginBtn.innerText = "Log In";

        loginBtnContainer.appendChild(loginBtn);
        loginBtnRow.appendChild(loginBtnContainer);

        // horizontal rule
        const hr = document.createElement("hr");

        // description for register button
        const registerDescriptionRow = document.createElement("div");
        registerDescriptionRow.className = "row justify-content-center pt-2";
        const registerDescriptionContainer = document.createElement("div");
        registerDescriptionContainer.className = "col-10 text-center";
        const registerDescriptionText = document.createElement("p");
        registerDescriptionText.innerText = "Need to make an account?";

        registerDescriptionContainer.appendChild(registerDescriptionText);
        registerDescriptionRow.appendChild(registerDescriptionContainer);

        // register button
        const registerBtnRow = document.createElement("div");
        registerBtnRow.className = "row justify-content-center pb-2";
        const registerBtnContainer = document.createElement("div");
        registerBtnContainer.className = "col-10 text-center";
        const registerBtn = document.createElement("a");
        registerBtn.id = "register-button";
        registerBtn.href = "#/register";
        registerBtn.type = "button";
        registerBtn.className = "btn btn-primary";
        registerBtn.innerText = "Register";

        registerBtnContainer.appendChild(registerBtn);
        registerBtnRow.appendChild(registerBtnContainer);

        // form
        const loginForm = document.createElement("form");
        loginForm.appendChild(titleRow);
        loginForm.appendChild(descriptionRow);
        loginForm.appendChild(usernameRow);
        loginForm.appendChild(passwordRow);
        loginForm.appendChild(loginBtnRow);
        loginForm.appendChild(hr);
        loginForm.appendChild(registerDescriptionRow);
        loginForm.appendChild(registerBtnRow);

        // container for login form
        const loginFormContainer = document.createElement("div");
        loginFormContainer.className =
            "col-sm-5 col-md-4 col-lg-4 m-0 p-0 min-vh-100 no-gutters registration-form";

        loginFormContainer.appendChild(loginForm);

        // container for background view
        const bgViewContainer = document.createElement("div");
        bgViewContainer.className =
            "col-sm-7 col-md-8 col-lg-8 p-0 visible-lg-block hidden-lg";

        // page container row
        const pgContainerRow = document.createElement("div");
        pgContainerRow.id = "login-form";
        pgContainerRow.className = "row justify-content-center m-0 p-0";

        pgContainerRow.appendChild(bgViewContainer);
        pgContainerRow.appendChild(loginFormContainer);

        // page container
        const pgContainer = document.createElement("div");
        pgContainer.className = "container-fluid m-0 p-0";
        pgContainer.appendChild(pgContainerRow);

        return pgContainer;
    },
};
