const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

// Routes 
//const activities_router = require("./routes/activities");
//const subjects_router = require("./routes/subjects");

const app = express();
 
// cors connection
app.use(cors({origin: true, credentials: true}));

// Middleware & routes
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//app.use("/smartu/activities", activities_router);
//app.use("/smartu/subjects", subjects_router);

// Connection to MongoDB via the Amazon Linux instance
mongoose.connect('mongodb://user5:root@54.173.202.133:27017/base5?authSource=admin')
        .then(() => {
            app.listen(8080, () => console.log("Server online at port 8080"));
        })
        .catch(error => console.log(error));
