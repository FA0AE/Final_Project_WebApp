import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import React, { Component } from 'react';
import axios from 'axios'

export default class CreateActivity extends Component {
    constructor() {
        super()

        // Making sure our methods binds in the correct scope of the component (similar to ...state)
        this.handleSubjectNameChange = this.handleSubjectNameChange.bind(this);     
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);  
        this.handleTitleChange = this.handleTitleChange.bind(this);     
        this.handleDateChange = this.handleDateChange.bind(this);     
        this.submitForm = this.submitForm.bind(this);     

        // Initial state of the component:
        this.state = {
            subject_name: "",
            title: "",
            description: "",
            due_date: new Date(),
            subjects: []
        }
    }

    componentDidMount() {
        console.log("component actually did mount");
        axios.get("http://localhost:8080/subjects/")
        .then(response => {
            // Check if there is at least one subject in the DB
            console.log(response.data.length)
            if(response.data.length > 0) {
                this.setState({
                    subjects: response.data.map(subject => subject.name),
                    subject_name: response.data[0].subject_name
                })
            }
        })
    };

    handleSubjectNameChange(event) {
        this.setState({
            subject_name: event.target.value
        });
    };
    
    handleTitleChange(event) {
        this.setState({
            title: event.target.value
        });
    };

    handleDescriptionChange(event) {
        this.setState({
            description: event.target.value
        });
    };
    
    handleDateChange(date) {
        this.setState({
            due_date: date
        });
    };

    submitForm(event) {
        event.preventDefault();

        const added_activity = {
            subject_name: this.state.subject_name,
            title: this.state.title,
            description: this.state.description,
            due_date: this.state.due_date,
        };

        console.log(added_activity);

        // Send information to backend
        axios.post('http://localhost:8080/activities/add', added_activity)
        .then(response => console.log(response.data))
        .catch(err => console.log(err))
        
        window.location = '/';

        /*
        // This will allow us to add various activities at once
        this.setState({
            subject_name: "",
            title: "",
            description: "",
            due_date: new Date(),
        })
        */
    };
    
    render() {
        return (
            <div className="container">
                <h3>Create a new activity</h3>
                <form onSubmit={ this.submitForm }>
                    <div className="form-group">
                        <label> Subject name: </label>
                        <select required className="form-control" value={ this.state.subject_name } 
                                onChange={ this.handleSubjectNameChange }>
                                {
                                    this.state.subjects.map(function(subject) {
                                        return <option key={ subject } value={ subject }> 
                                            { subject }
                                        </option>;
                                    })
                                }
                        </select>
                    </div>

                    <div className="form-group"> 
                        <label> Title: </label>
                        <input type="text" required className="form-control" value={ this.state.title } 
                            onChange={ this.handleTitleChange }/>
                    </div>

                    <div className="form-group"> 
                        <label> Description: </label>
                        <input type="text" required className="form-control" value={ this.state.description } 
                            onChange = { this.handleDescriptionChange }/>
                    </div>

                    <div className="form-group">
                        <label> Due date: </label>
                        <div>
                            <DatePicker required selected={ this.state.due_date } onChange={ this.handleDateChange }/>
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Activity" className = "btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    };
}


/*
const CreateActivity = props => {
    // Constructor
    const initialActivityState = {
        subject_name: "",
        title: "",
        description: "",
        due_date: new Date(),
        subjects: []
    };

    const [ activity, setActivity ] = useState(initialActivityState);
    
    //ComponentDidMount like method
    useEffect(()=>{
        console.log("ComponentDidMount en componente función")
        setActivity({
            subjects: ["test"],
            subject_name: "test"
        })
    },[])

    const handleSubjectNameChange = event => {
        setActivity({
            ...activity,
            subject_name: event.target.value
        });
    };

    const handleTitleChange = event => {
        setActivity({
            ...activity,
            title: event.target.value
        })
    };

    const handleDescriptionChange = event => {
        setActivity({
            ...activity,
            description: event.target.value
        });
    };

    const handleDateChange = date => {
        setActivity({
            ...activity,
            due_date: date
        });
    };

    const submitForm = () => {
        //event.preventDefault();
        console.log(activity)
        props.submitForm(activity);

        // Return to the original page
        props.history.push('/');
    }

    // ref = { (userInput) => { userInput = React.createRef() } }
    return (
        <div className="container">
            <h3>Create a new activity</h3>
            <form onSubmit={ submitForm }>
                <div className="form-group">
                    <label> Subject name: </label>
                    <select required className="form-control" value={ activity.subject_name } 
                            onChange={ handleSubjectNameChange }>
                            {
                                activity.subjects.map(function(subject) {
                                    return <option key={ subject } value={ subject }> 
                                        { subject }
                                    </option>;
                                })
                            }
                    </select>
                </div>

                <div className="form-group"> 
                    <label> Title: </label>
                    <input type="text" required className="form-control" value={ activity.title } 
                        onChange={ handleTitleChange }/>
                </div>

                <div className="form-group"> 
                    <label> Description: </label>
                    <input type="text" required className="form-control" value={ activity.description } 
                        onChange = { handleDescriptionChange }/>
                </div>

                <div className="form-group">
                    <label> Due date: </label>
                    <div>
                        <DatePicker required selected={ activity.due_date } onChange={ handleDateChange }/>
                    </div>
                </div>

                <div className="form-group">
                    <input type="submit" value="Create Activity" className = "btn btn-primary"/>
                </div>
            </form>
        </div>
    );
};

export default CreateActivity
*/