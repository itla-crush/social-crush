import React, { Component } from 'react';

// Assets
import './signup.css';
import '../../css/signin_signup.css';

class Signup extends Component {
        
    changeView = () => {
      this.props.changeView();
    }

    linkNoAction = (event) => {
      event.preventDefault();
    }

    render() {
      return (
        <div className="Signup">
            <div className="in-container-right">
              <h2><a href="#" onClick={this.changeView}>Iniciar Sesion</a> / <a href="#" onClick={this.linkNoAction} className="stronge">Registrar</a></h2>
              <form className="formulario" action>
                <div className="input-r">
                    <input className="dn" placeholder="Nombre" id="icon_prefix" type="text" />
                    <input placeholder="Apellidos" id="icon_prefix" type="text" className="validate" />	
                </div>
                <input placeholder="Nombre de usuario" id="icon_prefix" type="text" className="validate" />
                <input placeholder="Correo" id="icon_prefix" type="email" className="validate" />
                <input placeholder="Contraseña" id="icon_prefix" type="password" className="validate" />
                <input placeholder="Confirma Contraseña" id="icon_prefix" type="password" className="validate" />
                {/* <div class=""> */}
                <div className="boton">
                    <input type="submit" defaultValue="Regístrate" className="btn-registro" />
                </div>
                <div className="boton">
                  <input type="button" defaultValue="Invitado" className="btn2" /> 
                </div>
                {/* </div> */}
              </form>
            </div>
        </div>
      );
    }
  }
  
  export default Signup;