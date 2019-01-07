import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
// import _ from 'lodash';

// Assets
import './admin.css'; 

import Tablero from '../../components/tablero/Tablero';


class Admin extends Component{
    constructor(props) {
        super(props);
        this.state = {
            analytics: {
                usersCount: null,
                postsCount: null,
                reportedPostsCount: null,
                deletedPostsCount: null
            }
        }
        this.loadAnalytics = this.loadAnalytics.bind(this);
        this.loadAnalytics();
    }

    componentDidMount() {
    }

    loadAnalytics = () => {
        firebase.database().ref('analytics/').on('value', snapshot => {
          var analytics = snapshot.val();
          if(analytics) {
            this.setState({ analytics });
          }
        });
    }

    render(){
        return(
            <div className="ad">
               <div className="administrador">
                    <Tablero />
                   {/* estadisticas usuarios */}
                   <div className="estadisticas">
                       
                        <Link to="/list-users" >
                       <div className="est-users">
                         <i className="fas fa-users"></i>
                         <div className="info-t">
                             <h6 className="tl">Usuarios</h6>
                             <p className="est">{this.state.analytics.usersCount || '0'}</p>
                         </div>
                       </div>
                         </Link>

                         {/* estadisticas declaraciones */}
                       <Link to="/posts-list" onClick={e => e.preventDefault()} >
                       <div className="est-declaraciones">
                         <i className="fas fa-chart-pie"></i>
                         <div className="info-t">
                             <h6 className="tl">Declaraciones</h6>
                             <p className="est">{this.state.analytics.postsCount || '0'}</p>
                         </div>
                       </div>
                         </Link>

                         {/* estadisticas declaraciones reportadas */}
                        <Link to="/posts-reported" >
                       <div className="est-declaraciones-report">
                         <i className="far fa-bell"></i>
                         <div className="info-t">
                             <h6 className="tl">Declaraciones reportadas</h6>
                             <p className="est">{this.state.analytics.reportedPostsCount || '0'}</p>
                         </div>
                       </div>
                         </Link>

                        <Link to="/posts-deleted" >
                       <div className="est-declaraciones-report">
                         <i className="far fa-bell"></i>
                         <div className="info-t">
                             <h6 className="tl">Declaraciones eliminadas</h6>
                             <p className="est">{this.state.analytics.deletedPostsCount || '0'}</p>
                         </div>
                       </div>
                         </Link>
                   </div>

               </div>
            </div>
        )
    }
}

export default Admin;