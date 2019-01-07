import React, { Component } from 'react';

// Assets
import './postslist.css';  


import Tablero from '../../components/tablero/Tablero';

class PostsList extends Component{
    

    render() {
        return (
            <div>
                <Tablero/>
                <div className="">
                    <div className="buscar-usuario">
                        <input id="" type="text" className="search-u" placeholder="Buscar"/>
                    </div>

                    <h5>Post Aqui</h5>

                </div>
            </div>
        );
    }
}

export default PostsList;