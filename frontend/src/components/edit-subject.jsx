import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router";
import React, { useState, useEffect } from 'react';
import axios from 'axios'

export default function CreateSubject(props) {
    // constructor
    const [name, setName] = useState("");
    const [professor, setProfessor] = useState("");

    const { id }  = useParams();
    const params_id = id

    // ComponentDidMount
    useEffect(() => {
        // Get information from the activity
        axios.get("http://localhost:8080/subjects/" + params_id)
        .then( (response) => {
            setName(response.data.retrieved_data.name);
            setProfessor(response.data.retrieved_data.professor);
        })
        .catch(err => console.log(err));

    }, [params_id])

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    
    const handleProfessorChange = (event) => {
        setProfessor(event.target.value);
    };

    const submitForm = (event) => {
        event.preventDefault();

        const updated_subject = {
            name: name,
            professor: professor
        };

        console.log(updated_subject);

        // Send information to backend
        axios.put('http://localhost:8080/subjects/update/' + id, updated_subject)
        .then(response => console.log(response.data))
        .catch(err => console.log(err));
        
        window.location = '/manage';
    }

    return (
        <div className="container">
            <h3>Edit a subject</h3>
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

                <div className="form-group">
                    <input type="submit" value="Update Subject" className = "btn btn-primary"/>
                </div>
            </form>
        </div>
    );
}