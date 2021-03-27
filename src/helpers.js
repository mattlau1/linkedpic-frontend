import { loadFeed } from "./functionality/handleFeed.js";

// gets current username from navbar href
export const getCurrentUsername = () => {
    const profileUrl = document.getElementById("navbar-profile");
    const urlSplit = profileUrl.href.split("/");
    return urlSplit[urlSplit.length - 1];
};

// creates an alert with given text and type that times out after
// a set duration
export const createAlert = (text, type) => {
    const area = document.getElementById("alert-area");
    const newAlert = document.createElement("div");
    newAlert.classList.add("alert");
    newAlert.classList.add("alert-dismissible");
    newAlert.classList.add("fade");
    newAlert.classList.add("show");

    // alert-danger, alert-success etc.
    newAlert.classList.add(`alert-${type}`);

    newAlert.innerText = text;
    area.appendChild(newAlert);
    const bsAlert = new bootstrap.Alert(newAlert);
    const duration = 3000;
    setTimeout(() => {
        bsAlert.close();
    }, duration);
};

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
        loadFeed(window.start, window.feedFetchLimit, token);
    }
};

// formats current time and date from given unix timestamp
export const getDate = (time) => {
    const date = new Date(time * 1000);
    const postDay = date.getDate();
    const postMonth = date.getMonth() + 1;
    const postYear = date.getFullYear();
    let postHours = date.getHours();
    let postMins = date.getMinutes();
    const postAmPm = postHours >= 12 ? "PM" : "AM";
    postHours %= 12;
    postHours = postHours ? postHours : 12;
    postMins = postMins < 10 ? "0" + postMins : postMins;

    return `${postDay}/${postMonth}/${postYear} ${postHours}:${postMins} ${postAmPm}`;
};
