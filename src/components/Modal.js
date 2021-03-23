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

        const likeBtn = document.createElement("button");
        likeBtn.id = "like-post-btn";
        likeBtn.type = "button";
        likeBtn.className = "btn btn-dark";

        likeBtn.appendChild(likeBtnIcon);

        const modalFooterCloseBtn = document.createElement("button");
        modalFooterCloseBtn.type = "button";
        modalFooterCloseBtn.className = "btn btn-dark";
        modalFooterCloseBtn.setAttribute("data-bs-dismiss", "modal");
        modalFooterCloseBtn.innerText = "Close";

        const modalFooterContainer = document.createElement("div");
        modalFooterContainer.id = "modal-footer";
        modalFooterContainer.className = "modal-footer";

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
