import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Assets
import './signin.css';
import '../../css/signin_signup.css';

class Signin extends Component {
    
    changeView = () => {
      this.props.changeView();
    }

    linkNoAction = (event) => {
      event.preventDefault();
    }

    render() {
      return (
        // <div className="Signin">
            <div className="in-container-right">
              <h2><a href="#" onClick={this.linkNoAction} className="stronge">Iniciar Sesion</a> / <a href="#" onClick={this.changeView}>Registrar</a></h2>
              <form className="formulario" action>
                <div className="input">
                  <i className="Large material-icons prefix">account_circle</i>
                  <input placeholder="Correo" id="icon_prefix" type="email" className="validate" required />
                </div>
                <div className="input">
                  <i className="material-icons prefix">lock_open</i>
                  <input placeholder="Contraseña" id="last_name" type="password" className="validate" required />
                </div>
                <div className="boton">
                  <input type="submit" defaultValue="Iniciar Sesion" className="btn-iniciar-sesion" /> 
                </div>
                <div className="boton">
                  <input type="button" defaultValue="Invitado" className="btn2" /> 
                </div>
              </form>
              <div className="olvidar">
                <div className="olvidar-2">
                  <a href="#">¿Olvidaste tu contraseña?</a>
                </div>
              </div>
            </div>
        // </div>
      );
    }
  }
  
  export default Signin;