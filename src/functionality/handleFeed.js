import { getCurrentUsername, createAlert, handleScroll } from "../helpers.js";

// load and handle feed page functionality
export const handleFeed = () => {
    // get token from localstorage and
    // initialise window global variables
    const token = localStorage.getItem("token");
    window.start = 0;
    window.feedFetchLimit = 4;
    window.postLikes = [];
    window.postComments = [];
    window.userId = -1;

    // get user id of logged in user
    window.api.getAPIUserData(token).then((user) => {
        window.userId = user.id;
    });

    // load initial posts
    loadFeed(window.start, window.feedFetchLimit, token);
};

// fetches fetchLimit amount of feeds from index start via GET request
// and appends this information to the DOM
export const loadFeed = (start, fetchLimit, token) => {
    const feed = document.getElementById("feed");
    const body = document.querySelector("body");
    window.api
        .getAPIRequestTokenQuery(
            "user/feed",
            { p: start, n: fetchLimit },
            token
        )
        .then((data) => {
            if (data.status === 403 || data.status === 400) {
                createAlert(
                    "Invalid Auth Token\nTry Logging In Again?",
                    "danger"
                );
            } else if (data.status === 200) {
                data.json().then((result) => {
                    result.posts.map((post) => {
                        // author information section
                        const postContainer = document.createElement("div");
                        postContainer.classList.add("row", "md-12");

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
                        authorInfoArea.id = "author-info";

                        authorInfoArea.addEventListener("click", () => {
                            window.location.hash = `#/profile/${post.meta.author}`;
                        });

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
                        postedImg.classList.add("rounded");
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
                        buttonArea.id = "button-area";
                        buttonArea.classList.add("row", "md-12", "p-0");

                        const leftColGap3 = document.createElement("div");
                        leftColGap3.classList.add("col-md-3", "col-xs-1");

                        const rightColGap3 = document.createElement("div");
                        rightColGap3.classList.add("col-md-3", "col-xs-1");

                        const buttonContainer = document.createElement("div");
                        buttonContainer.classList.add(
                            "col",
                            "md-6",
                            "text-center"
                        );

                        // number of likes
                        const noLikes = document.createElement("span");

                        // if the number of likes is 1 then show "1 Like"
                        // else show "n Likes"
                        noLikes.innerText = `${post.meta.likes.length} ${
                            post.meta.likes.length === 1 ? "Like" : "Likes"
                        }`;

                        // if the number of comments is 1 then show "1 Comment"
                        // else show "n Comments"
                        const noComments = document.createElement("span");
                        noComments.innerText = `${post.comments.length} ${
                            post.comments.length === 1 ? "Comment" : "Comments"
                        }`;

                        // post likes button
                        const likeIcon = document.createElement("i");
                        likeIcon.classList.add("fas", "fa-heart");
                        const likeButton = document.createElement("button");
                        likeButton.classList.add(
                            "btn",
                            "btn-dark",
                            "m-2",
                            "post-btn"
                        );
                        likeButton.setAttribute("data-bs-toggle", "modal");
                        likeButton.setAttribute("data-bs-target", "#modal");
                        likeButton.setAttribute("data-likes-id", post.id);
                        likeButton.addEventListener("click", () => {
                            // object of post information
                            const postInfo = {
                                postId: post.id,
                                postLikes: post.meta.likes,
                            };

                            // check if post information exists already
                            const found = window.postLikes.some(
                                (postObj) => postObj.postId === post.id
                            );

                            // if post is not found
                            if (!found) {
                                window.postLikes.push(postInfo);
                            }

                            setLikeModal(postInfo.postLikes, token, post.id);
                        });

                        // comments button
                        const commentIcon = document.createElement("i");
                        commentIcon.classList.add("fas", "fa-comment");
                        const commentButton = document.createElement("button");
                        commentButton.classList.add(
                            "btn",
                            "btn-dark",
                            "post-btn"
                        );

                        commentButton.setAttribute("data-bs-toggle", "modal");
                        commentButton.setAttribute("data-bs-target", "#modal");
                        commentButton.setAttribute("data-comment-id", post.id);
                        commentButton.addEventListener("click", () => {
                            // object of post information
                            const postInfo = {
                                postId: post.id,
                                postComments: post.comments,
                            };

                            // check if post information exists already
                            const found = window.postComments.some(
                                (postObj) => postObj.postId === post.id
                            );

                            // if post is not found
                            if (!found) {
                                window.postComments.push(postInfo);
                            }

                            setCommentModal(
                                postInfo.postComments,
                                post.id,
                                token
                            );
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
                        postContainer.appendChild(leftColGap);
                        postContainer.appendChild(authorInfoArea);
                        postContainer.appendChild(rightColGap);
                        descriptionDiv.appendChild(descriptionText);
                        descriptionArea.appendChild(leftColGap4);
                        descriptionArea.appendChild(descriptionDiv);
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
                        authorInfoArea.appendChild(authorImg);
                        authorInfoArea.appendChild(authorName);
                        postContainer.appendChild(descriptionArea);
                        postContainer.appendChild(likeContainer);
                        postContainer.appendChild(imgContainer);
                        postContainer.appendChild(commentContainer);
                        postContainer.appendChild(buttonArea);
                        postContainer.appendChild(hr);
                        feed.appendChild(postContainer);
                    });

                    // add event listener for infinite scroll
                    body.addEventListener("scroll", handleScroll, false);

                    // increase where to load from index
                    window.start += window.feedFetchLimit;
                });
            }
        })
        .catch((error) => {
            createAlert("Error retrieving feed", "danger");
            console.warn(error);
        });
};

// sets like information on modal for the given post
const setLikeModal = (userIds, token, postId) => {
    const header = document.getElementById("main-modal");
    const body = document.getElementById("modal-text");
    const likeBtn = document.getElementById("like-post-btn");
    const modal = document.querySelector(".modal-dialog");
    const commentInput = document.getElementById("comment-input-container");

    likeBtn.classList.remove("d-none");
    commentInput.classList.add("d-none");
    modal.classList.remove("modal-lg");

    // clear body of modal
    body.innerText = "";
    if (userIds.length === 0) {
        body.innerText = "Nobody has liked this post :(";
    }

    // for each user id in userIds
    userIds.map((userId) => {
        const likesDiv = document.createElement("div");
        const query = { id: userId };

        // get username from user id and add username to likes div
        window.api
            .getAPIRequestTokenQuery("user", query, token)
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
                        likesDiv.innerText += result.username;
                    });
                }
            })
            .catch((error) => {
                createAlert("Error displaying likes", "danger");
                console.warn(error);
            });

        body.appendChild(likesDiv);
    });

    // remove all event listeners from old button by replacing it with clone
    const newBtn = likeBtn.cloneNode(true);
    likeBtn.parentNode.replaceChild(newBtn, likeBtn);

    // like button functionality
    document.getElementById("like-post-btn").addEventListener("click", () => {
        handleLikeBtn(postId, token);
    });

    // show like button
    document.getElementById("like-post-btn").classList.remove("d-none");

    // change header
    header.innerText = "Liked By";
};

// likes a post with postId given a user token
const handleLikeBtn = (postId, token) => {
    window.api
        .putAPIRequestTokenQuery("post/like", { id: postId }, token)
        .then((data) => {
            if (data.status === 400) {
                createAlert("Malformed Request", "danger");
            } else if (data.status === 403) {
                createAlert("Invalid Auth Token", "danger");
            } else if (data.status === 404) {
                createAlert("Post Not Found", "danger");
            } else if (data.status === 200) {
                // go through post info and look for this post,
                // if user is not in the post's likes array
                // add user to the likes array and refresh modal
                window.postLikes.forEach((postObj) => {
                    if (
                        postObj.postId === postId &&
                        !postObj.postLikes.includes(window.userId)
                    ) {
                        postObj.postLikes.push(window.userId);
                        setLikeModal(postObj.postLikes, token, postId);

                        const postLikeBtnText = document
                            .querySelector(`button[data-likes-id="${postId}"]`)
                            .querySelector("span");

                        const newLikes =
                            parseInt(postLikeBtnText.innerText.split(" ")[0]) +
                            1;
                        postLikeBtnText.innerText = `${newLikes} ${
                            newLikes === 1 ? "Like" : "Likes"
                        }`;
                    }
                });

                createAlert("Successfully liked the post", "success");
            }
        })
        .catch((error) => {
            createAlert("Error liking post", "danger");
            console.warn(error);
        });
};

// sets information relating to post comments into modal
const setCommentModal = (comments, postId, token) => {
    const header = document.getElementById("main-modal");
    const body = document.getElementById("modal-text");
    const likeBtn = document.getElementById("like-post-btn");
    const modal = document.querySelector(".modal-dialog");
    const commentInput = document.getElementById("comment-input-container");

    commentInput.classList.remove("d-none");
    likeBtn.classList.add("d-none");
    modal.classList.add("modal-lg");

    if (comments.length === 0) {
        body.innerText = "Nobody has commented on this post :(";
    } else {
        // clear body of modal
        body.innerText = "";
    }

    handleCommentButton(commentInput, postId, token);

    // go through each comment
    let commentCounter = 1;
    comments.map((comment) => {
        const commentContainer = document.createElement("div");
        commentContainer.classList.add("row");

        // set comment author
        const commentAuthor = document.createElement("div");
        commentAuthor.classList.add("col-md-8", "fw-bold", "comment-content");
        commentAuthor.innerText = comment.author;

        // set comment date
        const commentDate = document.createElement("div");
        commentDate.classList.add("col-md-4", "fw-bold");
        commentDate.id = "commentdate";

        const date = new Date(comment.published * 1000);
        commentDate.innerText = `${date.toLocaleDateString("en-GB")}`;

        // set comment content
        const commentContent = document.createElement("div");
        commentContent.classList.add("col-md-12", "comment-content");
        commentContent.innerText = comment.comment;

        // horizontal rule
        const hr = document.createElement("hr");
        hr.classList.add("comment-hr");

        commentContainer.appendChild(commentAuthor);
        commentContainer.appendChild(commentDate);
        commentContainer.appendChild(commentContent);
        body.appendChild(commentContainer);

        // append hr if not last comment
        if (commentCounter < comments.length) {
            body.appendChild(hr);
        }
        commentCounter++;
    });

    // change header
    header.innerText = "Comments";
};

// handles click of send comment button
// gets comment from input field, sends put request to server
const handleCommentButton = (container, postId, token) => {
    const button = container
        .querySelector(".input-group-btn")
        .querySelector(".comment-input-button");

    // remove all event listeners from old button by replacing it with clone
    const newBtn = button.cloneNode(true);
    button.parentNode.replaceChild(newBtn, button);

    // add event listener to new button
    newBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const commentText = container.querySelector(".comment-input-text");

        if (commentText.value.length === 0) {
            createAlert("Cannot post empty comment", "danger");
            return;
        }

        const body = {
            comment: commentText.value,
        };

        // reset comment text value after submitting
        commentText.value = "";

        window.api
            .putAPIRequestTokenBodyQuery(
                "post/comment",
                { id: postId },
                body,
                token
            )
            .then((data) => {
                if (data.status === 400) {
                    createAlert("Malformed Request", "danger");
                } else if (data.status === 403) {
                    createAlert("Invalid Auth Token", "danger");
                } else if (data.status === 404) {
                    createAlert("Post Not Found", "danger");
                } else if (data.status === 200) {
                    // go through post info and look for this post,
                    // add user to the likes array and refresh modal
                    window.postComments.forEach((postObj) => {
                        if (postObj.postId === postId) {
                            const commentObj = {
                                author: getCurrentUsername(),
                                published: Date.now() / 1000,
                                comment: body.comment,
                            };

                            postObj.postComments.push(commentObj);

                            // update comment modal
                            setCommentModal(
                                postObj.postComments,
                                postId,
                                token
                            );

                            const postCommentBtnText = document
                                .querySelector(
                                    `button[data-comment-id="${postId}"]`
                                )
                                .querySelector("span");

                            const newCommentsNumber =
                                parseInt(
                                    postCommentBtnText.innerText.split(" ")[0]
                                ) + 1;
                            postCommentBtnText.innerText = `${newCommentsNumber} ${
                                newCommentsNumber === 1 ? "Comment" : "Comments"
                            }`;
                        }
                        createAlert("Successfully posted comment", "success");
                    });
                }
            })
            .catch((error) => {
                createAlert("Error posting comment", "danger");
                console.warn(error);
            });
    });
};
