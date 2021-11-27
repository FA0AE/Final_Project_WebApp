import React from 'react';
import { Link } from "react-router-dom";

function Navbar() {
    return(
        <nav className = "navbar navbar-dark bg-dark navbar-expand-lg">    
            <div className="container">
                <Link to = "/" className = "navbar-brand">Assignments Tracker</Link>
                <div className = "collapse navbar-collapse">
                    <ul className = "navbar-nav mr-auto">
                        <li className = "navbar-item">
                        <Link to = "/" className = "nav-link">Assignments</Link>
                        </li>
                        <li className = "navbar-item">
                        <Link to = "/manage" className = "nav-link">Manage Subjects</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar