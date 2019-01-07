import React, { Component } from 'react';
import firebase from 'firebase';
import swal from 'sweetalert';

class DeleteNewsfeedWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // radioChecked: null
        };
        this.handleSubmitDelete = this.handleSubmitDelete.bind(this);
        this.addOneMorePostsCount = this.addOneMoreDeletedPostsCount.bind(this);
        this.addOneLessPostsCount = this.addOneLessPostsCount.bind(this);
    }

    handleSubmitDelete = () => {
        // var isPublic = this.props.isPublic;
        var newsfeedReportedId = this.props.newsfeedId;
        var uid = this.props.uidReported;
        var timestamp = {
            day: new Date().getDate(),
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            minute: new Date().getMinutes(),
            hour: new Date().getHours()
        };

        // console.log({newsfeedReportedId, timestamp, isPublic});

        firebase.database().ref(`users/${uid}/posts/${newsfeedReportedId}`).once('value')
        .then(snapshot => {
            if(snapshot) {
                var newsfeed = snapshot.val();
                // var fromUid = newsfeed.fromUid, toUid = newsfeed.toUid, isPublic = newsfeed.isPublic;
                // console.log({fromUid, toUid, isPublic});
                firebase.database().ref(`posts-deleted/${newsfeedReportedId}`).set({
                    newsfeed,
                    timestamp
                }, error => {
                    if(error) {
                        // The write failed...
                        console.log(error);
                        // alert('Error al procesar su petición.');
                        swal("Error!", "Ocurrió un error al procesar su petición.", "error");
                    } else {
                        // Data saved successfully!
                        var updates = {};

                        if(newsfeed.isPublic) {
                            // updates[`/posts/${newsfeedReportedId}`] = null;
                            firebase.database().ref(`/posts/${newsfeedReportedId}`).remove();
                        }
                        // updates[`/users/${newsfeed.fromUid}/posts/${newsfeedReportedId}`] = null;
                        // updates[`/users/${newsfeed.toUid}/posts-to-me/${newsfeedReportedId}`] = null;
                        firebase.database().ref(`/users/${newsfeed.fromUid}/posts/${newsfeedReportedId}`).remove();
                        firebase.database().ref(`/users/${newsfeed.toUid}/posts-to-me/${newsfeedReportedId}`).remove();

                        firebase.database().ref().update(updates);
                        document.getElementById('dismissDeleteWidget').click();

                        swal("Éxito!", "La declaración ha sido eliminada.", "success");

                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
            swal("Error!", "Ocurrió un error al procesar su petición.", "error");
        });
    }

    addOneMoreDeletedPostsCount = () => {
      var deletedPostsCount = firebase.database().ref('/analytics/deletedPostsCount');
      deletedPostsCount.transaction(currentRank => {
          
        if(currentRank) {
          currentRank++;
        } else {
          currentRank = 1;
        }

        return currentRank;
      });
    
      this.addOneLessPostsCount();
    }

    addOneLessPostsCount = () => {
      var postsCount = firebase.database().ref('/analytics/postsCount');
      postsCount.transaction(currentRank => {
          
        if(currentRank) {
          currentRank--;
        } else {
          currentRank = 0;
        }

        return currentRank;
      });

    }

    render() {
        return (
            <div className="modal fade" id="deleteNewsfeedModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="exampleModalLongTitle" style={{fontSize:"1.4rem"}} >Eliminar Declaración</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <h5>¿Seguro que quieres eliminar esta declaración?</h5>
                        <p className="text-secondary">Si eliminas esta declaración ya no podrás recuperarla.</p>
                        {/* {this.props.newsfeedId} */}

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" id="dismissDeleteWidget">Cancelar</button>
                        <button onClick={this.handleSubmitDelete} type="button" className="btn btn-danger">Eliminar declaración</button>
                    </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default DeleteNewsfeedWidget;