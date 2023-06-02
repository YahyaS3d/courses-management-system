const express = require('express');
const indexRoutes = require('./index');

const router = express.Router();

router.post('/courses/create', indexRoutes.createCourse);
router.put('/courses/update/:id', indexRoutes.updateCourse);
router.post('/courses/add-student/:id', indexRoutes.addStudentToCourse);
router.get('/courses/get/:id', indexRoutes.getCourse);
router.get('/courses/get-all', indexRoutes.getCourses);
router.delete('/courses/delete-student/:courseId/:studentId', indexRoutes.deleteStudentFromCourse);
router.delete('/courses/delete/:id', indexRoutes.deleteCourse);

module.exports = router;