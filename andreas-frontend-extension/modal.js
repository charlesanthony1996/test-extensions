// Define the modal HTML
const modalHTML = `
<div id="myModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h1 class="modal-text">Counter speech</h1>
        <p id="counterSpeechText" class="modal-counter"></p>
        <button id="copy" class="modal-btn">Copy</button>
        <button id="reply" class="modal-btn-reply">Reply</button>
        <button id="generateCounterSpeech" class="modal-btn-gen">Generate Counter speech</button>
    </div>
</div>
<button id="openModalButton" class="open-modal-button">Open Modal</button>
`;

// Insert the modal HTML into the document
document.body.insertAdjacentHTML("beforeend", modalHTML);

// Get references to the modal elements
const modal = document.getElementById("myModal");
const btn = document.getElementById("openModalButton");
const span = document.getElementsByClassName("close")[0];
const copy = document.getElementById("copy");
const reply = document.getElementById("reply");

// Add event listeners to the modal elements
span.onclick = function() {
    modal.style.display = "none";
    document.getElementById("counterSpeechText").innerText = "";
};

btn.onclick = function() {
    modal.style.display = "block";
};

copy.onclick = function() {
    console.log("copied");
};

reply.onclick = function() {
    console.log("replied");
};

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
        document.getElementById("counterSpeechText").innerText = "";
    }
};
