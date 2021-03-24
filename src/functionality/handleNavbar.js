export const handleNavbar = (api) => {
    const token = localStorage.getItem("token");
    api.getAPIRequestTokenQuery("user", {}, token)
        .then((data) => {
            if (data.status === 400) {
                createAlert("Malformed Request", "danger");
            } else if (data.status === 403) {
                createAlert("Invalid Auth Token", "danger");
            } else if (data.status === 404) {
                createAlert("User Not Found", "danger");
            } else if (data.status === 200) {
                data.json().then((result) => {
                    const navbarProfile = document.getElementById(
                        "navbar-profile"
                    );
                    const navbarSignout = document.getElementById(
                        "navbar-signout"
                    );
                    const navbarSearchBtn = document.getElementById(
                        "navbar-searchbtn"
                    );
                    const navbarSearchbar = document.getElementById(
                        "navbar-searchbar"
                    );

                    // set profile navbar link
                    navbarProfile.href = `#/profile/${result.username}`;

                    // remove token from localstorage on signout
                    navbarSignout.addEventListener("click", () => {
                        localStorage.removeItem("token");
                    });

                    // set navbar signout link
                    navbarSignout.href = `#/login`;

                    // if there's text in the searchbar,
                    // navigate to their profile when search button is clicked
                    navbarSearchBtn.addEventListener("click", (e) => {
                        e.preventDefault();
                        if (navbarSearchbar.value.length != 0) {
                            window.location.hash = `#/profile/${navbarSearchbar.value}`;
                        }
                    });
                });
            }
        })
        .catch((error) => {
            createAlert("Error Retrieving User Profile", "danger");
            console.log(error);
        });
};
