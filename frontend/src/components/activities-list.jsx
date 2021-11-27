import React from 'react';
import { Link } from 'react-router-dom';
function ActivitiesList() {
    return(
        <div>
            <p>Activity list component! You will see all the activities here:D</p>
            <div>
                <Link to = "/create-activity" className = "nav-link">
                <button type="button" className="btn btn-primary">Create activity</button>
                </Link>
            </div>
        </div>
    )
}

export default ActivitiesList