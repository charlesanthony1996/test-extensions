chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension Installed");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'triggerReply' && message.index !== undefined) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: handleReplyInteraction,
                args: [message.index]
            });
        });
    } else if (message.action === 'updateComments') {
        chrome.runtime.sendMessage(message);
    }
});

function handleReplyInteraction(index) {
    const replyButtons = document.querySelectorAll('ytd-button-renderer#reply-button-end button');

    if (replyButtons.length > index) {
        replyButtons[index + 1].click();

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
        }, 500)
    }
}
