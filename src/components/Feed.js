// renders static html elements for the feed page
const Feed = {
    render: () => {
        const feed = document.createElement("div");
        feed.id = "feed";
        feed.className = "container-md justify-content-center feed";
        return feed;
    },
};
