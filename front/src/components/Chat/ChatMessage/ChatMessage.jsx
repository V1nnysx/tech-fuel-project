import React from 'react';
import './ChatMessage.css'

export default function ChatMessage({usertype, children}){
    return (
        <div className={`message-container ${usertype}`}>
            <div className={`ChatMessage`}><p>{children}</p></div>
        </div>
    )
}