const Navbar = {
    render: () => {
        console.log("hi");
        const navbar = document.createElement("nav");
        navbar.className = "navbar navbar-expand-lg navbar-dark bg-dark";
        navbar.innerHTML = `
        <div class="container-fluid">
            <a class="navbar-brand" href="#">LinkedPic</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#"><i class="fas fa-home"></i>Home</a></li>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#"><i class="fas fa-camera"></i>Post Image</a>
                    </li>
                    <li class="nav-item">
                        <form class="d-flex nav-link">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </li>
                </ul>
                <form class="d-flex">
                    <a id="profilelink" class="nav-link rounded-circle" aria-current="page" href="#"><i
                            class="fas fa-user"></i></a>
                </form>
            </div>
        </div>
        `;
        return navbar;
    },
};

{
    /* <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">LinkedPic</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="#"><i class="fas fa-home"></i>Home</a></li>
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="#"><i class="fas fa-camera"></i>Post Image</a>
                </li>
                <li class="nav-item">
                    <form class="d-flex nav-link">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </li>
            </ul>
            <form class="d-flex">
                <a id="profilelink" class="nav-link rounded-circle" aria-current="page" href="#"><i
                        class="fas fa-user"></i></a>
            </form>
        </div>
    </div>
</nav> */
}
