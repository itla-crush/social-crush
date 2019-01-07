import React, { Component } from 'react';
import firebase from 'firebase';

// Assets
import './postsdeleted.css'; 


import Tablero from '../../components/tablero/Tablero';
import Newsfeed from '../newsfeed/NewsFeed';

class PostsDeleted extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: null,
            newsfeedId: null,
            uidReported: null,
            isPublic: null
        }
        this.addBootstrap4 = this.addBootstrap4.bind(this);
        this.addBootstrap4();
    }

    componentDidMount() {
      var postsRef = firebase.database().ref('posts-deleted/');
      postsRef.on('value', snapshot => {
        var posts = snapshot.val();
        if(posts) {
          this.setState({ posts });
        }
      });
    }

    addBootstrap4 = () => {
        var pre = document.createElement('pre');
        pre.innerHTML = '<link rel="stylesheet"  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">';	
        document.querySelector("head").insertBefore(pre, document.querySelector("head").childNodes[0]);
    }

    newsfeedIdMethod = (newsfeedId, uidReported, isPublic) => {
      // console.log(newsfeedId);
      this.setState({ newsfeedId });
      this.setState({ uidReported });
      this.setState({ isPublic }); 
    }

    render() { 
        var posts = this.state.posts;

        return (
            <div>
                <Tablero/>
                <div className="">
                    {/* <div className="buscar-usuario" style={{marginBottom:"50px"}}>
                        <input id="" type="text" className="search-u" placeholder="Buscar"/>
                    </div> */}

                    <div style={{width:"600px", margin:"auto"}}>
                        { posts ? ( 
                            Object.keys(posts).map((post) => <Newsfeed key={post} id={post} data={posts[post].newsfeed} newsfeedIdMethod={this.newsfeedIdMethod.bind(this)} currentUserUid={this.props.user.uid || 'null'} currentUserDisplayName={this.props.user.displayName || ''} postDeleted={true} />).reverse() 
                            ) : ( "" )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default PostsDeleted ;