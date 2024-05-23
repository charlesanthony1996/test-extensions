// Create a new iframe element
const iframe = document.createElement('iframe');
iframe.style.position = "fixed";
iframe.style.top = "50%";
iframe.style.left = "50%";
iframe.style.transform = "translate(-50%, -50%)";
iframe.style.width = "640px"; // Set the width of the iframe
iframe.style.height = "480px"; // Set the height of the iframe
iframe.style.border = "3px solid black";
iframe.style.zIndex = "10000";
iframe.src = chrome.runtime.getURL("chrome-extension://ekkmpbahjaopnkbmbcbboaoiklmhgkom/popup.html"); // The URL of the HTML file to display in the iframe

// Append the iframe to the body of the document
document.body.appendChild(iframe);
