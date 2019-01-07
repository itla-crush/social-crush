import React, { Component } from 'react';

import firebase from 'firebase';
import _ from 'lodash';
import swal from 'sweetalert';

// Assets
import './signin.css';
// import './modalpassword.css';
import '../../css/signin_signup.css';

class Signin extends Component {
    constructor(props) {
      super(props);

      this.noAction = this.noAction.bind(this);
      this.signInWithEmail = this.signInWithEmail.bind(this);
      this.handleGuest = this.handleGuest.bind(this);
      this.generatePassword = this.generatePassword.bind(this);
      this.showMessageError = this.showMessageError.bind(this);
      this.handleForgotPassword = this.handleForgotPassword.bind(this);
      this.handleResetPassword = this.handleResetPassword.bind(this);
    }

    generatePassword = () => {
      let chars = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
      let password = "";
      for (let i = 0; i < 16; i++) password += chars.charAt(Math.floor(Math.random()*chars.length)); 
      return password;
    }
    
    changeView = (e) => {
      e.preventDefault();
      this.props.changeView();
    }

    noAction = (event) => {
      event.preventDefault();
    }

    signInWithEmail = (event) => {
      event.preventDefault();
      let email = document.getElementById('emailLogin').value;
      let password = document.getElementById('passwordLogin').value;
      if(!_.isEmpty(_.trim(email))) {
        if(!_.isEmpty(_.trim(password))) {
          firebase.auth().signInWithEmailAndPassword(email, password)
          .catch(error => {
            if(error) {
              this.showMessageError(error.code, error.message);
            } else {
              window.location.replace("/home");
            }
          });
        } else {
          // console.log('Debe proporcionar su contraseña');
          // alert('Debe proporcionar su contraseña');
          swal("Alerta!", "Debes proporcionar la contraseña.", "info");
        }
      } else {
        // console.log('Debe proporcionar un email');
        // alert('Debe proporcionar un email');
        swal("Alerta!", "Debes proporcionar un email.", "info");
      }
    }

    handleGuest = () => {
      firebase.auth().signOut();
    }

    handleResetPassword = (value) => {
        var emailForgotPassword = _.trim(value);

        if(!_.isEmpty(emailForgotPassword)) {
            firebase.auth().sendPasswordResetEmail(emailForgotPassword).then(() => {
                swal("Enlace enviado!", "Chequea tu correo para restablecer la contraseña.", "success"); 
            })
            .catch(error => {
              // Error occurred. Inspect error.code.
              var message = '';
                switch (error.code) {
                  case 'auth/invalid-email':
                    message = 'El correo introducido no es válido.';
                    break;
                  case 'auth/user-not-found':
                    message = 'Usuario no encontrado.';
                    break;
                  default:
                    message = error;
                    break;
                }
                console.log(error);
                swal("Error!", message, "error"); 
            });

        } else {
            swal("Alerta!", "Debes escribir tu correo", "info"); 
        }
    }

    showMessageError = (code, text) => {
      var message = '';

      switch (code) {
        case "auth/invalid-email":
          message = 'El correo no es válido.';
          break;
        case "auth/wrong-password":
          message = 'La contraseña es incorrecta.';
          break;
        case "auth/user-not-found":
          message = 'Este usuario no existe.';
          break;
        default:
          message = text;
          break;
      }
      console.log(message);
      // alert(message);
        swal("Error!", message, "error");
    }

    handleForgotPassword = (e) => {
      e.preventDefault();
      swal({
        title: "¿Olvidaste tu contraseña?",
        text: "Escribe tu correo y te enviaremos un enlace que te permitirá restablecer tu contraseña.",
        content: "input",
        buttons: ["Cancelar", "Enviar"],
      })
      .then((value) => {
        if(value) {
          // swal(`You typed: ${value}`);
          this.handleResetPassword(value);
        }
      });
    }

    render() {
      return (
        // <div className="Signin">
            <div className="in-container-right">
              <h2 style={{marginBottom: "50px"}}><a href="#" onClick={this.noAction} className="stronge">Iniciar Sesion</a> / <a href="#" onClick={this.changeView}>Registrar</a></h2>
              <form className="formulario form-1" onSubmit={this.signInWithEmail}>
                <div className="input" style={{marginBottom: "15px"}}>
                  <i className="Large material-icons prefix">account_circle</i>
                  <input id="emailLogin" placeholder="Correo" type="email" className="validate" required />
                </div>
                <div className="input">
                  <i className="material-icons prefix">lock_open</i>
                  <input id="passwordLogin" placeholder="Contraseña" type="password" className="validate" required />
                </div>
                <div className="boton">
                  <button style={{cursor:"pointer"}} onClick={this.signInWithEmail} className="btn-iniciar-sesion">Iniciar Sesion</button>
                </div>
                <div className="boton">
                  <a href="/home" className="center-content">
                    <input style={{cursor:"pointer"}} type="button" onClick={this.handleGuest} defaultValue="Invitado" className="btn2" /> 
                  </a>
                </div>
              </form>
              <div className="olvidar">
                <div className="olvidar-2">
                  <a href="/forgotpassword" onClick={this.handleForgotPassword} >¿Olvidaste tu contraseña?</a>
                </div>
              </div>
            </div>
        // </div>
      );
    }
  }
  
  export default Signin;

  // swal("Write something here:", {
  //   content: "input",
  // })
  // .then((value) => {
  //   swal(`You typed: ${value}`);
  // });