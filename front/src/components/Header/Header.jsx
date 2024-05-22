import React from 'react';
import './Header.css';
import logoFuel from '../../assets/logo-techfuel.png';

export function Header() {
    return (
        <div className='header-style-container'>
            <header className='headerStyle'>
                <div className='logoStyle'>
                    <a href="https://github.com/V1nnysx/tech-fuel-project" target="_blank">
                        <img src={logoFuel} alt="Logo" />
                    </a>
                </div>
                <nav className='navStyle'>
                    <ul className='listStyle'>
                        <li className='listItemStyle'><a href="/" className='headerNames'>Home</a></li>
                        <li className='listItemStyle'><a href="/" className='headerNames'>Alunos</a></li>
                        <li className='listItemStyle'><a href="/" className='headerNames'>Sobre</a></li>
                        <li className='listItemStyle'><a href="/" className='headerNames'>Chat</a></li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}


