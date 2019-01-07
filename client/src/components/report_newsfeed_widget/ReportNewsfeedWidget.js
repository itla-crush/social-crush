import React, { Component } from 'react';
import firebase from 'firebase';
import swal from 'sweetalert';

class ReportNewsfeedWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radioChecked: null
        };
        this.handleSubmitReport = this.handleSubmitReport.bind(this);
        this.handleChangeCheckedRadio = this.handleChangeCheckedRadio.bind(this);
        this.addOneMoreReportedPostsCount = this.addOneMoreReportedPostsCount.bind(this);
    }

    handleSubmitReport = () => {
        console.log(this.props.newsfeedId || null);

        var textareaDescription = document.getElementById('textReportDescription');
        var description = textareaDescription.value;
        var radioChecked = this.state.radioChecked;
        var uidSender = this.props.currentUserUid;
        var uidReported = this.props.uidReported;
        var newsfeedReportedId = this.props.newsfeedId;
        var timestamp = {
            day: new Date().getDate(),
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            minute: new Date().getMinutes(),
            hour: new Date().getHours()
        };
        
        firebase.database().ref('posts-reported/').push().set({
            description,
            radioChecked,
            uidSender,
            newsfeedReportedId,
            uidReported,
            timestamp
        }, error => {
            if (error) {
                // The write failed...
                console.log(error);
                // alert('Error al procesar su petición.');

                swal("Error!", "Ocurrió un error al procesar su petición.", "error");
            } else {
                // Data saved successfully!
                var reportedCount = firebase.database().ref(`/users/${uidReported}/reportedCount/`);
                reportedCount.transaction(currentRank => {
                
                    if(currentRank) {
                        currentRank++;
                    } else {
                        currentRank = 1;
                    }

                    return currentRank;
                });

                textareaDescription.value = '';
                document.getElementById('reportRadio1').checked= true;
                document.getElementById('dismissReportWidget').click();

                console.log('Reporte guardado correctamente!');
                // alert('Reporte guardado correctamente!');
                this.addOneMoreReportedPostCount();
                swal("Exito!", "Su reporte ha sido enviado.", "success");

            }
        });

        // var updates = {};
        // updates['/posts/' + newPostKey] = postData;
        // updates['/user-posts/' + uid + '/' + newPostKey] = postData;

        // return firebase.database().ref().update(updates);
        
    }

    handleChangeCheckedRadio = (e) => {
        var radioChecked = e.target.value;
        this.setState({ radioChecked });
    }

    addOneMoreReportedPostsCount = () => {
      var reportedPostsCount = firebase.database().ref('/analytics/reportedPostsCount');
      reportedPostsCount.transaction(currentRank => {
          
        if(currentRank) {
          currentRank++;
        } else {
          currentRank = 1;
        }

        return currentRank;
      });

    }

    render() {
        return (
            <div className="modal fade" id="reportNewsfeedModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="exampleModalLongTitle" style={{fontSize:"1.4rem"}} >Reportar Declaración</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <h5>¿Cuál es el problema?</h5>
                        <div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="reportRadio" id="reportRadio1" value="Muestra contenido abusivo o inadecuado" onClick={this.handleChangeCheckedRadio} defaultChecked />
                                <label className="form-check-label" htmlFor="reportRadio1">
                                    Muestra contenido abusivo o inadecuado
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="reportRadio" id="reportRadio2" value="Es molesta o de mal gusto" onClick={this.handleChangeCheckedRadio} />
                                <label className="form-check-label" htmlFor="reportRadio2">
                                    Es molesto o de mal gusto
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="reportRadio" id="reportRadio3" value="Simplemente deberían quitarlo" onClick={this.handleChangeCheckedRadio} />
                                <label className="form-check-label" htmlFor="reportRadio3">
                                    Simplemente deberían quitarlo
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="reportRadio" id="reportRadio4" value="Es spam" onClick={this.handleChangeCheckedRadio} />
                                <label className="form-check-label" htmlFor="reportRadio4">
                                    Es spam
                                </label>
                            </div>
                        </div>
                        <textarea id="textReportDescription" className="form-control text" style={{margin:"auto", marginTop:"15px", minHeight:"70px", maxHeight:"120px"}} placeholder="Ayúdanos a entender mejor lo que sucede dando una descripción..." defaultValue={""} />

                        {/* {this.props.newsfeedId} */}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" id="dismissReportWidget">Cancelar</button>
                        <button onClick={this.handleSubmitReport} type="button" className="btn btn-primary">Enviar</button>
                    </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default ReportNewsfeedWidget;