const Subject = require("../models/subject_model");
const mongoose = require('mongoose');

exports.getSubjects = (request, response) => {
    // gets a promise from all the documents in the database
    Subject.find()                             
        .then(subjects => response.json(subjects))
        .catch(err => response.status(404)
                              .json({
                                  message: 'No subjects found',
                                  error: err.message
                              })
        );
};

exports.getSubject = (request, response) => {
    // gets a promise from a certain document in the database
    Subject.findById(request.params.id)                             
        .then(subject => response.json({ 
                                        retrieved_data: subject 
                                    }))
        .catch(err => response.status(404)
                              .json({
                                  message: 'No subject found',
                                  error: err.message
                              })
        );
};

exports.addSubject = (request, response) => {
    // saves the document directly using a method call in the model Subject
    Subject.create(request.body)                             
        .then(added_document => response.json({
                                            message: "Subject added succesfully",
                                            sended_data: added_document
                                        }))
        .catch(err => response.status(400)
                              .json({
                                  message: 'Failed to add this subject',
                                  error: err.message
                              })
        );
};

exports.updateSubject = (request, response) => {
    // updates a specific document by making a call to the model itself
    Subject.findByIdAndUpdate(request.params.id, request.body)
        .then(updated_document => response.json({ 
                                    message: "Subject updated succesfully", 
                                    changed_data: updated_document 
                                }))
        .catch(err => response.status(400)
                            .json({ 
                                message: "Failed to update this subject", 
                                error: err.message 
                            })
        );
};

exports.deleteSubject = (request, response) => {
    // deletes a document found by ID
    Subject.findByIdAndRemove(request.params.id, request.body)
        .then(deleted_document => response.json({ 
                                            message: "Subject deleted successfully", 
                                            removed_data: deleted_document 
                                        }))
        .catch(err =>
            response.status(404)
                    .json({ 
                        message: "No subject found", 
                        error: err.message 
                    })
        );
};