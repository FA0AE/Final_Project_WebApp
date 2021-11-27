import React, { Component } from 'react';
import axios from 'axios'

export default class CreateSubject extends Component {
    constructor() {
        super()

        // Making sure our methods binds in the correct scope of the component (similar to ...state)
        this.handleNameChange = this.handleNameChange.bind(this);     
        this.handleProfessorChange = this.handleProfessorChange.bind(this);  
        this.submitForm = this.submitForm.bind(this);     

        // Initial state of the component:
        this.state = {
            name: "",
            professor: ""
        }
    }

    handleNameChange(event) {
        this.setState({
            name: event.target.value
        });
    };

    handleProfessorChange(event) {
        this.setState({
            professor: event.target.value
        });
    };

    submitForm(event) {
        event.preventDefault();

        const added_subject = {
            name: this.state.name,
            professor: this.state.professor,
        };

        console.log(added_subject);

        // Send information to backend
        axios.post('http://localhost:8080/subjects/add', added_subject)
        .then(response => console.log(response.data))
        .catch(err => console.log(err))
        

        window.location = '/manage';
    };
    
    render() {
        return (
            <div className="container">
                <h3>Create a new subject</h3>
                <form onSubmit={ this.submitForm }>

                    <div className="form-group"> 
                        <label> Subject name: </label>
                        <input type="text" required className="form-control" value={ this.state.name } 
                            onChange={ this.handleNameChange }/>
                    </div>

                    <div className="form-group"> 
                        <label> Professor: </label>
                        <input type="text" required className="form-control" value={ this.state.professor } 
                            onChange = { this.handleProfessorChange }/>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Subject" className = "btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    };
}