import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from 'react';
import axios from 'axios'

export default function CreateSubject(props) {
    // constructor
    const [name, setName] = useState("");
    const [professor, setProfessor] = useState("");

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    
    const handleProfessorChange = (event) => {
        setProfessor(event.target.value);
    };

    const submitForm = (event) => {
        event.preventDefault();

        const added_subject = {
            name: name,
            professor: professor
        };

        console.log(added_subject);

        // Send information to backend
        axios.post('http://localhost:8080/subjects/add', added_subject)
        .then(response => console.log(response.data))
        .catch(err => console.log(err));
        
        window.location = '/manage';
    }

    return (
        <div className="container mt-3">
            <h3 className="d-flex justify-content-center">Create a new subject</h3>
            <form onSubmit={ submitForm }>
                <div className="form-group"> 
                    <label> Subject name: </label>
                    <input type="text" required className="form-control" value={ name } 
                        onChange={ handleNameChange }/>
                </div>

                <div className="form-group"> 
                    <label> Professor: </label>
                    <input type="text" required className="form-control" value={ professor } 
                        onChange = { handleProfessorChange }/>
                </div>

                <div className="form-group d-flex justify-content-center">
                    <input type="submit" value="Create Subject" className = "btn btn-warning"/>
                </div>
            </form>
        </div>
    );
}