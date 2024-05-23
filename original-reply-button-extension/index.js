chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'updateComments') {
        const commentList = document.getElementById('commentList');
        commentList.innerHTML = ''; // Clear the list

        message.comments.forEach((comment, index) => {
            const listItem = document.createElement('li');
            listItem.innerText = comment;
            listItem.dataset.index = index;
            listItem.classList.add('comment-item');
            commentList.appendChild(listItem);
        });
    }
});

document.getElementById('commentList').addEventListener('click', (event) => {
    if (event.target.classList.contains('comment-item')) {
        const index = event.target.dataset.index;
        chrome.runtime.sendMessage({ action: 'triggerReply', index: parseInt(index) });
    }
});
