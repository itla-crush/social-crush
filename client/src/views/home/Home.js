import React, { Component } from 'react';

// Components
import Header from '../../components/header/Header';
import UserSidebar from '../../components/user_sidebar/UserSidebar';
import Newsfeed from '../../components/newsfeed/NewsFeed';
import ChatSidebar from '../../components/chat_sidebar/ChatSidebar';

// Assets
import './home.css';

class Home extends Component {
    render() {
      return (
        <div className="Home">
            <Header />
            <div className="container main-content">
                <aside className="left-aside center-content">
                    {/* <UserSidebar /> */}
                </aside>
                <main className="main center-content">
                    {/* <Newsfeed /> */}
                </main>
                <aside className="right-aside center-content">
                    {/* <ChatSidebar /> */}
                </aside>
            </div>
        </div>
      );
    }
  }
  
  export default Home;
  