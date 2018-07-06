import React, { Component } from 'react';

// Components

// Assets
import './header.css';

class Header extends Component {
    render() {
      return (
        <header>
            <nav className="navbar navbar-fixed-top navbar-default nav-content">
                <div className="container">
                <div className="lg">
                    <img src="img/cupido3.png" id="logo" className="logo" alt />
                </div>
                <div className="search">
                    <form action="#" method="POST">
                    <input type="text" className="form-control text-search" placeholder="Buscar" />
                    </form>
                </div>
                {/*Iconos del Menu*/}
                <div className="iconos">
                    <ul className="nav navbar-nav"> 
                    <li><a href="#"><i className="fa fa-home icono" /></a></li>
                    <li><a href="#"><i className="fa fa-heart icono" /></a></li>
                    <li><a href="#"><i className="fa fa-user icono" /></a></li>
                    </ul>
                </div>
                </div>
            </nav>
        </header>
      );
    }
  }
  
  export default Header;