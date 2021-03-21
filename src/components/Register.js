const register = {
    render: () => {
        return `
        <div class="container-fluid m-0 p-0">
        <div id="register-form" class="row justify-content-center m-0 p-0">
            <div class="col-sm-7 col-md-8 col-lg-8 p-0 visible-lg-block hidden-lg"></div>
            <div class="col-sm-5 col-md-4 col-lg-4 m-0 p-0 min-vh-100 no-gutters" id="registration-form">
                <form>
                    <div class="row justify-content-center">
                        <div class="col-10 text-center mt-5 mb-4">
                            <div class="display-4">LinkedPic</div>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-10 mb-2">
                            <div class="h5">Create an Account</div>
                        </div>
                    </div>
                    <div class="row justify-content-center pb-2">
                        <div class="col-5">
                            <div class="form-group">
                                <input type="text" class="form-control" id="firstnameinput" placeholder="First Name">
                            </div>
                        </div>
                        <div class="col-5">
                            <div class="form-group">
                                <input type="text" class="form-control" id="lastnameinput" placeholder="Last Name">
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center pb-2 pt-2">
                        <div class="col-10">
                            <div class="form-group">
                                <input type="email" class="form-control" id="emailinput" placeholder="Email Address">
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center pb-2 pt-2">
                        <div class="col-10">
                            <div class="form-group">
                                <input type="text" class="form-control" id="usernameinput" placeholder="Username">
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center pb-2 pt-2">
                        <div class="col-10">
                            <div class="form-group">
                                <input type="password" class="form-control" id="passwordinput1" placeholder="Password">
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center pb-2 pt-2">
                        <div class="col-10">
                            <div class="form-group">
                                <input type="password" class="form-control" id="passwordinput2"
                                    placeholder="Confirm Password">
                            </div>
                        </div>
                    </div>

                    <div class="row justify-content-center pb-2 pt-2">
                        <div class="col-10 text-center">
                            <button id="registerbtn" type="submit" class="btn btn-primary w-100">Register</button>
                        </div>
                    </div>
                    <hr>
                    <div class="row justify-content-center pt-2">
                        <div class="col-10 text-center">
                            <p>Already Registered?</p>
                        </div>
                    </div>
                    <div class="row justify-content-center pb-2">
                        <div class="col-10 text-center">
                            <a id="login-button" href="#/login" type="button" class="btn btn-primary">Log in</a>
                        </div>
                    </div>
                </form>
            </div>
            <div class="container m-0 p-0 position-absolute fixed-bottom">
                <div class="row justify-content-center">
                    <div id="alert-area" class="col-10 text-center mt-5 mb-4"></div>
                </div>
            </div>
        </div>
    </div>
    `;
    },
};
