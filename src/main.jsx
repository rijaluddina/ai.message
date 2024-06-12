import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import AvatarContextProvider from "./context/AvatarContext"
import GroqContextProvider from './context/GroqContext'
import ChatContextProvider from './context/ChatContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChatContextProvider>
        <GroqContextProvider>
          <AvatarContextProvider>
            <App />
          </AvatarContextProvider>
        </GroqContextProvider>
      </ChatContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
