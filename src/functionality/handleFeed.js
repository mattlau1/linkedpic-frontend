import { createAlert } from "./createAlert.js";
import { fileToDataUrl } from "../helpers.js";

export const handleFeed = (api) => {
    // remove background from feed page
    const body = document.getElementById("root");
    // body.classList.remove("bg");

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
                        const authorInfo = document.createElement("div");

                        authorInfo.classList.add("row", "md-12");
                        const leftColGap = document.createElement("div");
                        leftColGap.classList.add("col-md-3");

                        const rightColGap = document.createElement("div");
                        rightColGap.classList.add("col-md-3");

                        const authorInfoArea = document.createElement("div");
                        authorInfoArea.classList.add(
                            "col-md-6",
                            "py-2",
                            "m-0",
                            "px-0"
                        );

                        const authorImg = document.createElement("img");

                        authorImg.classList.add("rounded-circle", "md-8");
                        authorImg.height = "50";
                        authorImg.src =
                            "https://linustechtips.com/uploads/monthly_2018_11/736b0bdc7b30e8f79b17461e705593e7ad5df986_full.thumb.jpg.04f6b95a2461d12aca982596b23da1c3.jpg";

                        const authorName = document.createElement("p");
                        authorName.classList.add("d-inline");
                        authorName.id = "authorname";
                        authorName.innerText = `${
                            post.meta.author
                        } on ${new Date(
                            post.meta.published * 1000
                        ).toLocaleDateString("en-US")}`;

                        const imgDiv = document.createElement("div");
                        imgDiv.classList.add("col-md-6", "p-0");

                        const postedImg = document.createElement("img");
                        postedImg.classList.add("rounded");
                        postedImg.id = "postimg";
                        postedImg.src = "../../bg4.jpg";

                        const leftColGap2 = document.createElement("div");
                        leftColGap2.classList.add("col-md-3");

                        const rightColGap2 = document.createElement("div");
                        rightColGap2.classList.add("col-md-3");

                        const buttonArea = document.createElement("div");
                        buttonArea.classList.add("row", "md-12", "p-0");

                        const leftColGap3 = document.createElement("div");
                        leftColGap3.classList.add("col-md-3");

                        const rightColGap3 = document.createElement("div");
                        rightColGap3.classList.add("col-md-3");

                        const buttonContainer = document.createElement("div");
                        buttonContainer.classList.add(
                            "col",
                            "md-2",
                            "text-center"
                        );

                        const noLikes = document.createElement("span");
                        noLikes.innerText = ` ${post.meta.likes.length} ${
                            post.meta.likes.length === 1 ? "Like" : "Likes"
                        }`;
                        console.log(post.meta.likes);
                        const noComments = document.createElement("span");
                        noComments.innerText = ` ${post.comments.length} ${
                            post.comments.length === 1 ? "Comment" : "Comments"
                        }`;

                        const likeIcon = document.createElement("i");
                        likeIcon.classList.add("fas", "fa-heart");

                        const commentIcon = document.createElement("i");
                        commentIcon.classList.add("fas", "fa-comment");

                        const likeButton = document.createElement("button");
                        likeButton.classList.add("btn", "btn-primary", "mx-2");

                        const commentButton = document.createElement("button");
                        commentButton.classList.add(
                            "btn",
                            "btn-primary",
                            "mr-2"
                        );

                        const descriptionArea = document.createElement("div");
                        descriptionArea.classList.add("row", "md-12");

                        const leftColGap4 = document.createElement("div");
                        leftColGap4.classList.add("col-md-3");

                        const descriptionDiv = document.createElement("div");
                        descriptionDiv.classList.add("col-md-6");

                        const descriptionText = document.createElement("p");
                        descriptionText.classList.add("d-inline");

                        const hr = document.createElement("hr");
                        hr.classList.add("mt-4", "mb-2");

                        authorInfoArea.appendChild(authorImg);
                        authorInfoArea.appendChild(authorName);

                        authorInfo.appendChild(leftColGap);
                        authorInfo.appendChild(authorInfoArea);

                        authorInfo.appendChild(rightColGap);

                        descriptionText.innerText = post.meta.description_text;
                        descriptionDiv.appendChild(descriptionText);

                        descriptionArea.appendChild(leftColGap4);
                        descriptionArea.appendChild(descriptionDiv);

                        authorInfo.appendChild(descriptionArea);
                        imgDiv.appendChild(postedImg);

                        likeButton.appendChild(likeIcon);
                        likeButton.appendChild(noLikes);
                        commentButton.appendChild(commentIcon);
                        commentButton.appendChild(noComments);

                        buttonContainer.appendChild(likeButton);
                        buttonContainer.appendChild(commentButton);

                        buttonArea.appendChild(leftColGap3);
                        buttonArea.appendChild(buttonContainer);
                        buttonArea.appendChild(rightColGap3);

                        authorInfo.appendChild(leftColGap2);
                        authorInfo.appendChild(imgDiv);
                        authorInfo.appendChild(rightColGap2);
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

{
    /*
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
*/
}
