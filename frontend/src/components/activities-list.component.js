import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Activity = props => (
    <tr>
        <td>{ props.activity.subject_name }</td>
        <td>{ props.activity.title }</td>
        <td>{ props.activity.description }</td>
        <td>{ props.activity.due_date.substring(0, 10) }</td>
        <td>
            <Link to={ "/edit-activity/" + props.activity._id }> Edit Activity</Link> | 
            <a href="/#" onClick={ () => { props.deleteActivity(props.activity._id) }}> Mark as complete</a>            
        </td>
    </tr>
    // a href can be converted into a button since now it works like a link
)

export default class ActivitiesList extends Component {
    constructor() {
        super()

        // Making our methods binds in the correct scope of the component
        this.deleteActivity = this.deleteActivity.bind(this);

        // Initial state of the component
        this.state = {
            activities: []
        };
    }


    componentDidMount() {
        // Get list of activities from DB
        axios.get("http://localhost:8080/activities/")
        .then(response => {
            this.setState({ activities: response.data })
        })
        .catch(err => console.log(err));
    }

    deleteActivity(activityID) {
        axios.delete("http://localhost:8080/activities/"+ activityID)
        .then(response => {
            console.log(response.data)
        });

        this.setState({
            activities: this.state.activities
                        .filter(remainedElements => remainedElements._id !== activityID)
        });
    }

    displayList() {
        return this.state.activities.map(currentActivity => { return <
            Activity activity={ currentActivity } deleteActivity={ this.deleteActivity } 
            key={ currentActivity._id }/>
        });
    }

    render() {
        return (
            <div>
                <h3>To do activities</h3>
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>Subject name</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Due date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        { this.displayList() }
                    </tbody>
                </table>
                <div>
                    <Link to = "/create-activity" className = "nav-link">
                    <button type="button" className="btn btn-primary">Create activity</button>
                    </Link>
                </div>
            </div>
        )
    }
}