import React, { useState } from "react";
import './ChatInput.css';

export default function ChatInput({ onSubmit }) {
    const [inputText, setInputText] = useState("");

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSubmit();
        }
    };

    const handleChange = (event) => {
        setInputText(event.target.value);
    };

    const handleSubmit = () => {
        if (inputText.trim() !== "") {
            onSubmit(inputText.trim());
            setInputText(""); 
        }
    };

    return (
        <div className="chat-input-container">
            <input
                className="chat-input"
                placeholder="Digite sua mensagem..."
                value={inputText}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}
