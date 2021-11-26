const Activity = require("../models/activity_model");
const mongoose = require('mongoose');

exports.getActivities = (request, response) => {
    // gets a promise from all the documents in the database
    Activity.find()                             
        .then(activities => response.json(activities))
        .catch(err => response.status(404)
                              .json({
                                  message: 'No activities found',
                                  error: err.message
                              })
        );
};

exports.getActivity = (request, response) => {
    // gets a promise from a certain document in the database
    Activity.findById(request.params.id)                             
        .then(activity => response.json({ 
                                        retrieved_data: activity 
                                    }))
        .catch(err => response.status(404)
                              .json({
                                  message: 'No activity found',
                                  error: err.message
                              })
        );
};

exports.addActivity = (request, response) => {
    // saves the document creating an instance of the model Subject
    const { body } = request;
    const { subject_name, title, description, due_date } = body;
    const formatted_date = Date.parse(due_date);

    const new_activity = new Activity({
        subject_name, 
        title,
        description,
        due_date: formatted_date
    });

    new_activity.save()
                .then(() => response.json({ message: "Activity added succesfully" }))
                .catch(err => response.status(400)
                                    .json({
                                        message: 'Failed to add this activity',
                                        error: err.message
                                    })
                );
};

exports.updateActivity = (request, response) => {
    // updates a specific document by making a call to the model itself
    Activity.findByIdAndUpdate(request.params.id, request.body)
        .then(updated_document => response.json({ 
                                    message: "Activity updated succesfully", 
                                    changed_data: updated_document 
                                }))
        .catch(err => response.status(400)
                            .json({ 
                                message: "Failed to update this activity", 
                                error: err.message 
                            })
        );
};

exports.deleteActivity = (request, response) => {
    // deletes a document found by ID
    Activity.findByIdAndRemove(request.params.id, request.body)
        .then(deleted_document => response.json({ 
                                            message: "Activity deleted successfully", 
                                            removed_data: deleted_document 
                                        }))
        .catch(err =>
            response.status(404)
                    .json({ 
                        message: "No activity found", 
                        error: err.message 
                    })
        );
};