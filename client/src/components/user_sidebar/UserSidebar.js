import React, { Component } from 'react';

// Assets
import './usersidebar.css';

class UserSidebar extends Component {
    render() {
      return (
        <section className="SideBar"> 
          <div>
            <h3>User Name</h3>
            <div className="div-img-profile center-content">  {/* Contenedor de la Imagen de Perfil */}
              <a href="#">
                <img className="img-profile-user" src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg" /> {/* Imagen */}
              </a>
            </div>
            <div className="center-content">
              <a className="username" href="#">@username</a>
            </div> 
          </div>
        </section>
      );
    }
  }
  
  export default UserSidebar;
  