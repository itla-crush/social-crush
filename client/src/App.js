import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// Views 
import Home from './views/home/Home';
import Landing from './views/landing/Landing';
import Profile from './views/profile/Profile';
import EditProfile from './views/edit_profile/EditProfile';
import ChangePassword from './views/change_password/ChangePassword';
import Page404 from './views/page404/Page404';
import Forgotpassword from './views/forgotpassword/Forgotpassword';
import Chatting from './views/chatting/Chatting';
import Admin from './views/admin/Admin';
import ListUsers from './components/list-users/ListUsers';
import PostsList from './components/posts_list/PostsList';
import PostsReported from './components/posts_reported/PostsReported';
import PostsDeleted from './components/posts_deleted/PostsDeleted';


// import { isUserSignedIn, stateAuth, signOut } from './functions/firebase-functions';
import firebase from 'firebase';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // isSignedIn: this.props.isSignedIn,
            // currentUser: false,
            user: {
                displayName: null,
                photoUrl: null,
                username: null,
                email: null,
                name: null,
                lastname: null,
                visitedCount: null,
                uid: null
            }
        }
        // this.isUserSignedIn = this.isUserSignedIn.bind(this);
        this.signOut = this.signOut.bind(this);
        this.stateAuth = this.stateAuth.bind(this);
        this.stateAuth();
    }

    //Obteniendo el usuario con sesion activa
    stateAuth = () => {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            console.log('Logeado');
            // this.setState({ currentUser: true });
            firebase.database().ref(`/users/${user.uid}`).once('value', snapshot => {
                this.setState({ user: snapshot.val() });
            }) 
            .catch(e => {
                console.log(`Code: ${e.code} Message: ${e.message}`);
            });
          } else {
                // this.setState({ currentUser: false });
                console.log('Sesion cerrada');
            }
        });
    }

    // isUserSignedIn = () => {
    //     return !!firebase.auth().currentUser;
    // }

    signOut = () => {
        firebase.auth().signOut();
    }

    componentWillMount() {
        // if(this.isUserSignedIn()) {
        //     this.setState({ isSignedIn: true });
        // }
        // console.log(window.localStorage.getItem('sesion'));
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                window.localStorage.setItem('sesion', 'true'); 
            } else {
                window.localStorage.setItem('sesion', 'false'); 
            }
        });
        
        // console.log('Actualizar informaciones de usuarios');
        // console.log('https://firebase.google.com/docs/auth/web/manage-users?hl=es-419');
        // console.log('Errores de la API');
        // console.log('https://firebase.google.com/docs/auth/admin/errors?hl=es-419');
        // console.log('Validar fechas');
        // console.log('https://blog.reaccionestudio.com/funciones-para-validar-fechas-con-javascript/');
    }
    // match.params.id
    render() {
        var sesion = window.localStorage.getItem('sesion');
        sesion = (sesion === 'true') ? true : false;

        var isAdmin = window.localStorage.getItem('isAdmin');
        // isAdmin = (isAdmin === 'true') ? true : false;
        isAdmin = true;

        return (
            <BrowserRouter>
                <div className="App" style={{width: "100%"}}>
                    <Switch>
                        {/* Creando Rutas, de la pagina*/}
                        <Route path='/home' render={(props) => ( <Home user={this.state.user} /> )} />
                        <Route path='/forgotpassword' render={(props) => (<Forgotpassword />)} />
                        <Route path='/friend' render={(props) => (<Profile friend={true} currentUserUid={this.state.user.uid} />)} />
                        <Route path='/index' 
                            render={(props) => ( 
                                sesion ? (
                                    <Redirect to="/home"/>
                                ) : (
                                    <Landing backgroundID={this.props.backgroundID} /> )
                            )} />
                        <Route path='/chatting' 
                            render={(props) => (
                                sesion ? (
                                    <Chatting uid={this.state.user.uid} photoUrl={this.state.user.photoUrl} displayName={this.state.user.displayName} />
                                ) : (
                                    <Redirect to="/index"/> )
                            )} />
                        <Route path='/profile' 
                            render={(props) => (
                                sesion ? (
                                    <Profile uid={this.state.user.uid} />
                                ) : (
                                    <Redirect to="/index"/> )
                            )} />
                        <Route path='/edit_profile' 
                            render={(props) => (
                                sesion ? (
                                    <EditProfile user={this.state.user} />
                                ) : (
                                    <Redirect to="/index"/> )
                            )} />
                        <Route path='/change_password' 
                            render={(props) => (
                                sesion ? (
                                    <ChangePassword user={this.state.user} />
                                ) : (
                                    <Redirect to="/index"/> )
                            )} />
                        <Route path='/admin' 
                            render={(props) => (
                                sesion && isAdmin ? (
                                    <Admin user={this.state.user} />
                                ) : (
                                    <Redirect to="/index"/> )
                            )} />
                        <Route path='/list-users' 
                            render={(props) => (
                                sesion && isAdmin ? (
                                    <ListUsers user={this.state.user} />
                                ) : (
                                    <Redirect to="/index"/> )
                         )} />   
                         <Route path='/posts-list' 
                            render={(props) => (
                                sesion && isAdmin ? (
                                    <PostsList user={this.state.user} />
                                ) : (
                                    <Redirect to="/index"/> )
                         )} />   
                         <Route path='/posts-reported' 
                            render={(props) => (
                                sesion && isAdmin ? (
                                    <PostsReported user={this.state.user} />
                                ) : (
                                    <Redirect to="/index"/> )
                         )} />    
                         <Route path='/posts-deleted' 
                            render={(props) => (
                                sesion && isAdmin ? (
                                    <PostsDeleted user={this.state.user} />
                                ) : (
                                    <Redirect to="/index"/> )
                         )} /> 
                        <Route exact strict path='/' 
                            render={(props) => ( 
                                sesion ? (
                                    <Redirect to="/home"/>
                                ) : (
                                    <Redirect to="/index"/> )
                            )} />
                        <Route exact strict path=''
                            render={(props) => ( 
                                sesion ? (
                                    <Redirect to="/home"/>
                                ) : (
                                    <Redirect to="/index"/> )
                            )} />
                        
                        <Route component={Page404} />
                    </Switch> 
                </div>
            </BrowserRouter>
        );
    }
}

export default App;