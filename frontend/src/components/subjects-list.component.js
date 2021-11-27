import React from 'react';
import { Link } from 'react-router-dom';

function SubjectsList() {
    return(
        <div> 
            <p>Subject list component! You will see all the subjects here:D</p>  
            <div>
                <Link to = "/create-subject" className = "nav-link">
                <button type="button" className="btn btn-primary">Create subject</button>
                </Link>
            </div>      
        </div>

    )
}

export default SubjectsList