import React from 'react';
import './Content.css';

import ChatContainer from '../Chat/ChatContainer/ChatContainer';

import logoFull from '../../assets/logo-techfuel-full.png'

export function Content() {
  return (
        <div className='mid-section'>
          <ChatContainer></ChatContainer>
        </div>
  );
}
