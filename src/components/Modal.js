const Modal = {
    render: () => {
        // modal header
        const modalHeaderText = document.createElement("h4");
        modalHeaderText.className = "modal-title";
        modalHeaderText.id = "main-modal";

        const modalHeaderCloseBtn = document.createElement("button");
        modalHeaderCloseBtn.type = "button";
        modalHeaderCloseBtn.className = "btn-close btn-close-white";
        modalHeaderCloseBtn.setAttribute("data-bs-dismiss", "modal");
        modalHeaderCloseBtn.setAttribute("aria-label", "Close");

        const modalHeaderContainer = document.createElement("div");
        modalHeaderContainer.className = "modal-header";
        modalHeaderContainer.appendChild(modalHeaderText);
        modalHeaderContainer.appendChild(modalHeaderCloseBtn);

        // modal body
        const modalBodyContainer = document.createElement("div");
        modalBodyContainer.id = "modal-text";
        modalBodyContainer.className = "modal-body";

        // modal footer
        const likeBtnIcon = document.createElement("i");
        likeBtnIcon.id = "likeicon";
        likeBtnIcon.className = "far fa-heart";

        // like button
        const likeBtn = document.createElement("button");
        likeBtn.id = "like-post-btn";
        likeBtn.type = "button";
        likeBtn.className = "btn btn-dark";

        likeBtn.appendChild(likeBtnIcon);

        // comment input area
        const commentForm = document.createElement("form");
        commentForm.className = "w-100";

        const commentInputGroup = document.createElement("div");
        commentInputGroup.className = "input-group";
        commentInputGroup.id = "comment-input-container";

        const commentInput = document.createElement("input");
        commentInput.type = "text";
        commentInput.className =
            "form-control form-control-md mb-2 comment-input-text";
        commentInput.placeholder = "Comment";

        const commentInputBtnContainer = document.createElement("span");
        commentInputBtnContainer.className = "input-group-btn";

        const commentInputBtn = document.createElement("button");
        commentInputBtn.className =
            "btn btn-dark btn-outline-light comment-input-button ms-0";
        commentInputBtn.type = "submit";

        const commentInputIcon = document.createElement("i");
        commentInputIcon.className = "fas fa-paper-plane px-0";

        commentInputBtn.appendChild(commentInputIcon);
        commentInputBtnContainer.appendChild(commentInputBtn);
        commentInputGroup.appendChild(commentInput);
        commentInputGroup.appendChild(commentInputBtnContainer);

        commentForm.appendChild(commentInputGroup);

        // footer close button
        const modalFooterCloseBtn = document.createElement("button");
        modalFooterCloseBtn.type = "button";
        modalFooterCloseBtn.className = "btn btn-dark";
        modalFooterCloseBtn.setAttribute("data-bs-dismiss", "modal");
        modalFooterCloseBtn.innerText = "Close";

        // footer container
        const modalFooterContainer = document.createElement("div");
        modalFooterContainer.id = "modal-footer";
        modalFooterContainer.className = "modal-footer";

        modalFooterContainer.appendChild(commentForm);
        modalFooterContainer.appendChild(likeBtn);
        modalFooterContainer.appendChild(modalFooterCloseBtn);

        // modal content container
        const modalContentContainer = document.createElement("div");
        modalContentContainer.className = "modal-content";
        modalContentContainer.appendChild(modalHeaderContainer);
        modalContentContainer.appendChild(modalBodyContainer);
        modalContentContainer.appendChild(modalFooterContainer);

        // modal dialog
        const modalDialog = document.createElement("div");
        modalDialog.className = "modal-dialog modal-dialog-scrollable";
        modalDialog.appendChild(modalContentContainer);

        const modalContainer = document.createElement("div");
        modalContainer.className = "modal fade";
        modalContainer.id = "modal";
        modalContainer.tabIndex = "-1";
        modalContainer.setAttribute("aria-labelledby", "main-modal");
        modalContainer.setAttribute("aria-hidden", "true");
        modalContainer.appendChild(modalDialog);

        return modalContainer;
    },
};
