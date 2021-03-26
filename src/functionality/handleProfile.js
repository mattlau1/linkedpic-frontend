import { createAlert, handleScroll } from "../helpers.js";

// load and handle profile page functionality
export const handleProfile = () => {
    const token = localStorage.getItem("token");
    const currPath = window.location.hash;
    const body = document.querySelector("body");
    body.removeEventListener("scroll", handleScroll);

    // get current profile username from url
    const user = currPath.substring(currPath.lastIndexOf("/") + 1);

    const profile = document.getElementById("profile");

    // get user information
    window.api
        .getAPIRequestTokenQuery("user", { username: user }, token)
        .then((data) => {
            if (data.status === 400) {
                createAlert("Malformed Request", "danger");
            } else if (data.status === 403) {
                createAlert("Invalid Auth Token", "danger");
            } else if (data.status === 404) {
                createAlert("User Not Found", "danger");
            } else if (data.status === 200) {
                data.json().then((result) => {
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

                    setFollowingModal(result.following, token);

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

                    followBtnContainer.appendChild(followBtn);
                    followBtnContainer.appendChild(unfollowBtn);

                    // horizontal rule
                    const hr = document.createElement("hr");

                    // "Posts" title text
                    const postsTitle = document.createElement("div");
                    postsTitle.className = "col-md-10 display-6 posts";
                    postsTitle.innerText = "Posts";
                    if (result.posts.length === 0) {
                        postsTitle.innerText = `${result.username} has no posts`;
                    }

                    const postHeader = document.createElement("div");
                    postHeader.className = "row md-12 ms-0";
                    postHeader.appendChild(postsTitle);

                    // settings button
                    const settingsIcon = document.createElement("i");
                    settingsIcon.className = "fas fa-cog";

                    const settingsBtn = document.createElement("a");
                    settingsBtn.className = "btn btn-dark w-100";
                    settingsBtn.href = "#/settings";

                    const settingsBtnText = document.createElement("span");
                    settingsBtnText.innerText = "Account Settings";

                    settingsBtn.appendChild(settingsIcon);
                    settingsBtn.appendChild(settingsBtnText);

                    const settingsBtnContainer = document.createElement("div");
                    settingsBtnContainer.id = "settings-btn-container";
                    settingsBtnContainer.className =
                        "col-md-2 ms-0 px-0 d-none";
                    settingsBtnContainer.appendChild(settingsBtn);

                    postHeader.appendChild(settingsBtnContainer);

                    // profile posts
                    const postContainer = document.createElement("div");
                    postContainer.id = "posts";
                    postContainer.className = "row md-12 posts";

                    addProfileImages(result.posts, token);

                    // page container
                    const pageRowContainer = document.createElement("div");
                    pageRowContainer.className = "row md-12";

                    pageRowContainer.appendChild(usernameTextContainer);
                    pageRowContainer.appendChild(statContainer);
                    pageRowContainer.appendChild(followBtnContainer);
                    pageRowContainer.appendChild(hr);
                    pageRowContainer.appendChild(postHeader);
                    pageRowContainer.appendChild(postContainer);

                    const pageContainer = document.createElement("div");
                    pageContainer.className = "container-md-12";

                    pageContainer.appendChild(pageRowContainer);

                    profile.appendChild(pageContainer);

                    handleProfileBtns(followBtn, unfollowBtn, token);
                });
            }
        })
        .catch((error) => {
            createAlert("Error Loading Profile", "danger");
            console.warn(error);
        });
};

// adds profile images to page, given postids
const addProfileImages = (postIds, token) => {
    postIds.map((postId) => {
        window.api
            .getAPIRequestTokenQuery("post", { id: postId }, token)
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
                            "col-md-3 col-sm-12 mb-1 px-1 text-center profile-img-container";
                        imgContainer.setAttribute("data-post-id", result.id);
                        const img = document.createElement("img");
                        img.className = "post-img rounded";
                        img.src = `data:image/jpg;base64,${result.src}`;

                        const imgDescription = document.createElement("p");

                        imgDescription.className =
                            "overflow-auto profile-img-description";
                        imgDescription.innerText = result.meta.description_text;

                        imgContainer.appendChild(img);
                        imgContainer.appendChild(imgDescription);

                        postContainer.appendChild(imgContainer);
                    });
                }
            })
            .catch((error) => {
                createAlert("Error displaying posts", "danger");
                console.warn(error);
            });
    });
};

// sets modal information to list of users that the user is following
const setFollowingModal = (userIds, token) => {
    const header = document.getElementById("main-modal");
    const body = document.getElementById("modal-text");
    const likeBtn = document.getElementById("like-post-btn");
    const modal = document.querySelector(".modal-dialog");
    const commentInput = document.getElementById("comment-input-container");

    commentInput.classList.add("d-none");
    likeBtn.classList.add("d-none");
    modal.classList.remove("modal-lg");

    // clear body of modal
    body.innerText = "";

    // for each user id, append user id's username to modal body
    userIds.map((user) => {
        window.api
            .getAPIRequestTokenQuery("user", { id: user }, token)
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
                console.warn(error);
            });
    });

    // change header
    header.innerText = `Following`;
};

// handles all the buttons on a user's profile page
const handleProfileBtns = (followBtn, unfollowBtn, token) => {
    const currPath = window.location.hash;
    const username = currPath.substring(currPath.lastIndexOf("/") + 1);

    // first get information from user profile
    window.api
        .getAPIRequestTokenQuery("user", { username: username }, token)
        .then((data) => {
            if (data.status === 400) {
                createAlert("Malformed Request", "danger");
            } else if (data.status === 403) {
                createAlert("Invalid Auth Token", "danger");
            } else if (data.status === 404) {
                createAlert("User Not Found", "danger");
            } else if (data.status === 200) {
                // then get information for current user (logged in user)
                data.json().then((profile) => {
                    window.api
                        .getAPIUserData(token)
                        .then((user) => {
                            // if logged in user is following the user then show unfollow button
                            // else show follow button unless they are looking at their own page
                            const currFollowing = user.following;
                            const profileId = profile.id;

                            // add functionality to follow/unfollow buttons
                            handleUnfollowButton(
                                followBtn,
                                unfollowBtn,
                                username,
                                token
                            );
                            handleFollowButton(
                                followBtn,
                                unfollowBtn,
                                username,
                                token
                            );

                            // show follow/unfollow button
                            // based on if current user is following
                            // or not
                            if (currFollowing.includes(profileId)) {
                                // user is currently following this user
                                unfollowBtn.classList.remove("d-none");
                            } else {
                                // user is not currently following this user
                                followBtn.classList.remove("d-none");
                            }

                            // user is on their own profile
                            // remove follow/unfollow buttons
                            // add edit and remove buttons
                            if (user.username === username) {
                                followBtn.classList.add("d-none");
                                unfollowBtn.classList.add("d-none");
                                addProfilePostButtons(token);
                            }
                        })
                        .catch((error) => {
                            createAlert(
                                "Error getting logged in user info",
                                "danger"
                            );
                            console.warn(error);
                        });
                });
            }
        })
        .catch((error) => {
            createAlert("Error getting profile user info", "danger");
            console.warn(error);
        });
};

// turns follow button on, turns unfollow button off
const handleFollowButton = (followBtn, unfollowBtn, username, token) => {
    followBtn.addEventListener("click", () => {
        followBtn.classList.add("d-none");
        unfollowBtn.classList.remove("d-none");
        window.api
            .putAPIRequestTokenQuery(
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
                    createAlert(`You are now following ${username}`, "success");
                }
            })
            .catch((error) => {
                createAlert(`Error Following ${username}`, "danger");
                console.warn(error);
            });
    });
};

// turns unfollow button on, turns follow button off
const handleUnfollowButton = (followBtn, unfollowBtn, username, token) => {
    unfollowBtn.addEventListener("click", () => {
        // flip buttons
        followBtn.classList.remove("d-none");
        unfollowBtn.classList.add("d-none");

        // send request to unfollow user
        window.api
            .putAPIRequestTokenQuery(
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
                    createAlert(
                        `You have now unfollowed ${username}`,
                        "success"
                    );
                }
            })
            .catch((error) => {
                createAlert(`Error Following ${username}`, "danger");
                console.warn(error);
            });
    });
};

// when remove button is clicked, sends delete request to backend
// to remove post and then removes the post from the DOM
const handleRemoveButton = (button, postId, post, token) => {
    button.addEventListener("click", (e) => {
        e.preventDefault();

        // remove post from the DOM
        document.getElementById("posts").removeChild(post);

        // send delete request to remove the post
        window.api
            .deleteAPIRequestTokenQuery("post", { id: postId }, token)
            .then((data) => {
                if (data.status === 400) {
                    createAlert("Malformed Request", "danger");
                } else if (data.status === 403) {
                    createAlert("Invalid Auth Token", "danger");
                } else if (data.status === 404) {
                    createAlert("Post Not Found", "danger");
                } else if (data.status === 200) {
                    createAlert("Successfully removed post", "success");
                }
            })
            .catch((error) => {
                createAlert("Error Removing Post", "danger");
                console.warn(error);
            });
    });
};

// adds functionality to edit and remove buttons and adds them to the page
// remove button removes post from the DOM
const addProfilePostButtons = (token) => {
    const imgContainer = document.querySelectorAll(".profile-img-container");

    // show account settings button
    const settingsBtn = document.getElementById("settings-btn-container");
    settingsBtn.classList.remove("d-none");

    imgContainer.forEach((post) => {
        // edit button
        const editButton = document.createElement("button");
        editButton.className = "btn btn-dark ms-2 btn-outline-light";

        const editButtonIcon = document.createElement("i");
        editButtonIcon.className = "fas fa-edit profile-icon";
        editButton.appendChild(editButtonIcon);

        // finish edit button
        const finEditButton = document.createElement("button");
        finEditButton.className = "btn btn-dark ms-2 btn-outline-light d-none";

        const finEditButtonIcon = document.createElement("i");
        finEditButtonIcon.className = "fas fa-edit profile-icon";
        finEditButton.appendChild(finEditButtonIcon);

        // remove button
        const removeButton = document.createElement("button");
        removeButton.className = "btn btn-dark btn-outline-light ms-2";

        const removeButtonIcon = document.createElement("i");
        removeButtonIcon.className = "fas fa-trash profile-icon";
        removeButton.appendChild(removeButtonIcon);

        // get post id from data-post-id attribute
        const postId = post.getAttribute("data-post-id");

        // button functionality
        handleEditBtn(editButton, finEditButton, postId, token);
        handleFinEditBtn(editButton, finEditButton, postId, token);
        handleRemoveButton(removeButton, postId, post, token);

        post.appendChild(editButton);
        post.appendChild(finEditButton);
        post.appendChild(removeButton);
    });
};

// flips/toggles edit & finish edit button, adds input field
const handleEditBtn = (editBtn, finEditBtn) => {
    editBtn.addEventListener("click", (e) => {
        e.preventDefault();

        // swap buttons
        editBtn.classList.add("d-none");
        finEditBtn.classList.remove("d-none");

        const description = editBtn.parentElement.querySelector(
            ".profile-img-description"
        );

        // create editing field
        const editField = document.createElement("input");
        editField.className =
            "form-control form-control-sm me-2 edit-field profile-img-description";
        editField.type = "input";
        editField.placeholder = "Post Description";
        editField.value = description.innerText;

        // show editfield, hide description, insert edit field before edit button
        editField.classList.remove("d-none");
        description.classList.add("d-none");
        editBtn.parentElement.insertBefore(editField, editBtn);
    });
};

// flips/toggles edit & finish edit button, sends put request to edit post
const handleFinEditBtn = (editBtn, finEditBtn, postId, token) => {
    finEditBtn.addEventListener("click", (e) => {
        e.preventDefault();

        // swap buttons
        finEditBtn.classList.add("d-none");
        editBtn.classList.remove("d-none");

        // get description, editfield, image src
        const description = editBtn.parentElement.querySelector(
            ".profile-img-description"
        );
        const editField = finEditBtn.parentElement.querySelector(".edit-field");
        const imgSrc = finEditBtn.parentElement.querySelector(".post-img").src;

        // if edit field is empty just return
        if (editField.value.length === 0) {
            createAlert("Post description cannot be empty", "danger");
            return;
        }
        description.innerText = editField.value;

        finEditBtn.parentElement.removeChild(editField);
        description.classList.remove("d-none");

        // body for post request
        // for imgSrc, remove first part of base64
        const body = {
            description_text: editField.value,
            src: imgSrc.split(",")[1],
        };

        // send put request to edit the post
        window.api
            .putAPIRequestTokenBodyQuery("post", { id: postId }, body, token)
            .then((data) => {
                if (data.status === 400) {
                    createAlert("Malformed Request", "danger");
                } else if (data.status === 403) {
                    createAlert(
                        "Invalid Auth Token / Unauthorized to edit post",
                        "danger"
                    );
                } else if (data.status === 404) {
                    createAlert("Post Not Found", "danger");
                } else if (data.status === 200) {
                    createAlert(
                        "Successfully updated post description",
                        "success"
                    );
                }
            })
            .catch((error) => {
                createAlert("Error editing post", "danger");
                console.warn(error);
            });
    });
};
