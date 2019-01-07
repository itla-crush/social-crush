import firebase from 'firebase';

// Initialize Firebase
export function initFirebase() {
    firebase.initializeApp({
        apiKey: "AIzaSyCtY5IB3CtT6_tbkPYcPh1sGub0p87-2ac",
        authDomain: "social-crush.firebaseapp.com",
        databaseURL: "https://social-crush.firebaseio.com",
        projectId: "social-crush",
        storageBucket: "social-crush.appspot.com",
        messagingSenderId: "1031667947260"	
    });
}

//Autenticacion mediante el acceso con cuenta de Google
export function signInWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().signInWithPopup(provider)
    .then(res => {
        console.log(res.user);
    })
    .catch(e => {
        console.log(`Error! Code: ${e.code} Message: ${e.message}`);
    });
}

//Autenticacion mediante el acceso con cuenta normal
export function signInWithEmail(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}

export function signUpWithEmail(email, password, username, name, lastname) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}

export function isUserSignedIn() {
    return !!firebase.auth().currentUser;
}

export function signOut() {
    firebase.auth().signOut();
}

export function getProfilePicUrl() {
    return firebase.auth().currentUser.photoURL || '/img/profile_placeholder.jpg';
}

export function getUserName() {
    return firebase.auth().currentUser.displayName;
}

export function stateAuth() {
    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            alert('onAuthStateChanged: true');
            return true;
        } else {
            alert('onAuthStateChanged: false');
            return false;
        }
    });
}

// eslint-disable-next-line
function initFirebaseAuth() {
    //firebase.auth().onAuthStateChanged(authStateObserver);
}

// eslint-disable-next-line
function authStateObserver(user) {
    if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...
      } else {
        // User is signed out.
        // ...
      }
}

// Checks that the Firebase SDK has been correctly setup and configured.
export function checkSetupFirebase() {
    if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
      window.alert('You have not configured and imported the Firebase SDK. ' +
          'Make sure you go through the codelab setup instructions and make ' +
          'sure you are running the codelab using `firebase serve`');
    }
}

// Checks that Firebase has been imported.
// checkSetup();

// initialize Firebase
// initFirebaseAuth();

function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
      profile_picture : imageUrl
    });
}

var userId = firebase.auth().currentUser.uid;
    firebase.database()
    .ref('/users/' + userId).once('value')
    .then(snapshot => {
    //var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';

});

/*
var userId = firebase.auth().currentUser.uid;
    return firebase.database()
    .ref('/users/' + userId).once('value')
    .then(function(snapshot) {
    var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    // ...
});
*/

export function searchUsers(userName) {
    var reference = firebase.database.ref('users/').once('value').then((snapshot) => {
        console.log(snapshot.val());
        console.log(snapshot);
    });
}