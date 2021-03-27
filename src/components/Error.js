// renders static html elements for the error page
const Error = {
    render: () => {
        const text = document.createElement("div");
        text.className = "display-1 text-center feed";
        text.innerText = "Page does not exist";
        return text;
    },
};
