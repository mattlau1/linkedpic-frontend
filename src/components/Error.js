const Error = {
    render: () => {
        const text = document.createElement("div");
        text.className = "display-1";
        text.innerText = "Page does not exist";
        text.style.backgroundColor = "black";

        return text;
    },
};
