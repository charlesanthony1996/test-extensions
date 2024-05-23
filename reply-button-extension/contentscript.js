chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'triggerReply') {
        handleReplyInteraction();
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


// contentScript.js
let observedComments = new Set();
let commentButtonPairs = [];

// Observer callback to detect the visibility of comments
const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const comment = entry.target;
            const commentThread = comment.closest('ytd-comment-thread-renderer');
            const replyButton = commentThread.querySelector('ytd-button-renderer#reply-button-end button');

            if (replyButton) {
                const commentText = comment.innerText.trim();
                const existingPair = commentButtonPairs.find(pair => pair.commentText === commentText);

                if (!existingPair) {
                    commentButtonPairs.push({ commentText, replyButton: replyButton.outerHTML });
                }
            }
            observedComments.add(comment);
        } else {
            observedComments.delete(entry.target);
        }
    });

    const latestComments = Array.from(observedComments).slice(-5).map(comment => comment.innerText.trim());
    chrome.runtime.sendMessage({ action: "updateComments", comments: latestComments });
    chrome.runtime.sendMessage({ action: "commentButtonPairs", data: commentButtonPairs });
};

// Configuration of the observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

// Create an IntersectionObserver to observe the visibility of comments
const observer = new IntersectionObserver(observerCallback, observerOptions);

const observeComments = () => {
    const comments = document.querySelectorAll('.yt-core-attributed-string.yt-core-attributed-string--white-space-pre-wrap');
    comments.forEach(comment => observer.observe(comment));
};

// Start observing the comments
observeComments();

// Event listener to continue observing comments when scrolling
window.addEventListener('scroll', observeComments);

// Handle page navigation events
window.addEventListener('yt-navigate-finish', observeComments);

// Log the commentButtonPairs array before sending it
console.log('commentButtonPairs:', commentButtonPairs);

// Function to send message to the extension's frontend
function sendMessageToFrontend(action, data) {
    chrome.runtime.sendMessage({ action, data });
}
