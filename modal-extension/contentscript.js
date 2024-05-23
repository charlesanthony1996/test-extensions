// Append modal HTML to the current page
const modalHTML = `
<div id="myModal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <p>Some text in the Modal...</p>
  </div>
</div>
<button id="openModalButton">Open Modal</button>
`;
document.body.insertAdjacentHTML('beforeend', modalHTML);

// Access the modal and the button
const modal = document.getElementById("myModal");
const btn = document.getElementById("openModalButton");
const span = document.getElementsByClassName("close")[0];

// Button to open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// Span element to close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// Close modal when clicking outside of it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}


const css = `
.modal {
  display: none;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

button#openModalButton {
  position: fixed;
  top: 10px;
  right: 10px;
  padding: 10px 20px;
}
`

const styleSheet = document.createElement("style")
styleSheet.type = "text/css"
styleSheet.innerText = css
document.head.appendChild(styleSheet)
