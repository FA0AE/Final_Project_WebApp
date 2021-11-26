// Code format inspired by Saha.M --> https://dev.to/mritunjaysaha/mern-stack-todo-application-backend-282a
const router = require('express').Router();

const {
    getActivities,
    getActivity,
    addActivity,
    updateActivity,
    deleteActivity
} = require("../controllers/activities");

/**
 * @route --> /activities/
 * @description --> It will return all the registered activities
 */
router.get('/', getActivities);

/**
 * @route --> /activities/:id
 * @description --> It will return a single registered activity
 */
 router.get('/:id', getActivity);

 /**
  * @route --> /activities/add
  * @description --> It will allow us to add a new activity to the DB
  */
router.post('/add', addActivity);
 
  /**
  * @route --> /activities/update/:id
  * @description --> It will allow us to edit a specific activity given its id
  */
router.put('/update/:id', updateActivity);
 
 /**
  * @route --> /activities/:id
  * @description --> It will allow us to delete a specific activity given its id
  */
router.delete('/:id', deleteActivity);
 
module.exports = router;