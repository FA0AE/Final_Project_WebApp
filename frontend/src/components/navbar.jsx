import React from 'react';
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div className="d-flex justify-content-center bg-warning">
            <nav className="navbar navbar-dark navbar-expand-lg">
                <Link className="navbar-brand" to="/">Assignments Tracker</Link>
                <div className="container-fluid " id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item active">
                            <Link className="nav-link" to="/">Assignments</Link>
                        </li>
                        <li className="navbar-item">
                            <Link className="nav-link" to="/manage">Manage Subjects</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar