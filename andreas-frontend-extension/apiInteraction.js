export function analyzeCommentAndDisplayCounterSpeech(commentText) {
    fetch('http://localhost:6001/api/analyze_hate_speech', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: commentText })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('counterSpeechText').innerText = data.analysis_result || "No hate speech detected.";
        document.getElementById("myModal").style.display = "block";
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
