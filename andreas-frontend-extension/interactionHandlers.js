import axios from 'axios';

export function useInteractionHandlers(props) {
  const closeDialog = () => {
    lastHighlightedText.value = '';
    window.getSelection().removeAllRanges();
    emit('close');
  };

  const copyToClipboard = () => {
    const textarea = document.createElement('textarea');
    textarea.value = props.analysisResult;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  };

  const generateCounterSpeech = async () => {
    if (lastHighlightedText.value.trim().length > 0) {
      try {
        const response = await axios.post('http://localhost:8000/api/filter', { text: lastHighlightedText.value.trim() });
        props.analysisResult = response.data.filtered_text;
      } catch (error) {
        console.error("Error sending text for filtering: ", error);
      }
    }
  };

  const handleReplyInteraction = () => {
    // Implementierung der Interaktion mit dem Kommentarfeld, z.B. Klick auf einen Antwort-Button.

      const generatedComment = props.analysisResult;
    
      const commentFieldSelector = '#contenteditable-root';
    
      const commentField = document.querySelector(commentFieldSelector);
    
      if (commentField) {
        commentField.innerText = generatedComment;
    
        const inputEvent = new Event('input', { bubbles: true });
        commentField.dispatchEvent(inputEvent);
    
        commentField.focus();
      } else {
        console.error('Error finding textfield');
      }    
  };

  return { closeDialog, copyToClipboard, generateCounterSpeech, handleReplyInteraction };
}