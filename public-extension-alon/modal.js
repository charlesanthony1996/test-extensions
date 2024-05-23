//import { explain_hate_speech, analyzeCommentAndDisplayCounterSpeech } from "./apiInteraction";

const loadModalElements = async () => {

    const apiInteraction_script = chrome.runtime.getURL("/apiInteraction.js");
    const apiInteraction_script_content = await import(apiInteraction_script);
    const explain_hate_speech = apiInteraction_script_content.explain_hate_speech;
    const generateCounterSpeech = apiInteraction_script_content.generateCounterSpeech;

    const modal_html = chrome.runtime.getURL("/modal.html");
    const response = await fetch(modal_html);
    const modal_html_content = await response.text();
    document.body.insertAdjacentHTML('beforeend', modal_html_content);
    const modal = document.getElementById("myModal");
    const btn = document.getElementById("openModalButton");
    const genCounterSpeech = document.getElementById("generateCounterSpeech");
    const span = document.getElementsByClassName("close")[0];
    const copy = document.getElementById("copy");
    const reply = document.getElementById("reply");
    const explanation = document.getElementById("explanation");

    span.onclick = function() {
        modal.style.display = "none";
        document.getElementById("counterSpeechText").innerText = "";
        document.getElementById("commentText").innerText = "";
    };

    copy.onclick = function() {
        console.log("copied");
    };

    reply.onclick = function() {
        console.log("replied");
    };

    explanation.onclick = function() {
        const commentText = document.getElementById('commentText').innerText;
        explain_hate_speech(commentText);
        console.log("Comment Text:", commentText);
        console.log("explained");
    };

    genCounterSpeech.onclick = function() {
        const commentText = document.getElementById('commentText').innerText;
        generateCounterSpeech(commentText);
        console.log("Comment Text:", commentText);
        console.log("generated");
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
            document.getElementById("commentText").innerText = "";
            document.getElementById("counterSpeechText").innerText = "";
        }
    };

    return { btn, modal, span, copy, reply, explanation, genCounterSpeech };
};

const modalElementsPromise = loadModalElements();

export { modalElementsPromise };
