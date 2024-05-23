// content.js
const panel = document.createElement('div');
panel.id = 'myExtensionSidePanel';
panel.innerHTML = `<div style="padding: 20px; color: white; background-color: #333;">Hello, this is your extension's side panel!</div>`;
document.body.appendChild(panel);

panel.style.position = 'fixed';
panel.style.top = '0';
panel.style.right = '0';
panel.style.width = '300px';
panel.style.height = '100vh';
panel.style.overflow = 'auto';
panel.style.zIndex = '9999';
panel.style.display = 'block';

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.command == "toggle") {
            var display = panel.style.display;
            panel.style.display = display === 'none' ? 'block' : 'none';
        }
    }
);
