document.addEventListener('DOMContentLoaded', () => {
  const messagesDiv = document.getElementById('messages');
  const messageForm = document.getElementById('messageForm');
  const senderInput = document.getElementById('sender');
  const textInput = document.getElementById('text');
  const deleteChatsButton = document.getElementById('deleteChats');
  const deleteChatsByNameButton = document.getElementById('deleteChatsByName');

  // Function to fetch messages from the server
  function fetchMessages() {
    fetch('/api/messages')
      .then(response => response.json())
      .then(messages => {
        // Clear existing messages
        messagesDiv.innerHTML = '';

        // Append new messages to the messagesDiv
        messages.forEach(message => {
          appendMessage(message);
        });
      });
  }

  // Function to append a message to the messagesDiv
  function appendMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.innerHTML = `<strong>${message.sender}:</strong> ${message.text}`;
    
    // Add a class to the message container based on the sender
    messageDiv.classList.add(message.sender.toLowerCase());

    messagesDiv.appendChild(messageDiv);
  }

  // Fetch messages when the page loads
  fetchMessages();

  // Periodically fetch messages every 5 seconds (adjust as needed)
  setInterval(fetchMessages, 5000);

  // Handle form submission
  messageForm.addEventListener('submit', (event) => {
    event.preventDefault();

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

  // Handle delete all chats button click
  deleteChatsButton.addEventListener('click', () => {
    // Ask for confirmation
    const shouldDelete = window.confirm('Are you sure you want to delete all chats?');

    if (shouldDelete) {
      // Send a request to the server to delete all chats
      fetch('/api/messages', {
        method: 'DELETE',
      })
      .then(() => {
        // Refresh the messages after deletion
        fetchMessages();
      });
    }
  });

  // Handle delete chats by name button click
  deleteChatsByNameButton.addEventListener('click', () => {
    // Prompt for the sender's name to delete chats
    const senderNameToDelete = prompt('Enter the sender\'s name to delete their chats:');
  
    if (senderNameToDelete) {
      // Send a request to the server to delete chats by name
      fetch(`/api/messagesByName?sender=${encodeURIComponent(senderNameToDelete)}`, {
        method: 'DELETE',
      })
      .then(() => {
        // Refresh the messages after deletion
        fetchMessages();
      });
    }
  });
});
