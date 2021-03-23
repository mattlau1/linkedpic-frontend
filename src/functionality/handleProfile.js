import { createAlert } from "./createAlert.js";

export const handleProfile = (api) => {
    const token = localStorage.getItem("token");
    const currPath = window.location.hash;

    // get current profile username from url
    const user = currPath.substring(currPath.lastIndexOf("/") + 1);

    const profile = document.getElementById("profile");

    // get user information
    api.getAPIRequestTokenQuery("user", { username: user }, token)
        .then((data) => {
            if (data.status === 400) {
                createAlert("Malformed Request", "danger");
            } else if (data.status === 403) {
                createAlert("Invalid Auth Token", "danger");
            } else if (data.status === 404) {
                createAlert("User Not Found", "danger");
            } else if (data.status === 200) {
                data.json().then((result) => {
                    console.log(result);
                    // username of profile
                    const usernameText = document.createElement("div");
                    usernameText.className = "display-1 text-center";
                    usernameText.innerText = result.username;

                    const usernameTextContainer = document.createElement("div");
                    usernameTextContainer.className = "col md-12";
                    usernameTextContainer.appendChild(usernameText);

                    // statistics: posts, followers, following
                    const leftColGap = document.createElement("div");
                    leftColGap.className = "col-md-2";

                    // posts statistic
                    const postStatContainer = document.createElement("div");
                    postStatContainer.className = "col-md-2";

                    const postStat = document.createElement("div");
                    postStat.className = "p2 profile-info text-center";
                    postStat.innerText = `${result.posts.length} Posts`;
                    result.posts.length === 1
                        ? (postStat.innerText = `${result.posts.length} Post`)
                        : (postStat.innerText = `${result.posts.length} Posts`);

                    postStatContainer.appendChild(postStat);

                    // followers statistic
                    const followersStatContainer = document.createElement(
                        "div"
                    );
                    followersStatContainer.className = "col-md-4";

                    const followersStat = document.createElement("div");
                    followersStat.className = "p2 profile-info text-center";
                    result.followed_num === 1
                        ? (followersStat.innerText = `${result.followed_num} Follower`)
                        : `${result.followed_num} Followers`;
                    followersStat.id = "followers";

                    followersStatContainer.appendChild(followersStat);

                    // following statistic
                    const followingStatContainer = document.createElement(
                        "div"
                    );
                    followingStatContainer.className = "col-md-2";

                    const followingStat = document.createElement("div");
                    followingStat.className = "p2 profile-info text-center";
                    followingStat.innerText = `${result.following.length} Following`;

                    followingStatContainer.appendChild(followingStat);

                    // stat container
                    const statContainer = document.createElement("div");
                    statContainer.className = "row md-12";

                    statContainer.appendChild(leftColGap);
                    statContainer.appendChild(postStatContainer);
                    statContainer.appendChild(followersStatContainer);
                    statContainer.appendChild(followingStatContainer);

                    // horizontal rule
                    const hr = document.createElement("hr");

                    const postsTitle = document.createElement("div");
                    postsTitle.className = "display-6 posts";
                    postsTitle.innerText = "Posts";

                    const postsTitleContainer = document.createElement("div");
                    postsTitleContainer.className = "row md-12";
                    postsTitleContainer.appendChild(postsTitle);

                    // post images
                    const postContainer = document.createElement("div");
                    postContainer.id = "posts";
                    postContainer.className = "row md-12 posts";

                    addProfileImages(result.posts, api, token);

                    // page container
                    const pageRowContainer = document.createElement("div");
                    pageRowContainer.className = "row md-12";

                    pageRowContainer.appendChild(usernameTextContainer);
                    pageRowContainer.appendChild(statContainer);
                    pageRowContainer.appendChild(hr);
                    pageRowContainer.appendChild(postsTitleContainer);
                    pageRowContainer.appendChild(postContainer);

                    const pageContainer = document.createElement("div");
                    pageContainer.className = "container-md-12";

                    pageContainer.appendChild(pageRowContainer);

                    profile.appendChild(pageContainer);
                });
            }
        })
        .catch((error) => {
            createAlert("Error Loading Profile", "danger");
            console.log(error);
        });
};

const addProfileImages = (postIds, api, token) => {
    postIds.map((postId) => {
        api.getAPIRequestTokenQuery("post", { id: postId }, token)
            .then((data) => {
                if (data.status === 400) {
                    createAlert("Malformed Request", "danger");
                } else if (data.status === 403) {
                    createAlert("Invalid Auth Token", "danger");
                } else if (data.status === 404) {
                    createAlert(`Post ${postId} Not Found`, "danger");
                } else if (data.status === 200) {
                    data.json().then((result) => {
                        const postContainer = document.getElementById("posts");
                        console.log(result);

                        const imgContainer = document.createElement("div");
                        imgContainer.className =
                            "col-md-3 col-sm-8 mb-5 px-1 text-center";

                        const img = document.createElement("img");
                        img.id = "post-img";
                        img.src = `data:image/jpg;base64,${result.src}`;

                        imgContainer.appendChild(img);

                        postContainer.appendChild(imgContainer);
                    });
                }
            })
            .catch((error) => {
                createAlert("Error displaying likes", "danger");
                console.log(error);
            });
    });
};
