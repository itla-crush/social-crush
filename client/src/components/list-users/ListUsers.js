import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';

// Assets
import './listusers.css'; 


import Tablero from '../../components/tablero/Tablero';


class Listusers extends Component{
    constructor(props){
        super(props);
        this.state = {
            users: null
        };
        this.handleSearchUsers = this.handleSearchUsers.bind(this);
        this.searchUsers = this.searchUsers.bind(this);
        // this.addBootstrap4 = this.addBootstrap4.bind(this);
        // this.addBootstrap4();
    }

    componentDidMount() {
        firebase.database().ref('users/').orderByChild('displayName').on('value', snapshot => {
          var users = snapshot.val();
          if(users) {
            this.setState({ users });
          }
        });
    }

    handleSearchUsers = () => {
        var searchUser = document.getElementById('search-users');
        searchUser = _.trim(searchUser.value);
        
        if(_.isEmpty(searchUser)) {
            this.setState({ searchedUsers: this.state.users });
        } else {
            this.searchUsers(searchUser);
        }
    }

    searchUsers = (searchText) => {
        var searchedUsers = '¡No hay resultados!';

        if(!_.isEmpty(searchText)) {
            this.setState({ showResult: true });

            firebase.database().ref('/users/').orderByChild('displayName').once('value')
            .then(snapshot => {
            //   this.setState({users: snapshot.val()});

              if(snapshot.val()) {
                searchedUsers = snapshot.val();
                var users = {};
                for(var user in searchedUsers) {
                    if(user !== this.state.uid && _.toLower(searchedUsers[user].displayName).search(_.toLower(searchText)) !== -1) {
                        users[user] = searchedUsers[user];
                    }
                }

                if(Object.entries(users).length > 0) {
                    searchedUsers = users;
                } else {
                    searchedUsers = null;
                }
                this.setState({ searchedUsers });

              } else {
                searchedUsers = null;
                this.setState({ searchedUsers });
              }
              
            })
            .catch(e => {
              console.log(`Code: ${e.code} Message: ${e.message}`);
            });
        } else {
            searchedUsers = null;
            this.setState({ searchedUsers });
        }
    }

    // addBootstrap4 = () => {
    //     var pre = document.createElement('pre');
    //     pre.innerHTML = '<link rel="stylesheet"  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">';	
    //     document.querySelector("head").insertBefore(pre, document.querySelector("head").childNodes[0]);
    // }


    render(){
        var users = this.state.searchedUsers ? this.state.searchedUsers : this.state.users;
        var listUsers = '';
        
        if(users != null){
            listUsers = Object.keys(users).map((user) =>
            <div key={user} className="pf-ct">
                <section>
                    <div className="ust">
                    <h4>{users[user].displayName || 'Username'}</h4>  
                    </div>
                    <div className="imgXUPR center-content">  {/* Contenedor de la Imagen de Perfil */}
                        <a href={`friend?id=${user}`} onClick={this.handleOnClick} >
                            <img alt="" className="imgXUPR-2 " src={users[user].photoUrl || "https://firebasestorage.googleapis.com/v0/b/social-crush.appspot.com/o/images%2Fuser_profile%2Fprofile_placeholder.jpg?alt=media&token=7efadeaa-d290-44aa-88aa-ec18a5181cd0"} /> {/* Imagen */}
                        </a>
                    </div>
                    <div className="center-content">
                        <a className="username" href={`friend?id=${user}`} onClick={this.handleOnClick}>
                            <h5>{users[user].username ? `@${users[user].username}` : '@username'}</h5> 
                        </a>
                    </div>
                </section>
            </div>
          );
    
        } else {
            listUsers = <h2 style={{textAlign: 'center'}}>Cargando usuarios...</h2>;
        }

        return(
           <div className="user">
                <Tablero />
                <div className="user-tables">
                    <div className="buscar-usuario">
                        <input id="search-users" type="text" className="search-u" placeholder="Buscar" onChange={this.handleSearchUsers} />
                    </div>
                    <div className="results-tab">
                        {listUsers} 
                    </div>
                </div>
           </div> 
        )
    }
}


export default Listusers;