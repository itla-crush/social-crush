import React, { Component } from 'react';
import logo from '../img/logo.png';
import '../styles/css/Header.css';

class Header extends Component {
  render() {
    return (
      <header className="header">
      <nav className="navbar navbar-default" id="nav-header">
        <div className="container">
          <div className="lg">
            {/* Puse logo como id y no como clase ya que tiene un solo uso */}
            <img src={logo} id="logo" alt="" />
          </div>
          {/* Buscador */}
          <div id="buscar">
            <input type="text" className="form-control text-buscar" placeholder="Buscar" />
          </div>
          {/*Iconos del Menu*/}
          <div className="iconos">
            <ul className="nav navbar-nav">
              <li><a href="#"><i className="fas fa-home icono" /></a></li>
              <li><a href="#"><i className="fas fa-heart icono" /></a></li>
              <li><a href="#"><i className="fas fa-user icono" /></a></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    );
  }
}

export default Header;
