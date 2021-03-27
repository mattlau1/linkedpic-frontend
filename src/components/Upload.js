const Upload = {
    render: () => {
        // title
        const title = document.createElement("h1");
        title.className = "display-4 text-center";
        title.innerText = "Create Post";

        // horizontal rule
        const hr = document.createElement("hr");

        // description input box
        const descriptionLabel = document.createElement("label");
        descriptionLabel.setAttribute("for", "description");
        descriptionLabel.className = "form-label";
        descriptionLabel.innerText = "Post Description";

        const descriptionInput = document.createElement("input");
        descriptionInput.type = "text";
        descriptionInput.className = "form-control form-control-md mb-4";
        descriptionInput.id = "description";

        const descriptionFormGroup = document.createElement("div");
        descriptionFormGroup.className = "form-group";

        const descriptionContainer = document.createElement("div");
        descriptionContainer.className = "col-md-12";

        descriptionFormGroup.appendChild(descriptionLabel);
        descriptionFormGroup.appendChild(descriptionInput);
        descriptionContainer.appendChild(descriptionFormGroup);

        // image input box
        const fileLabel = document.createElement("label");
        fileLabel.setAttribute("for", "file-input");
        fileLabel.className = "form-label";
        fileLabel.innerText = "Upload an Image";

        const fileInput = document.createElement("input");
        fileInput.setAttribute("accept", ".jpg, .jpeg, .png");
        fileInput.type = "file";
        fileInput.className = "form-control form-control-md mb-4";
        fileInput.id = "file-input";
        fileInput.type = "file";

        const fileFormGroup = document.createElement("div");
        fileFormGroup.className = "form-group";

        const fileContainer = document.createElement("div");
        fileContainer.className = "col-md-6";

        fileFormGroup.appendChild(fileLabel);
        fileFormGroup.appendChild(fileInput);
        fileContainer.appendChild(fileFormGroup);

        // image preview area
        const previewContainer = document.createElement("div");
        previewContainer.className = "col-md-12";

        const previewImg = document.createElement("img");
        previewImg.className = "w-50 mb-4 d-none";
        previewImg.id = "img-preview";
        previewImg.alt = "Image Preview";

        previewContainer.appendChild(previewImg);

        // upload button
        const uploadBtn = document.createElement("button");
        uploadBtn.id = "upload-btn";
        uploadBtn.type = "submit";
        uploadBtn.className = "btn btn-dark text-center btn-outline-light";
        uploadBtn.innerText = "Upload";

        const uploadFormGroup = document.createElement("div");
        uploadFormGroup.className = "form-group";

        const uploadContainer = document.createElement("div");
        uploadContainer.className = "col-md-12";

        uploadFormGroup.appendChild(uploadBtn);
        uploadContainer.appendChild(uploadFormGroup);

        // form
        const form = document.createElement("form");
        form.id = "upload-form";
        form.appendChild(descriptionContainer);
        form.appendChild(fileContainer);
        form.appendChild(previewContainer);
        form.appendChild(uploadContainer);

        // form container
        const formContainer = document.createElement("div");
        formContainer.className = "col-md-6";

        formContainer.appendChild(title);
        formContainer.appendChild(hr);
        formContainer.appendChild(form);

        // left and right column gaps
        const leftColGap = document.createElement("div");
        leftColGap.className = "col-md-3";

        const rightColGap = document.createElement("div");
        rightColGap.className = "col-md-3";

        // page container row
        const pgContainerRow = document.createElement("div");
        pgContainerRow.className = "row justify-content-center pb-2 pt-2";
        pgContainerRow.appendChild(leftColGap);
        pgContainerRow.appendChild(formContainer);
        pgContainerRow.appendChild(rightColGap);

        // page container
        const pgContainer = document.createElement("div");
        pgContainer.className = "container-md-12";
        pgContainer.appendChild(pgContainerRow);

        // actual pge
        const page = document.createElement("div");
        page.id = "upload";
        page.className = "container-md justify-content-center feed";

        page.appendChild(pgContainer);

        return page;
    },
};
