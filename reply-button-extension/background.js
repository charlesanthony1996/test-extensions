chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension Installed");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'triggerReply') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: handleReplyInteraction
            });
        });
    }
});

function handleReplyInteraction() {
    const replyButtons = document.querySelectorAll('ytd-button-renderer#reply-button-end button');

    if (replyButtons.length > 0) {
        replyButtons[0].click();

        setTimeout(() => {
            const editableDiv = document.querySelector('#contenteditable-root');
            if (editableDiv) {
                editableDiv.focus();
                editableDiv.innerText = 'Hello World';

                const event = new Event('input', {
                    bubbles: true,
                    cancelable: true,
                });
                editableDiv.dispatchEvent(event);
            }
        }, 3000); // Adjust the delay as needed
    }
}
