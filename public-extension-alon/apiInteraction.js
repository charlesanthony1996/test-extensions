// needs to be implemented TODO
function analyze_hate_speech(commentText) {
    fetch('http://localhost:8000/api/analyze_hate_speech', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: commentText })
    })
    .then(response => response.json())
    .then(data => {
        console.log('LLM Hate Speech Analysis:', data.analysis_result);
        //return data.analysis_result;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

const generateCounterSpeech = (commentText) => {
    // Send the text to the backend to analyze and generate counter speech
    fetch('http://localhost:8000/api/generate_counter_speech', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: commentText }) // Sending the displayed comment text
    })
    .then(response => response.json())
    .then(data => {
        // Check the response for counter speech or indication of no hate speech
        if (data.counter_speech_result) {
            // Display the generated counter speech in the modal
            document.getElementById('counterSpeechText').innerText = data.counter_speech_result;
        } else {
            // If no counter speech is generated, display a no hate speech message
            document.getElementById('counterSpeechText').innerText = "No counter speech generated.";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('counterSpeechText').innerText = "Error generating counter speech.";
    });
}

const explain_hate_speech = (commentText) => {
    fetch('http://localhost:8000/api/explain_comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: commentText }) // Sending the displayed comment text
    })
    .then(response => response.json())
    .then(data => {
        // Check the response for counter speech or indication of no hate speech
        if (data.explanation_text) {
            // Display the generated counter speech in the modal
            const explanationText = document.createElement("p");
            explanationText.innerText = data.explanation_text;
            document.getElementById('counterSpeechText').appendChild(explanationText);
        } else {
            // If no counter speech is generated, display a no hate speech message
            document.getElementById('counterSpeechText').innerText = "No explanation given.";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('counterSpeechText').innerText = "Error generating an explanation.";
    });
};

const sendCommentToServer = (commentText) => {
    return new Promise((resolve, reject) => {
        fetch('http://127.0.0.1:8000/api/process_comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comment: commentText })  // Sending single comment with key 'comment'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the response JSON
        })
        .then(data => {
            resolve(data.comment); // Resolve with the comment from the response
        })
        .catch(error => {
            console.error('Error sending comment to server:', error);
            reject(error);
        });
    });
};

export {explain_hate_speech, sendCommentToServer, generateCounterSpeech, analyze_hate_speech};

// "scripts"   : [
//     "background.js",
//     "apiInteraction.js",
//     "modal.js",
//     "main.js"
// ],