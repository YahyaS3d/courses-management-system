
# Courses Management System
 

This project implements a Courses Management System, which allows the administration of courses, students, and grades. It consists of a full-stack application built with Node.js, Express.js, and jQuery.

## Features

- Create, read, update, and delete (CRUD) operations for courses
- Add students to courses and manage their grades
- View course details and lists of students
- Delete courses and students from the system

## Requirements

- Node.js (version 16.13.1)
- npm (version 8.1.2)

## Installation

1. Clone the repository to your local machine using Git or download the source code as a ZIP file and extract it.
2. Navigate to the project directory: `cd courses-management-system`
3. Install the dependencies: `npm install`
4. npm install express body-parser path fs cors

## Usage

1. Start the server: `npm start`
2. Open a web browser and go to: `http://localhost:3001`
3. routes are display in the guide page as buttons - the user can navigate easy through it

## Folder And File Structure
- `server.js`: Entry point for the Node.js application
- `server/`: Contains the server-side code
  - `data/`: Contains json file courseData.json 
  - `courseData.json`: store courses in json formate like the example form 
  - `routes/`: Contains the route handlers
    - `routes.js`: Main router file for the application
    - `index.js`: Controller functions for course management

- `client/`: Contains the client-side code
  - `html/`: Contains HTML files 
  - `guide.html`: localhost3001 default page  
  - `index.html`: Main HTML file for the web application
  - `add_new_course.html`: html file to add new course to the list 
  - `add_student_form.html`: html file to add new student
  - `edit_course.html`: html file to edit and manage existing course
  - `view_student.html`: html file to view student details 
  
  - `css/`: Contains CSS stylesheets
    - `style.css`: Custom styles for the application
    - `guide.css`: localhost3001 default style for the page  
  - `js/`: Contains JavaScript files
    - `add-course.js`: Logic for adding a new course
    - `add-student.js`: Logic for adding a new student
    - `course-list.js`: Logic for loading and managing the course list
    - `guide.js`: Logic for displaying the guide page
    - `view-students.js`: Logic for viewing the list of students for a course

## API Routes

`POST` /courses/create: Create a new course.
`PUT` /courses/update/:id: Update course details for a specific course.
`POST` /courses/add-student/:id: Add a student to a course.
`GET` /courses/get/:id: Get details of a specific course.
`GET` /courses/get-all: Get a list of all courses.
`DELETE` /courses/delete-student/:courseId/:studentId: Delete a student from a course.
`DELETE` /courses/delete/:id: Delete a course.

## Testing 
- `test.js`- contains unit testing for the project "backend api especially" 
start the test: 
1. npm install --save-dev mocha chai
2. npm test.js  
## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

