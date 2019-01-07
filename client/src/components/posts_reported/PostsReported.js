import React, { Component } from 'react';
import firebase from 'firebase';

// Assets
import './postsreported.css'; 


import Newsfeed from '../newsfeed/NewsFeed';
import Tablero from '../../components/tablero/Tablero';
import DeleteNewsfeedWidget from '../../components/delete_newsfeed_widget/DeleteNewsfeedWidget';

class PostsReported extends Component{
    constructor(props) {
        super(props);
        this.state = {
            posts: null,
            posts_reported: null,
            newsfeedId: null,
            uidReported: null,
            isPublic: null,
            newsfeedId: null,
            uidReported: null,
            isPublic: null
        }
        this.addBootstrap4 = this.addBootstrap4.bind(this);
        this.addBootstrap4();
    }

    componentDidMount() {
      var postsRef = firebase.database().ref('posts-reported/');
      postsRef.on('value', snapshot => {
        var posts_reported = snapshot.val();
        if(posts_reported) {
          this.setState({ posts_reported });
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
        var posts = this.state.posts_reported;
        // var posts_reported = this.state.posts_reported;
        var sesion = window.localStorage.getItem('sesion');
        sesion = (sesion === 'true') ? true : false;

        return(
            <div style={{width:"100%", height:"100%"}}>
                <Tablero/>
                    <div className="">
                        {/* <div className="buscar-usuario">
                        <input id="" type="text" className="search-u" placeholder="Buscar"/>
                    </div> */}
                    
                    <div style={{width:"600px", margin:"auto"}}>
                        { posts ? ( 
                            Object.keys(posts).map((post) => <PostsItems key={post} id={post} data={posts[post]} user={this.props.user} />).reverse() 
                            ) : ( "" )
                        }
                    </div>

                </div>
                { sesion ? <DeleteNewsfeedWidget newsfeedId={this.state.newsfeedId || null} uidReported={this.state.uidReported || null} currentUserUid={this.props.user.uid} isPublic={this.state.isPublic} postReported={true} postDeleted={true} /> : "" }
            </div>
        )
    }
}

class PostsItems extends Component{
    constructor(props) {
        super(props);
        this.state = {
            posts: null,
            posts_reported: null,
            newsfeedId: null,
            uidReported: null,
            isPublic: null,
            data: {
                newsfeedReportedId: null
            }
        };

    }

    componentDidMount() {
        var data = this.props.data;
        this.setState({ data });
        
        firebase.database().ref(`/users/${data.uidReported}/posts/${data.newsfeedReportedId}`).once('value').then(snapshot => {
            snapshot = snapshot.val();
            if(snapshot) {
                this.setState({ post: snapshot });
            }
        });

    }

    newsfeedIdMethod = (newsfeedId, uidReported, isPublic) => {
      // console.log(newsfeedId);
      this.setState({ newsfeedId });
      this.setState({ uidReported });
      this.setState({ isPublic }); 
    }

    render() {
        var post = this.state.post;

        // console.log(post);
        return (
            <div> 
                { post ? <Newsfeed id={this.state.data.newsfeedReportedId} data={post} dataReported={this.props.data || null} newsfeedIdMethod={this.newsfeedIdMethod.bind(this)} currentUserUid={this.props.user.uid || 'null'} currentUserDisplayName={this.props.user.displayName || ''} postReported={true} postDeleted={true} />   : "" }
            </div>
        );
    }
}

export default PostsReported ;