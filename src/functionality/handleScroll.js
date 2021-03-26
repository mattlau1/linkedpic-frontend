import { loadFeed } from "./handleFeed.js";
import { createAlert } from "../helpers.js";

// handles scroll event for infinite scroll (for feed only)
export const handleScroll = () => {
    const feed = document.getElementById("feed");
    const body = document.querySelector("body");
    const token = localStorage.getItem("token");

    // if we are at the bottom of the page
    // remove event listener so we don't load multiple times
    // and then load the feed
    if (body.scrollTop + body.clientHeight >= feed.scrollHeight - 5) {
        body.removeEventListener("scroll", handleScroll);
        createAlert("Loading more posts...", "info");
        loadFeed(window.start, window.feedFetchLimit, window.api, token);
    }
};
