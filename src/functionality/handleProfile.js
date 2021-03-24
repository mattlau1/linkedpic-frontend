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
                        : (followersStat.innerText = `${result.followed_num} Followers`);

                    followersStatContainer.appendChild(followersStat);

                    // following statistic
                    const followingStatContainer = document.createElement(
                        "div"
                    );
                    followingStatContainer.className = "col-md-2";

                    const followingStat = document.createElement("div");
                    followingStat.id = "following";
                    followingStat.setAttribute("data-bs-toggle", "modal");
                    followingStat.setAttribute("data-bs-target", "#modal");
                    followingStat.className =
                        "p2 profile-info text-center fw-bold";
                    followingStat.innerText = `${result.following.length} Following`;

                    setFollowingModal(result.following, api, token);

                    followingStatContainer.appendChild(followingStat);

                    // stat container
                    const statContainer = document.createElement("div");
                    statContainer.className = "row md-12";
                    statContainer.id = "stat-container";

                    statContainer.appendChild(leftColGap);
                    statContainer.appendChild(postStatContainer);
                    statContainer.appendChild(followersStatContainer);
                    statContainer.appendChild(followingStatContainer);

                    // follow button
                    const followBtnContainer = document.createElement("div");
                    followBtnContainer.className = "col md-12 text-center";

                    const followBtn = document.createElement("button");
                    followBtn.className = "btn btn-dark d-none";
                    followBtn.type = "button";
                    followBtn.innerText = "Follow";

                    // unfollow button
                    const unfollowBtn = document.createElement("button");
                    unfollowBtn.className = "btn btn-dark d-none";
                    unfollowBtn.type = "button";
                    unfollowBtn.innerText = "Unfollow";

                    handleFollowBtns(followBtn, unfollowBtn, api, token);

                    followBtnContainer.appendChild(followBtn);
                    followBtnContainer.appendChild(unfollowBtn);

                    // horizontal rule
                    const hr = document.createElement("hr");

                    const postsTitle = document.createElement("div");
                    postsTitle.className = "display-6 posts";
                    postsTitle.innerText = "Posts";
                    if (result.posts.length === 0) {
                        postsTitle.innerText = `${result.username} has no posts`;
                    }

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
                    pageRowContainer.appendChild(followBtnContainer);
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

// adds profile images to page, given postids
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

                        const imgContainer = document.createElement("div");
                        imgContainer.className =
                            "col-md-3 col-sm-12 mb-1 px-1 text-center";

                        const img = document.createElement("img");
                        img.id = "post-img";
                        img.src = `data:image/jpg;base64,${result.src}`;

                        const imgDescription = document.createElement("p");
                        imgDescription.innerText = result.meta.description_text;

                        imgContainer.appendChild(img);
                        imgContainer.appendChild(imgDescription);
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

// sets modal information to list of users that the user is following
const setFollowingModal = (userIds, api, token) => {
    const header = document.getElementById("main-modal");
    const body = document.getElementById("modal-text");
    const likeBtn = document.getElementById("like-post-btn");
    const modal = document.querySelector(".modal-dialog");
    likeBtn.style.display = "none";
    modal.classList.remove("modal-lg");

    // clear body of modal
    body.innerText = "";

    // for each user id, append user id's username to modal body
    userIds.map((user) => {
        api.getAPIRequestTokenQuery("user", { id: user }, token)
            .then((data) => {
                if (data.status === 400) {
                    createAlert("Malformed Request", "danger");
                } else if (data.status === 403) {
                    createAlert("Invalid Auth Token", "danger");
                } else if (data.status === 404) {
                    createAlert("User Not Found", "danger");
                } else if (data.status === 200) {
                    data.json().then((result) => {
                        const userContainer = document.createElement("p");
                        userContainer.innerText = result.username;
                        body.appendChild(userContainer);
                    });
                }
            })
            .catch((error) => {
                createAlert("Error displaying following", "danger");
                console.log(error);
            });
    });

    // change header
    header.innerText = `Following`;
};

// handles the follow button - allows current user to follow another user from
// their profile page
const handleFollowBtns = (followBtn, unfollowBtn, api, token) => {
    const currPath = window.location.hash;
    const username = currPath.substring(currPath.lastIndexOf("/") + 1);

    // get information of current user and profile they are looking at
    // if user is following the current user then show unfollow button
    // also only show follow button if they are not looking at their own page

    // first get information from profile
    api.getAPIRequestTokenQuery("user", { username: username }, token)
        .then((data) => {
            if (data.status === 400) {
                createAlert("Malformed Request", "danger");
            } else if (data.status === 403) {
                createAlert("Invalid Auth Token", "danger");
            } else if (data.status === 404) {
                createAlert(`User Not Found`, "danger");
            } else if (data.status === 200) {
                // get information for logged in user
                data.json().then((profile) => {
                    api.getAPIRequestTokenQuery("user", {}, token)
                        .then((data) => {
                            if (data.status === 200) {
                                data.json().then((currUser) => {
                                    const currFollowing = currUser.following;
                                    const profileId = profile.id;

                                    // add functionality to follow/unfollow buttons
                                    setUnfollowButton(
                                        followBtn,
                                        unfollowBtn,
                                        username,
                                        api,
                                        token
                                    );
                                    setFollowButton(
                                        followBtn,
                                        unfollowBtn,
                                        username,
                                        api,
                                        token
                                    );

                                    // show button depending on following
                                    // status
                                    if (currFollowing.includes(profileId)) {
                                        // user is currently following this user
                                        unfollowBtn.classList.remove("d-none");
                                    } else {
                                        // user is not currently following this user
                                        followBtn.classList.remove("d-none");
                                    }

                                    // user is on their own profile
                                    if (currUser.username === username) {
                                        followBtn.classList.add("d-none");
                                        unfollowBtn.classList.add("d-none");
                                    }
                                });
                            }
                        })
                        .catch((error) => {
                            createAlert(
                                "Error getting logged in user info",
                                "danger"
                            );
                            console.log(error);
                        });
                });
            }
        })
        .catch((error) => {
            createAlert("Error getting profile user info", "danger");
            console.log(error);
        });
};

// turns follow button on, turns unfollow button off
const setFollowButton = (followBtn, unfollowBtn, username, api, token) => {
    followBtn.addEventListener("click", () => {
        api.putAPIRequestTokenQuery(
            "user/follow",
            { username: username },
            token
        )
            .then((data) => {
                if (data.status === 400) {
                    createAlert("You cannot follow yourself", "danger");
                } else if (data.status === 403) {
                    createAlert("Invalid Auth Token", "danger");
                } else if (data.status === 404) {
                    createAlert(`User Not Found`, "danger");
                } else if (data.status === 200) {
                    data.json().then(() => {
                        createAlert(
                            `You are now following ${username}`,
                            "success"
                        );
                        followBtn.classList.add("d-none");
                        unfollowBtn.classList.remove("d-none");
                    });
                }
            })
            .catch((error) => {
                createAlert(`Error Following ${username}`, "danger");
                console.log(error);
            });
    });
};

// turns unfollow button on, turns follow button off
const setUnfollowButton = (followBtn, unfollowBtn, username, api, token) => {
    unfollowBtn.addEventListener("click", () => {
        api.putAPIRequestTokenQuery(
            "user/unfollow",
            { username: username },
            token
        )
            .then((data) => {
                if (data.status === 400) {
                    createAlert("You cannot follow yourself", "danger");
                } else if (data.status === 403) {
                    createAlert("Invalid Auth Token", "danger");
                } else if (data.status === 404) {
                    createAlert(`User Not Found`, "danger");
                } else if (data.status === 200) {
                    data.json().then(() => {
                        createAlert(
                            `You have now unfollowed ${username}`,
                            "success"
                        );
                        followBtn.classList.remove("d-none");
                        unfollowBtn.classList.add("d-none");
                    });
                }
            })
            .catch((error) => {
                createAlert(`Error Following ${username}`, "danger");
                console.log(error);
            });
    });
};
