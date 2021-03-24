import { createAlert } from "./createAlert.js";

export const handleFeed = (api) => {
    // get token from localstorage
    const token = localStorage.getItem("token");
    console.log(`Token ${token}`);

    // fetch user feed
    api.getAPIRequestTokenQuery("user/feed", {}, token)
        .then((data) => {
            if (data.status === 403 || data.status === 400) {
                // send user back to login screen
                createAlert(
                    "Invalid Auth Token\nTry Logging In Again?",
                    "danger"
                );
            } else if (data.status === 200) {
                // successful feed retrieval
                data.json().then((result) => {
                    console.log(result.posts);
                    const feed = document.getElementById("feed");
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

                        // likes button
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
                        likeButton.addEventListener("click", () => {
                            setLikeModal(post.meta.likes, api, token, post.id);
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
                });
            }
        })
        .catch((error) => {
            console.log(error);
        });
    return;
};

// sets like information on modal for the given post
const setLikeModal = (userIds, api, token, postId) => {
    const header = document.getElementById("main-modal");
    const body = document.getElementById("modal-text");
    const likeBtn = document.getElementById("like-post-btn");
    const modal = document.querySelector(".modal-dialog");
    modal.classList.remove("modal-lg");

    // clear body of modal
    body.innerText = "";
    console.log(userIds);
    if (userIds.length === 0) {
        body.innerText = "Nobody has liked this post :(";
    }

    // for each user id in userIds
    userIds.map((userId) => {
        const likesDiv = document.createElement("div");
        const query = { id: userId };

        // get username from user id and add username to likes div
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
                createAlert("Error displaying likes", "danger");
                console.log(error);
            });

        body.appendChild(likesDiv);
    });

    // remove all event listeners from old button by replacing it with clone
    const new_element = likeBtn.cloneNode(true);
    likeBtn.parentNode.replaceChild(new_element, likeBtn);

    // like button functionality
    document.getElementById("like-post-btn").addEventListener("click", () => {
        handleLikeBtn(postId, api, token);
    });

    // show like button
    document.getElementById("like-post-btn").style.display = "block";

    // change header
    header.innerText = "Liked By";
};

// likes a post with postId given a user token
const handleLikeBtn = (postId, api, token) => {
    api.putAPIRequestTokenQuery("post/like", { id: postId }, token)
        .then((data) => {
            if (data.status === 400) {
                createAlert("Malformed Request", "danger");
            } else if (data.status === 403) {
                createAlert("Invalid Auth Token", "danger");
            } else if (data.status === 404) {
                createAlert("Post Not Found", "danger");
            } else if (data.status === 200) {
                data.json().then((result) => {
                    console.log(result);
                    createAlert("Successfully liked the post", "success");
                });
            }
        })
        .catch((error) => {
            createAlert("Error liking post", "danger");
            console.log(error);
        });
};

const setCommentModal = (comments) => {
    const header = document.getElementById("main-modal");
    const body = document.getElementById("modal-text");
    const likeBtn = document.getElementById("like-post-btn");
    const modal = document.querySelector(".modal-dialog");
    likeBtn.style.display = "none";
    modal.classList.add("modal-lg");

    // clear body of modal
    body.innerText = "";
    let commentCounter = 1;

    comments.map((comment) => {
        const commentContainer = document.createElement("div");
        commentContainer.classList.add("row");

        // set comment author
        const commentAuthor = document.createElement("div");
        commentAuthor.classList.add("col-md-8", "fw-bold", "commentcontent");
        commentAuthor.innerText = comment.author;

        // set comment date
        const commentDate = document.createElement("div");
        commentDate.classList.add("col-md-4", "fw-bold");
        commentDate.id = "commentdate";

        const date = new Date(comment.published * 1000);
        commentDate.innerText = `${date.toLocaleDateString("en-GB")}`;

        // set comment content
        const commentContent = document.createElement("div");
        commentContent.classList.add("col-md-12", "commentcontent");
        commentContent.innerText = comment.comment;

        // horizontal rule
        const hr = document.createElement("hr");
        hr.id = "commenthr";

        commentContainer.appendChild(commentAuthor);
        commentContainer.appendChild(commentDate);
        commentContainer.appendChild(commentContent);

        body.appendChild(commentContainer);
        if (commentCounter < comments.length) {
            body.appendChild(hr);
            console.log(commentCounter);
        }

        console.log(comment.author);

        commentCounter++;
    });
    console.log(comments);

    // change header
    header.innerText = "Comments";
};
