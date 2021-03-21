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

            <div id="feed" class="container-md justify-content-center">
                <div class="row md-12">
                    <div class="col-md-3"></div>
                    <div class="col-md-6">
                        <img id="postauthorimg" class="rounded-circle md-8" height="50px"
                            src="https://raw.githubusercontent.com/mattlau1/jas/main/jas.png">
                        <p id="postauthorname" class="d-inline">Author Name</p>

                    </div>
                    <div class="col-md-3"></div>
                </div>
                <div class="row md-12">
                    <div class="col-md-3"></div>
                    <div id="postimg" class="col-md-6 p-0">
                        <img id="postimg" class="rounded" width="100%"
                            src="../bg4.jpg">
                    </div>
                    <div class="col-md-3"></div>
                </div>
                <div class="row md-12 p-0">
                    <div class="col-md-3 p-0"></div>
                    <div class="col-md-6 p-0">
                        <div class="container-fluid p-0">
                            <div class="row p-0">
                                <div class="col md-2 ">
                                    <button class="btn btn-primary"><i class="fas fa-heart"></i></button>
                                    <button class="btn btn-primary"><i class="fas fa-comment"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3"></div>
                </div>
            </div>
        `;
    },
};
