document.addEventListener('DOMContentLoaded', () => {
    const messagesDiv = document.getElementById('messages');
    const messageForm = document.getElementById('messageForm');
  
    // Fetch messages from the server
    fetch('/api/messages')
      .then(response => response.json())
      .then(messages => {
        messages.forEach(message => {
          appendMessage(message);
        });
      });
  
    // Handle form submission
    messageForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const senderInput = document.getElementById('sender');
      const textInput = document.getElementById('text');
  
      const sender = senderInput.value;
      const text = textInput.value;
  
      // Send message to the server
      fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sender, text }),
      })
      .then(response => response.json())
      .then(message => {
        appendMessage(message);
        senderInput.value = '';
        textInput.value = '';
      });
    });
  
    // Append a message to the messagesDiv
    function appendMessage(message) {
      const messageDiv = document.createElement('div');
      messageDiv.innerHTML = `<strong>${message.sender}:</strong> ${message.text}`;
      messagesDiv.appendChild(messageDiv);
    }
  });
  