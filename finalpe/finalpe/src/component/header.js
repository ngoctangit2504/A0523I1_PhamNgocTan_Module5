import React from 'react';
import { Link } from "react-router-dom";


function Header() {
    return (
        <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/books">Car store</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
        <li className="nav-item">
        <a className='nav-link' href='/books' >Home</a>
        </li>
        <li className="nav-item">
        <a className="nav-link" href="#">About</a>
        </li>
        <li className="nav-item">
        <a className="nav-link" href="#">Services</a>
        </li>
        <li className="nav-item">
        <a className="nav-link" href="#">Contact</a>
        </li>
        </ul>
        </div>
        </nav>
        </header>
);
}

export default Header;