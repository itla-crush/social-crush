import React, { Component } from 'react';

// Components
import Welcome from '../../components/welcome/Welcome';
// eslint-disable-next-line
import Singin from '../../components/signin/Signin';
// eslint-disable-next-line
import Signup from '../../components/signup/Signup';

// Assets
import './landing.css';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSigninShowen: true
        }
    }

    changeView = (event) => {
        this.setState((prevState) => {
            if(prevState.isSigninShowen) {
                this.setState({ isSigninShowen: false });
            } else {
                this.setState({ isSigninShowen: true });
            }
        });
    }

    render() {
      return (
        <div className="cont">
            <div className="Landing">
                {/* Contenedor Izquierdo */}
                <Welcome />
                
                {/* Contenedor Derecho */}
                <div className="container-right"> 
                    {this.state.isSigninShowen ? (
                        <Singin changeView={this.changeView.bind(this)} />
                    ) : (
                        <Signup changeView={this.changeView.bind(this)} />
                    )}
                </div>
            </div>
        </div>
      );
    }
  }
  
  export default Landing;
  