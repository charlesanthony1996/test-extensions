let btn;
let modal;
let span;
let reply;
let copy;
let explanation;

(async () => {
    // import modal script
    const modal_script = chrome.runtime.getURL("/modal.js");
    const modal_script_content = await import(modal_script);
    const modalElementsPromise = modal_script_content.modalElementsPromise;

    modalElementsPromise.then(modalElements => {
        btn = modalElements.btn;
        modal = modalElements.modal;
        span = modalElements.span;
        reply = modalElements.reply;
        copy = modalElements.copy;
        explanation = modalElements.explanation;
    });

    //import interactionHandlers script
    const interactionHandlers_script = chrome.runtime.getURL("/interactionHandlers.js");
    const interactionHandlers_script_content = await import(interactionHandlers_script);
    const appendButtonToComment = interactionHandlers_script_content.appendButtonToComment;
    
    //import interactionHandlers script
    const apiInteraction_script = chrome.runtime.getURL("/apiInteraction.js");
    const apiInteraction_script_content = await import(apiInteraction_script);
    const sendCommentToServer = apiInteraction_script_content.sendCommentToServer;
    const analyze_hate_speech = apiInteraction_script_content.analyze_hate_speech;

    const observedComments = new Set()

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                observedComments.add(entry.target);
                //analyze_hate_speech(entry.target.innerText) doesn't work correctly in the openai_backend
                sendCommentToServer(entry.target.innerText)
                    .then(result => {
                        console.log('Filter Result:', result); // Log the value of result
                        if (result !== 'Is not HS') {
                            entry.target.style.backgroundColor = 'lightcoral';
                        } else {
                            entry.target.style.backgroundColor = 'darkolivegreen'
                        }
                    })
                    .catch(error => {
                        console.error('Error sending comment to server:', error);
                    });
                appendButtonToComment(entry.target, btn, modal); // Ensure the button is appended to each comment
            } else {
                observedComments.delete(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    document.querySelectorAll('.yt-core-attributed-string.yt-core-attributed-string--white-space-pre-wrap')
        .forEach(comment => {
            observer.observe(comment)
        });

    window.addEventListener('scroll', () => {
        document.querySelectorAll('.yt-core-attributed-string.yt-core-attributed-string--white-space-pre-wrap')
            .forEach(comment => 
                {observer.observe(comment)
            })
    });
})();

window.onload = () => {
    console.log("Window loaded");
};

//document.querySelectorAll('.comment').forEach(comment => appendButtonToComment(comment));

//Marking Hate Speech Ourselves
// document.addEventListener('mouseup', function() {
//     const selection = window.getSelection();
//     const selectedText = selection.toString().trim();
//     if (selectedText.length > 0) {
//         fetch('http://localhost:8000/api/filter', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ text: selectedText })
//         })
//         .then(response => response.json())
//         .then(data => {
//             //alert("Analysis Result: " + data.filtered_text);
//             selection.removeAllRanges();  // Unhighlight the text
//         })
//         .catch(error => console.error('Error:', error));
//     }
// });