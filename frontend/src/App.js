import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';

import Navbar from "./components/navbar.jsx";
import CreateActivity from "./components/create-activity.component.js";
import ActivitiesList from "./components/activities-list.component.js";
import EditActivity from "./components/edit-activity.component.js";
import CreateSubject from "./components/create-subject.component.js";
import SubjectsList from "./components/subjects-list.component.js";
import EditSubject from "./components/edit-subject.component.js";

function App() {
  return (
    <div className="App">
      <Navbar /> 
      
      <Routes>
        <Route path="/" element={ <ActivitiesList /> } />
        <Route path="/create-activity" element={ <CreateActivity /> } />
        <Route path="/edit-activity/:id" element={ <EditActivity /> } />

        <Route path="/manage" element={ <SubjectsList /> } />
        <Route path="/create-subject" element={ <CreateSubject /> } />
        <Route path="/edit-subject/:id" element={ <EditSubject /> } />
      </Routes>
    </div>
  );
}

export default App;
