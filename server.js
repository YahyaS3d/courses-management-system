const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const port = 3001;
const app = express();
// Serve the guide.html file as the default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/html/guide.html'));
  });
  
app.use('/new', express.static(path.join(__dirname, 'client/html/add_new_course.html')));
app.use('/add_student_form', express.static(path.join(__dirname, 'client/html/add_student_form.html')));
app.use('/edit_course/:id', express.static(path.join(__dirname, 'client/html/edit_course.html')));
app.use('/list', express.static(path.join(__dirname, 'client/html/list.html')));
app.use('/view_student/:id', express.static(path.join(__dirname, 'client/html/view_student.html')));
app.use('/js', express.static(path.join(__dirname, 'client/js')));
app.use('/css', express.static(path.join(__dirname, 'client/css')));
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.json());
// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// JSON file path
const dataPath = path.join(__dirname, 'server/data/courseData.json');

// READ
app.get('/courses/get-all', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Failed to load course list');
    }

    const courseData = JSON.parse(data);
    res.status(200).send(courseData);
  });
});

// CREATE
app.post('/courses/create', (req, res) => {
  const courseDetails = req.body;

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Failed to add course');
    }

    const courseData = JSON.parse(data);

    if (courseData[courseDetails.id]) {
      return res.status(400).send('The course ID already exists.');
    }

    if (!courseDetails.id || !courseDetails.name || !courseDetails.lecturer) {
      return res.status(400).send('Missing required fields.');
    }

    courseData[courseDetails.id] = courseDetails;

    fs.writeFile(dataPath, JSON.stringify(courseData, null, 2), (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Failed to add course');
      }

      console.log('Course added successfully');
      res.status(200).send('New course added.');
    });
  });
});

// UPDATE
app.put('/courses/update/:id', (req, res) => {
  const courseId = req.params.id;
  const courseDetails = req.body;

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Failed to update course');
    }

    const courseData = JSON.parse(data);

    if (!courseData[courseId]) {
      return res.status(400).send('The course ID does not exist.');
    }

    for (let field in courseDetails) {
      if (field !== 'id') {
        courseData[courseId][field] = courseDetails[field];
      }
    }

    fs.writeFile(dataPath, JSON.stringify(courseData, null, 2), (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Failed to update course');
      }

      console.log('Course updated successfully');
      res.status(200).send('Course updated.');
    });
  });
});

// DELETE
app.delete('/courses/delete/:id', (req, res) => {
  const courseId = req.params.id;

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Failed to delete course');
    }

    const courseData = JSON.parse(data);

    if (!courseData[courseId]) {
      return res.status(400).send('The course ID does not exist.');
    }

    delete courseData[courseId];

    fs.writeFile(dataPath, JSON.stringify(courseData, null, 2), (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Failed to delete course');
      }

      console.log('Course deleted successfully');
      res.status(200).send('Course deleted.');
    });
  });
});

// ADD STUDENT TO COURSE
app.post('/courses/add-student/:id', (req, res) => {
  const courseId = req.params.id;
  const studentDetails = req.body;

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Failed to add student to course');
    }

    const courseData = JSON.parse(data);

    if (!courseData[courseId]) {
      return res.status(400).send('The course ID does not exist.');
    }

    if (!studentDetails.studentId || !studentDetails.studentName || !studentDetails.grade) {
      return res.status(400).send('Missing required fields.');
    }

    if (!courseData[courseId].students) {
      courseData[courseId].students = [];
    }

    courseData[courseId].students.push(studentDetails);

    fs.writeFile(dataPath, JSON.stringify(courseData, null, 2), (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Failed to add student to course');
      }

      console.log('Student added to course successfully');
      res.status(200).send('Student added to course.');
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
