import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Subject = props => (
    <tr>
        <td>{ props.subject.name }</td>
        <td>{ props.subject.professor }</td>
        <td>
            <Link to={ "/edit-subject/" + props.subject._id }> Edit Subject</Link> | 
            <a href="/manage/#" onClick={ () => { props.deleteSubject(props.subject._id) }}> Delete Subject</a>            
        </td>
    </tr>
    // a href can be converted into a button since now it works like a link
)

export default class SubjectsList extends Component {
    constructor() {
        super()

        // Making our methods binds in the correct scope of the component
        this.deleteSubject = this.deleteSubject.bind(this);

        // Initial state of the component
        this.state = {
            subjects: []
        };
    }


    componentDidMount() {
        // Get list of subjects from DB
        axios.get("http://localhost:8080/subjects/")
        .then(response => {
            this.setState({ subjects: response.data })
        })
        .catch(err => console.log(err));
    }

    deleteSubject(subjectID) {
        axios.delete("http://localhost:8080/subjects/"+ subjectID)
        .then(response => {
            console.log(response.data)
        });

        this.setState({
            subjects: this.state.subjects
                        .filter(remainedElements => remainedElements._id !== subjectID)
        });
    }

    displayList() {
        return this.state.subjects.map(currentSubject => { return <
            Subject subject={ currentSubject } deleteSubject={ this.deleteSubject } 
            key={ currentSubject._id }/>
        });
    }

    render() {
        return (
            <div className="mt-3">
                <h3 className="d-flex justify-content-center">Subjects list</h3>
                <table className="container table">
                    <thead className="thead-light">
                    <tr>
                        <th>Name</th>
                        <th>Professor</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        { this.displayList() }
                    </tbody>
                </table>
                <div className = "d-flex justify-content-center">
                    <Link to = "/create-subject" className = "nav-link">
                    <button type="button" className="btn btn-warning">Create subject</button>
                    </Link>
                </div>
            </div>
        )
    }
}