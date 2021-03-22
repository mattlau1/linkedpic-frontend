import { createAlert } from "./createAlert.js";

export const handleFeed = (api) => {
    // get token from url
    const token = location.hash.match(new RegExp("/feed/(.*)/*"))[1];
    console.log(`Token ${token}`);

    fetch(`${api.url}/user/feed`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
    })
        .then((data) => {
            if (data.status === 403) {
                createAlert("Invalid Auth Token", "danger");
            } else if (data.status === 200) {
                // successful feed retrieval
                data.json().then((result) => {
                    createAlert("Successfully retrieved feed", "success");
                    console.log(result.posts);
                    const feed = document.getElementById("feed");
                    result.posts.map((post) => {
                        // author information section
                        const authorInfo = document.createElement("div");
                        authorInfo.classList.add("row", "md-12");

                        // create left and right column gaps
                        const leftColGap = document.createElement("div");
                        leftColGap.classList.add("col-md-3", "col-xs-1");

                        const rightColGap = document.createElement("div");
                        rightColGap.classList.add("col-md-3", "col-xs-1");

                        const authorInfoArea = document.createElement("div");
                        authorInfoArea.classList.add(
                            "col-md-6",
                            "py-2",
                            "m-0",
                            "px-0"
                        );

                        // author profile picture
                        const authorImg = document.createElement("img");
                        authorImg.classList.add("rounded-circle", "md-8");
                        authorImg.height = "50";
                        authorImg.width = "50";
                        authorImg.src =
                            "https://raw.githubusercontent.com/mattlau1/jas/main/jas.png";

                        // author name
                        const authorName = document.createElement("p");
                        authorName.classList.add("d-inline");
                        authorName.id = "authorname";

                        // post date
                        const date = new Date(post.meta.published * 1000);
                        authorName.innerText = `${
                            post.meta.author
                        } (${date.toLocaleDateString("en-GB")})`;

                        // post image container
                        const imgContainer = document.createElement("div");
                        imgContainer.classList.add("col-md-6", "p-0");

                        const postedImg = document.createElement("img");
                        // postedImg.classList.add("rounded");
                        postedImg.id = "postimg";
                        postedImg.src = `data:image/jpg;base64,${post.src}`;

                        const likeContainer = document.createElement("div");
                        likeContainer.classList.add("col-md-3", "col-xs-1");
                        likeContainer.id = "likeContainer";

                        const commentContainer = document.createElement("div");
                        commentContainer.classList.add("col-md-3", "col-xs-1");
                        commentContainer.id = "commentContainer";

                        // button area section
                        const buttonArea = document.createElement("div");
                        buttonArea.classList.add("row", "md-12", "p-0");

                        const leftColGap3 = document.createElement("div");
                        leftColGap3.classList.add("col-md-3", "col-xs-1");

                        const rightColGap3 = document.createElement("div");
                        rightColGap3.classList.add("col-md-3", "col-xs-1");

                        const buttonContainer = document.createElement("div");
                        buttonContainer.classList.add(
                            "col",
                            "md-2",
                            "text-center"
                        );

                        // number of likes
                        const noLikes = document.createElement("span");

                        // if the number of likes is 1 then show "1 Like"
                        // else show "n Likes"
                        noLikes.innerText = ` ${post.meta.likes.length} ${
                            post.meta.likes.length === 1 ? "Like" : "Likes"
                        }`;

                        // if the number of comments is 1 then show "1 Comment"
                        // else show "n Comments"
                        const noComments = document.createElement("span");
                        noComments.innerText = ` ${post.comments.length} ${
                            post.comments.length === 1 ? "Comment" : "Comments"
                        }`;

                        // buttons
                        const likeIcon = document.createElement("i");
                        likeIcon.classList.add("fas", "fa-heart");

                        const commentIcon = document.createElement("i");
                        commentIcon.classList.add("fas", "fa-comment");

                        const likeButton = document.createElement("button");
                        likeButton.classList.add("btn", "btn-dark", "m-2");
                        likeButton.id = "likebtn";
                        likeButton.setAttribute("data-bs-toggle", "modal");
                        likeButton.setAttribute("data-bs-target", "#modal");
                        likeButton.addEventListener("click", () => {
                            setLikeModal(post.meta.likes, api, token);
                        });

                        const commentButton = document.createElement("button");
                        commentButton.classList.add("btn", "btn-dark", "mr-2");
                        commentButton.id = "commentbtn";
                        commentButton.setAttribute("data-bs-toggle", "modal");
                        commentButton.setAttribute("data-bs-target", "#modal");
                        commentButton.addEventListener("click", () => {
                            setCommentModal(post.comments, api, token);
                        });

                        // post description area
                        const descriptionArea = document.createElement("div");
                        descriptionArea.classList.add("row", "md-12");

                        const leftColGap4 = document.createElement("div");
                        leftColGap4.classList.add("col-md-3", "col-xs-1");

                        const descriptionDiv = document.createElement("div");
                        descriptionDiv.classList.add("col-md-6");

                        const descriptionText = document.createElement("p");
                        descriptionText.classList.add("d-inline");

                        descriptionText.innerText = post.meta.description_text;

                        // horizontal rule
                        const hr = document.createElement("hr");
                        hr.classList.add("mt-5", "mb-5");

                        // stick everything together
                        authorInfoArea.appendChild(authorImg);
                        authorInfoArea.appendChild(authorName);
                        authorInfo.appendChild(leftColGap);
                        authorInfo.appendChild(authorInfoArea);
                        authorInfo.appendChild(rightColGap);
                        descriptionDiv.appendChild(descriptionText);
                        descriptionArea.appendChild(leftColGap4);
                        descriptionArea.appendChild(descriptionDiv);
                        authorInfo.appendChild(descriptionArea);
                        likeButton.appendChild(likeIcon);
                        likeButton.appendChild(noLikes);
                        commentButton.appendChild(commentIcon);
                        commentButton.appendChild(noComments);
                        buttonContainer.appendChild(likeButton);
                        buttonContainer.appendChild(commentButton);
                        buttonArea.appendChild(leftColGap3);
                        buttonArea.appendChild(buttonContainer);
                        buttonArea.appendChild(rightColGap3);
                        imgContainer.appendChild(postedImg);
                        authorInfo.appendChild(likeContainer);
                        authorInfo.appendChild(imgContainer);
                        authorInfo.appendChild(commentContainer);
                        authorInfo.appendChild(buttonArea);
                        authorInfo.appendChild(hr);
                        feed.appendChild(authorInfo);
                    });
                });
            }
        })
        .catch((error) => {
            console.log(error);
        });
    return;
};

const setLikeModal = (userIds, api, token) => {
    const header = document.getElementById("mainModal");
    const body = document.getElementById("modal-text");
    const likePost = document.getElementById("likePost");

    // clear body of modal
    body.innerText = "";
    console.log(userIds);
    if (userIds.length === 0) {
        body.innerText = "Nobody has liked this post :(";
    }

    // for each user id in userIds
    userIds.map((userId) => {
        const likesDiv = document.createElement("div");
        const query = {
            id: userId,
        };

        // get username from user id
        api.getAPIRequestTokenQuery("user", query, token)
            .then((data) => {
                if (data.status === 400) {
                    createAlert("Malformed Request", "danger");
                } else if (data.status === 403) {
                    createAlert("Invalid Auth Token", "danger");
                } else if (data.status === 404) {
                    createAlert("User Not Found", "danger");
                } else if (data.status === 200) {
                    data.json().then((result) => {
                        // add username to likes div
                        console.log(result);
                        likesDiv.innerText += result.username;
                    });
                }
            })
            .catch((error) => {
                createAlert(
                    "Error with showing likes - check console for more information",
                    "danger"
                );
                console.log(error);
            });

        body.appendChild(likesDiv);
    });

    // show like button
    likePost.style.display = "block";
    // change header
    header.innerText = "Liked By";
};

const setCommentModal = (userIds, api, token) => {
    const header = document.getElementById("mainModal");
    const body = document.getElementById("modal-text");
    const likePost = document.getElementById("likePost");
    likePost.style.display = "none";

    // clear body of modal
    body.innerText = "";

    // for each user id in userIds
    userIds.map((userId) => {
        const likesDiv = document.createElement("div");
        likesDiv.classList.add("display-6");
        const query = {
            id: userId,
        };

        // get username from user id
        api.getAPIRequestTokenQuery("user", query, token)
            .then((data) => {
                if (data.status === 400) {
                    createAlert("Malformed Request", "danger");
                } else if (data.status === 403) {
                    createAlert("Invalid Auth Token", "danger");
                } else if (data.status === 404) {
                    createAlert("User Not Found", "danger");
                } else if (data.status === 200) {
                    data.json().then((result) => {
                        // add username to likes div
                        console.log(result);
                        likesDiv.innerText += result.username;
                    });
                }
            })
            .catch((error) => {
                createAlert(
                    "Error with showing likes - check console for more information",
                    "danger"
                );
                console.log(error);
            });

        body.appendChild(likesDiv);
    });

    // change header
    header.innerText = "Comments";
};
