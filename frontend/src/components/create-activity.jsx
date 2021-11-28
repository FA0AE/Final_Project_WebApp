import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios'

export default function CreateActivity(props) {
    // constructor
    const date = new Date()
    const [subject_name, setSubjectName] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [due_date, setDate] = useState( date );
    const [subjects, setSubjects] = useState([]);

    // ComponentDidMount
    useEffect(() => {
        // Fill the dropdown menu
        axios.get("http://localhost:8080/subjects/")
        .then(response => {
            // Check if there is at least one subject in the DB
            if(response.data.length > 0) {
                setSubjects(response.data.map(subject => subject.name))
                setSubjectName(response.data[0].subject_name)
            }
        })
        .catch(err => console.log(err));

    }, [])

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

        const added_activity = {
            subject_name: subject_name,
            title: title,
            description: description,
            due_date: due_date,
        };

        console.log(added_activity);

        // Send information to backend
        axios.post('http://localhost:8080/activities/add', added_activity)
        .then(response => console.log(response.data))
        .catch(err => console.log(err));
        
        window.location = '/';
    }

    return (
        <div className="container">
            <h3>Create a new activity</h3>
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

                <div className="form-group">
                    <input type="submit" value="Create Activity" className = "btn btn-primary"/>
                </div>
            </form>
        </div>
    );
}