const express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    fs = require('fs'),
    cors = require('cors'),
    routers = require('./server/routes/routes.js');

const port = 3001;
const app = express();
app.use('/new', express.static(path.join(__dirname, 'client/html/add_new_course.html')));
app.use('/add_student_form', express.static(path.join(__dirname, 'client/html/add_student_form.html')));
app.use('/edit_course/:id', express.static(path.join(__dirname, 'client/html/edit_course.html')));
app.use('/index', express.static(path.join(__dirname, 'client/html/index.html')));
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

// Routes
app.use('/', routers);

const server = app.listen(port, () => {
  console.log('Listening on port %s...', server.address().port);
});
