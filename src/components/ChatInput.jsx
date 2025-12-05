import { useState } from 'react'
import { Chatbot } from 'supersimpledev';
import './ChatInput.css'

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (isLoading || inputText === "") {
      return;
    }

    setIsLoading(true);

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
      },
    ];

    setChatMessages(newChatMessages);
    setChatMessages([
      ...newChatMessages,

      {
        message: "laoding...",
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);

    setIsLoading(false);

    setInputText("");
  }

  function SendOnEnter(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
    if (event.key === "Escape") {
      setInputText("");
    }
  }

  function ClearMessages () {
    setChatMessages([])
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a Message to Chatbot"
        size="30"
        onChange={saveInputText}
        value={inputText}
        onKeyDown={SendOnEnter}
        className="chat-input"
      />
      <button onClick={sendMessage} className="send-button">
        Send
      </button>
      <button onClick= {ClearMessages} className='clear-button' >Clear</button>
    </div>
  );
}
