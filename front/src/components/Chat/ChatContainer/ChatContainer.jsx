import React, { useState, useEffect } from "react";
import ChatMessage from "../ChatMessage/ChatMessage";
import ChatInput from "../ChatInput/ChatInput";
import axios from 'axios';

import './ChatContainer.css';

export default function ChatContainer() {
    const [messages, setMessages] = useState([]);

    // Carregar o histórico antes de carregar o componente
    useEffect(() => {
        const fetchMessageHistory = async () => {
            try {
                const apiUrl = 'http://localhost:3001/api/message';
                const response = await axios.get(apiUrl);
                setMessages(response.data);
            } catch (error) {
                console.error('Erro ao buscar histórico de mensagens:', error);
            }
        };

        fetchMessageHistory();
    }, []); // O array vazio faz com que o efeito seja executado apenas uma vez, quando o componente é montado

    const handleUserMessage = async (text) => {
        const userMessage = { text, usertype: 'user' };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        console.log("Enviando mensagem do usuário para o GPT:", text);
        await callGPT(text);
    };

    const callGPT = async (text) => {
        try {
            const apiUrl = 'http://localhost:3001/api/message';
            const response = await axios.post(apiUrl, { prompt: text }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Resposta recebida do GPT:", response.data.choices[0].message.content.trim());
            const assistantMessage = { text: response.data.choices[0].message.content.trim(), usertype: 'assistant' };
            setMessages(prevMessages => [...prevMessages, assistantMessage]);
        } catch (error) {
            console.error('Erro ao solicitar ao GPT:', error);
        }
    };

    return (
        <div className="main-chat-container">
            <div className="chat-content">
                {messages.map((message, index) => (
                    <ChatMessage key={index} usertype={message.usertype}>
                        {message.text}
                    </ChatMessage>
                ))}
            </div>
            <ChatInput onSubmit={handleUserMessage} />
        </div>
    );
};
