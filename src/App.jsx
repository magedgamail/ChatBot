import { useState, useEffect } from 'react'
import { Chatbot } from 'supersimpledev'
import { ChatInput } from './components/ChatInput'
import ChatMessages from './components/ChatMessages'
import './App.css'









function App() {

  const [chatMessages, setChatMessages] = useState((JSON.parse(localStorage.getItem('messages'))) || [{
    message: 'hello chatbot',
    sender: 'user',
    id: 'id1'
  },
  {
    message: "Hello! How can I help you ?",
    sender: "robot",
    id: 'id2'
  },
  {
    message: 'can you get todays date',
    sender: 'user',
    id: 'id3'
  },
  {
    message: 'Today is september 27?',
    sender: 'robot',
    id: 'id4'
  }])

  useEffect(() => {
    Chatbot.addResponses({
      "goodbye": 'Goodbye. Hve a greate day!',
      'give me a unique id': function () {
        return `Sure! Here's a unique ID: ${crypto.randomUUID()}`;
      }
    });
  },[]);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages))
  }, [chatMessages])


  return (
    <div className="app-container">

      <ChatMessages
        chatMessages={chatMessages}
      />
      <ChatInput
        isLoading
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}


export default App
