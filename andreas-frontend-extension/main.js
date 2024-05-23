import './modal.js';
import './apiInteraction.js';

// Funktionen zum Anhängen von Buttons an Kommentare und andere dynamische Interaktionen
function appendButtonToComment(commentElement) {
    if (!commentElement.hasAttribute("data-button-appended")) {
        const button = btn.cloneNode(true);
        button.onclick = function() {
            const commentText = commentElement.innerText.trim();
            document.getElementById("counterSpeechText").innerText = commentText;
            modal.style.display = "block";
        };
        commentElement.appendChild(button);
        commentElement.setAttribute("data-button-appended", "true");
    }
}

document.querySelectorAll('.comment').forEach(comment => appendButtonToComment(comment));