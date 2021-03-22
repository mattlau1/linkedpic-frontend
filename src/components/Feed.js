const feed = {
    render: () => {
        return `
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
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
        </nav>

        <div id="feed" class="container-md justify-content-center"></div>

        <div id="alert-container" class="container-fluid m-0 p-0 position-absolute fixed-bottom">
            <div class="row justify-content-center">
                <div id="alert-area" class="col-5 text-center mt-5 mb-0"></div>
            </div>
        </div>

        `;
    },
};
