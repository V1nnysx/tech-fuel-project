import React from 'react';
import './Header.css';
import logoFuel from '../../assets/logo-techfuel.png';

export function Header() {
    return (
        <div className='header-style-container'>
            <header className='headerStyle'>
                <div className='logoStyle'>
                    <img src={logoFuel} alt="Logo" />
                </div>
                <nav className='navStyle'>
                    <ul className='listStyle'>
                        <li className='listItemStyle'><a href="/">Home</a></li>
                        <li className='listItemStyle'><a href="/">Alunos</a></li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}


