import React from 'react';
import './Content.css';

import logoFull from '../../assets/logo-techfuel-full.png'

export function Content() {
  return (
    <div className='Main-container-content'>
      <div className='Main-content'>
        <h1><img src={logoFull} alt="Tech Fuel" /></h1>
        <h2>Sua principal plataforma de notícias automobilísticas!</h2>
      </div>
    </div>
  );
}
