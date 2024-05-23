// Function to handle reply button clicks and entering text in the editable area
function handleReplyInteraction() {
    // Find all the reply buttons in the comment section using a more specific selector
    const replyButtons = document.querySelectorAll('ytd-button-renderer#reply-button-end button');

    // Ensure there are reply buttons available to interact with
    if (replyButtons.length > 0) {
        // Click the first reply button
        setTimeout(() => {
            replyButtons[0].click()
        }, 7000)

        // Wait a bit to ensure that any necessary animations or loading processes are complete
        setTimeout(() => {
            // Select the content editable div by its unique ID
            const editableDiv = document.querySelector('#contenteditable-root');
            if (editableDiv) {
                editableDiv.focus(); // Focus on the editable div
                editableDiv.innerText = 'My name is sonic, and im just a fast hedgehog'; // Populate it with predefined text

                // Optionally, you can trigger an 'input' event to simulate user input (useful if the site has event listeners on the div)
                const event = new Event('input', {
                    bubbles: true,
                    cancelable: true,
                });
                editableDiv.dispatchEvent(event);
            }
        }, 10000); // Adjust this delay as needed based on the site's responsiveness
    }
}

// Function to delay the start of interactions
function delayInteractionStart() {
    setTimeout(() => {
        handleReplyInteraction(); // Start interactions after a delay

        // MutationObserver to manage dynamically loaded content, such as new comments or reply buttons
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1 && node.matches('ytd-button-renderer#reply-button-end button')) {
                        handleReplyInteraction(); // Reapply interactions for new elements
                    }
                });
            });
        });

        // Start observing the document body for additions to the DOM that match our criteria
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }, 3000); // Delay for 3 seconds before starting interactions
}

// Add an event listener to handle scrolling
window.addEventListener('scroll', handleReplyInteraction);

// Delay the interaction when the page loads
delayInteractionStart();






/* <div class="yt-spec-touch-feedback-shape__fill" style=""></div> */

{/* <button class="yt-spec-button-shape-next yt-spec-button-shape-next--text yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-s" aria-label="Reply" title="" style="">
    <div class="yt-spec-button-shape-next__button-text-content">
        <span class="yt-core-attributed-string yt-core-attributed-string--white-space-no-wrap" role="text">
            Reply
        </span>
    </div>
<yt-touch-feedback-shape style="border-radius: inherit;">
    <div class="yt-spec-touch-feedback-shape yt-spec-touch-feedback-shape--touch-response" aria-hidden="true">
        <div class="yt-spec-touch-feedback-shape__stroke" style="">
        </div>
        <div class="yt-spec-touch-feedback-shape__fill" style="">
        </div>
    </div>
</yt-touch-feedback-shape>
</button> */}


{/* <ytd-button-renderer id="reply-button-end" force-icon-button="true" class="style-scope ytd-comment-engagement-bar" button-renderer="" button-next="">
    <yt-button-shape>
        <button class="yt-spec-button-shape-next yt-spec-button-shape-next--text yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-s" aria-label="Reply" title="" style="">
            <div class="yt-spec-button-shape-next__button-text-content">
                <span class="yt-core-attributed-string yt-core-attributed-string--white-space-no-wrap" role="text">
                    Reply
                </span>
            </div>
        <yt-touch-feedback-shape style="border-radius: inherit;">
            <div class="yt-spec-touch-feedback-shape yt-spec-touch-feedback-shape--touch-response" aria-hidden="true">
                <div class="yt-spec-touch-feedback-shape__stroke" style="">
                </div>
                <div class="yt-spec-touch-feedback-shape__fill" style="">
                </div>
            </div>
        </yt-touch-feedback-shape>
        </button></yt-button-shape>
    <tp-yt-paper-tooltip offset="8" disable-upgrade="">
    </tp-yt-paper-tooltip>
</ytd-button-renderer> */}