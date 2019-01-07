// Dependences
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Views 
import Home from '../views/home/Home';
import Landing from '../views/landing/Landing';
import Profile from '../views/profile/Profile';
import EditProfile from '../views/edit_profile/EditProfile';
import Page404 from '../views/page404/Page404';
import Admin from '../components/admin/Admin';
// import Forgotpassword from '../components/forgotpassword/Forgotpassword';

const AppRoute = () => {
    <BrowserRouter>
        <Redirect
            from="/"
            to="/index" />
        <Switch>
            <Route path='/home' component={Home} />
            <Route path='/index' component={Landing} />
            {/* <Route path='/forgotpassword' component={Forgotpassword} /> */}
            <Route path='/profile/:id' component={Profile} />
            <Route path='/edit_profile/:id' component={EditProfile} />
            <Route path='/admin' component={Admin} />
            {/* <Route path='/edit_profile?:id' component={EditProfile} /> */}
            <Route component={Page404} />
        </Switch>
    </BrowserRouter>
}

export default AppRoute;


// component
// render
// children