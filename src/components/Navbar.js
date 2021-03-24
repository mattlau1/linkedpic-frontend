const Navbar = {
    render: () => {
        // navbar container
        const navbar = document.createElement("nav");
        navbar.className =
            "navbar navbar-expand-lg navbar-dark bg-dark d-lg-flex align-items-center";

        const navbarContainer = document.createElement("div");
        navbarContainer.className = "container-fluid";

        // navbar brand
        const brand = document.createElement("a");
        brand.className = "navbar-brand";
        brand.href = "#/feed";
        brand.innerText = "LinkedPic";

        // navbar toggler
        const toggler = document.createElement("button");
        toggler.className = "navbar-toggler me-auto";
        toggler.type = "button";
        toggler.setAttribute("data-bs-toggle", "collapse");
        toggler.setAttribute("data-bs-target", "#navbarSupportedContent");
        toggler.setAttribute("aria-controls", "navbarSupportedContent");
        toggler.setAttribute("aria-expanded", "false");
        toggler.setAttribute("aria-label", "Toggle navigation");

        const togglerIcon = document.createElement("span");
        togglerIcon.className = "navbar-toggler-icon";
        toggler.appendChild(togglerIcon);

        const leftNav = document.createElement("div");
        leftNav.className = "collapse navbar-collapse";
        leftNav.id = "navbarSupportedContent";

        const leftNavItems = document.createElement("ul");
        leftNavItems.className =
            "navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-grow-1";

        // home navbar item
        const homeNavItem = document.createElement("li");
        homeNavItem.className = "nav-item";

        const homeNavLink = document.createElement("a");
        homeNavLink.className = "nav-link";
        homeNavLink.setAttribute("aria-current", "page");
        homeNavLink.href = "#/feed";

        const homeIcon = document.createElement("i");
        homeIcon.className = "fas fa-home";

        const homeLabel = document.createElement("span");
        homeLabel.innerText = "Home";

        homeNavLink.appendChild(homeIcon);
        homeNavLink.appendChild(homeLabel);
        homeNavItem.appendChild(homeNavLink);

        // post image/upload image navbar item
        const uploadNavItem = document.createElement("li");
        uploadNavItem.className = "nav-item";

        const uploadNavLink = document.createElement("a");
        uploadNavLink.className = "nav-link";
        uploadNavLink.setAttribute("aria-current", "page");
        uploadNavLink.href = "#/upload";

        const uploadIcon = document.createElement("i");
        uploadIcon.className = "fas fa-camera";

        const uploadLabel = document.createElement("span");
        uploadLabel.innerText = "Post Image";

        uploadNavLink.appendChild(uploadIcon);
        uploadNavLink.appendChild(uploadLabel);
        uploadNavItem.appendChild(uploadNavLink);

        // searchbar navbar item
        const searchNavItem = document.createElement("li");
        searchNavItem.className = "nav-item";

        const searchForm = document.createElement("form");
        searchForm.className = "d-flex nav-link mb-0";

        const searchbar = document.createElement("input");
        searchbar.className = "form-control me-2";
        searchbar.id = "navbar-searchbar";
        searchbar.type = "search";
        searchbar.placeholder = "Search User (case-sensitive)";
        searchbar.setAttribute("aria-label", "Search");

        const searchBtn = document.createElement("button");
        searchBtn.className = "btn btn-outline-light";
        searchBtn.id = "navbar-searchbtn";
        searchBtn.type = "submit";
        searchBtn.innerText = "Search";

        searchForm.appendChild(searchbar);
        searchForm.appendChild(searchBtn);

        searchNavItem.appendChild(searchForm);

        // right navbar
        const rightNav = document.createElement("ul");
        rightNav.className = "navbar-nav me-auto";

        const rightNavItems = document.createElement("div");
        rightNavItems.className = "collapse navbar-collapse";
        rightNavItems.id = "navbarSupportedContent";

        // profile navbar item
        const profileNavItem = document.createElement("li");
        profileNavItem.className = "nav-item";

        const profileNavLink = document.createElement("a");
        profileNavLink.id = "navbar-profile";
        profileNavLink.className = "nav-link";
        profileNavLink.setAttribute("aria-current", "page");
        profileNavLink.href = "#/feed";

        const profileIcon = document.createElement("i");
        profileIcon.className = "fas fa-user";

        const profileLabel = document.createElement("span");
        profileLabel.innerText = "Profile";

        profileNavLink.appendChild(profileIcon);
        profileNavLink.appendChild(profileLabel);
        profileNavItem.appendChild(profileNavLink);

        // sign out navbar item
        const signOutNavItem = document.createElement("li");
        signOutNavItem.className = "nav-item";

        const signOutNavLink = document.createElement("a");
        signOutNavLink.id = "navbar-signout";
        signOutNavLink.className = "nav-link";
        signOutNavLink.setAttribute("aria-current", "page");
        signOutNavLink.href = "#/login";

        const signOutIcon = document.createElement("i");
        signOutIcon.className = "fas fa-sign-out-alt";

        const signOutLabel = document.createElement("span");
        signOutLabel.innerText = "Sign Out";

        signOutNavLink.appendChild(signOutIcon);
        signOutNavLink.appendChild(signOutLabel);
        signOutNavItem.appendChild(signOutNavLink);

        // stick everything together
        leftNavItems.appendChild(homeNavItem);
        leftNavItems.appendChild(uploadNavItem);
        leftNavItems.appendChild(searchNavItem);
        leftNav.appendChild(leftNavItems);

        rightNavItems.appendChild(profileNavItem);
        rightNavItems.appendChild(signOutNavItem);
        rightNav.appendChild(rightNavItems);

        navbarContainer.appendChild(brand);
        navbarContainer.appendChild(toggler);
        navbarContainer.appendChild(leftNav);
        navbarContainer.appendChild(rightNav);
        navbar.appendChild(navbarContainer);

        return navbar;
    },
};
