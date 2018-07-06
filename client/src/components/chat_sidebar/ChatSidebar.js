import React, { Component } from 'react';

// Components
import ChatItem from '../chat_item/ChatItem';

// Assets
import './chatsidebar.css';

class ChatSidebar extends Component {
    render() {
      return (
        <section className="ChatSidebar">
          <div className>
            <h4>Chat Online!</h4>
            {/* Chat Users */}
            <div className="chatOrderedList">
              <div className="chat-sidebar">
                <ul className="list-unstyled">

                  {/* Each User Chat */}
                  <ChatItem />
                  <ChatItem />
                  <ChatItem />
                  {/* /Each User Chat */}

                </ul>
              </div>
            </div>
            {/* /Chat Users */}
          </div> 
        </section>

      );
    }
  }
  
  export default ChatSidebar;