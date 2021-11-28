import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useParams } from "react-router";
import axios from 'axios'

export default function EditActivity(props) {
    // constructor
    const date = new Date()
    const [subject_name, setSubjectName] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [due_date, setDate] = useState( date );
    const [subjects, setSubjects] = useState([]);

    const { id }  = useParams();
    const params_id = id

    // ComponentDidMount
    useEffect(() => {
        // Get information from the activity
        axios.get("http://localhost:8080/activities/" + params_id)
        .then( (response) => {
            setSubjectName(response.data.retrieved_data.subject_name);
            setTitle(response.data.retrieved_data.title);
            setDescription(response.data.retrieved_data.description);

            const new_date = new Date(response.data.retrieved_data.due_date);
            setDate(new_date);
        })
        .catch(err => console.log(err));

        // Fill the dropdown menu
        axios.get("http://localhost:8080/subjects/")
        .then(response => {
            // Check if there is at least one subject in the DB
            if(response.data.length > 0) {
                setSubjects(response.data.map(subject => subject.name))
            }
        })
        .catch(err => console.log(err));

    }, [params_id])

    const handleSubjectNameChange = (event) => {
        setSubjectName(event.target.value);
    };
    
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };
    
    const handleDateChange = (date) => {
        setDate(date)
    };

    const submitForm = (event) => {
        event.preventDefault();

        const updated_activity = {
            subject_name: subject_name,
            title: title,
            description: description,
            due_date: due_date,
        };

        // Send information to backend
        axios.put('http://localhost:8080/activities/update/' + id, updated_activity)
        .then(response => console.log(response.data))
        .catch(err => console.log(err));
        
        window.location = '/';
    }

    return (
        <div className="container mt-3">
            <h3 className="d-flex justify-content-center">Edit an activity</h3>
            <form onSubmit={ submitForm }>
                <div className="form-group">
                    <label> Subject name: </label>
                    <select required className="form-control" value={ subject_name } 
                            onChange={ handleSubjectNameChange }>
                            {
                                subjects.map(function(subject) {
                                    return <option key={ subject } value={ subject }> 
                                        { subject }
                                    </option>;
                                })
                            }
                    </select>
                </div>

                <div className="form-group"> 
                    <label> Title: </label>
                    <input type="text" required className="form-control" value={ title } 
                        onChange={ handleTitleChange }/>
                </div>

                <div className="form-group"> 
                    <label> Description: </label>
                    <input type="text" required className="form-control" value={ description } 
                        onChange = { handleDescriptionChange }/>
                </div>

                <div className="form-group">
                    <label> Due date: </label>
                    <div>
                        <DatePicker required selected={ due_date } onChange={ handleDateChange }/>
                    </div>
                </div>

                <div className="form-group d-flex justify-content-center">
                    <input type="submit" value="Update Activity" className = "btn btn-warning"/>
                </div>
            </form>
        </div>
    );
}