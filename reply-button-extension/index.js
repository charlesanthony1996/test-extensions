let commentButtonPairs = []; // Variable to store the comment-button pairs

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'updateComments') {
        updateComments(message.comments);
    } else if (message.action === 'commentButtonPairs') {
        commentButtonPairs = message.data;
        console.log('Received commentButtonPairs:', commentButtonPairs);
    }
});

// Function to update the HTML with latest comments
function updateComments(comments) {
    const commentsList = document.getElementById('commentsList');
    if (!commentsList) {
        console.error('Comments list not found. Extension context may be invalidated.');
        return;
    }
    commentsList.innerHTML = '';

    comments.forEach(comment => {
        const listItem = document.createElement('li');
        listItem.textContent = comment;
        listItem.addEventListener('click', () => {
            // Find the corresponding reply button for the clicked comment
            const pair = commentButtonPairs.find(pair => pair.commentText === comment);
            if (pair) {
                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    chrome.scripting.executeScript({
                        target: { tabId: tabs[0].id },
                        func: clickReplyButton,
                        args: [pair.replyButton]
                    });
                });
            } else {
                console.error('Reply button not found for the clicked comment.');
            }
        });
        commentsList.appendChild(listItem);
    });
}

// Function to click the reply button
function clickReplyButton(replyButtonHTML) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = replyButtonHTML;
    const replyButton = tempDiv.firstChild;
    if (replyButton) {
        replyButton.click();
    }
}
