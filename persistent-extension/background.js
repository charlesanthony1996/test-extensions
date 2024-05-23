// Handles creating a new popup window -> side panel
chrome.action.onClicked.addListener((tab) => {
    chrome.windows.create({
        url: chrome.runtime.getURL("popup.html"),
        type: "popup",
        width: 400,
        height: 600
    });
});

// Alternative approach, opening a new tab
// chrome.action.onClicked.addListener(() => {
//     chrome.tabs.create({ url: chrome.runtime.getURL("popup.html") });
// });
