// Code format inspired by Saha.M --> https://dev.to/mritunjaysaha/mern-stack-todo-application-backend-282a
const router = require('express').Router();

const {
    getSubjects,
    getSubject,
    addSubject,
    updateSubject,
    deleteSubject
} = require("../controllers/subjects");

/**
 * @route --> /subjects/
 * @description --> It will return all the registered subjects
 */
router.get('/', getSubjects);

/**
 * @route --> /subjects/:id
 * @description --> It will return a single registered subject
 */
 router.get('/:id', getSubject);

/**
 * @route --> /subjects/add
 * @description --> It will allow us to add a new subject to the DB
 */
router.post('/add', addSubject);

 /**
 * @route --> /subjects/update/:id
 * @description --> It will allow us to edit a specific subject given its id
 */
router.put('/update/:id', updateSubject);

/**
 * @route --> /subjects/:id
 * @description --> It will allow us to delete a specific subject given its id
 */
router.delete('/:id', deleteSubject);

module.exports = router;