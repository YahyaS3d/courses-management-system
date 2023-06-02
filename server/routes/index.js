const fs = require('fs');
const validator = require('validator');

// variables
const dataPath = './server/data/coursesData.json';

// helper methods
const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
  fs.readFile(filePath, encoding, (err, data) => {
    if (err) {
      console.log(err);
    }
    if (!data) data = "{}";
    callback(returnJson ? JSON.parse(data) : data);
  });
};

const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {
  fs.writeFile(filePath, fileData, encoding, (err) => {
    if (err) {
      console.log(err);
    }

    callback();
  });
};

module.exports = {
  // READ
  getCourses: function (req, res) {
    readFile((data) => {
      res.send(!data ? {} : JSON.parse(data));
    });
  },

  // CREATE
  createCourse: function (req, res) {
    const courseDetails = req.body;

    readFile((data) => {
      if (data[courseDetails.id]) {
        return res.status(400).send("The course ID already exists.");
      }

      if (!courseDetails.id || !courseDetails.name || !courseDetails.lecturer || !courseDetails.startDate || !courseDetails.endDate) {
        return res.status(400).send("Missing required fields.");
      }

      data[courseDetails.id] = courseDetails;

      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send("New course added.");
      });
    }, true);
  },

  // UPDATE
  updateCourse: function (req, res) {
    const courseId = req.params.id;
    const courseDetails = req.body;

    readFile((data) => {
      if (!data[courseId]) {
        return res.status(400).send("The course ID does not exist.");
      }

      for (let field in courseDetails) {
        if (field !== "id" && field !== "students") {
          data[courseId][field] = courseDetails[field];
        }
      }

      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send(`Course ID: ${courseId} updated.`);
      });
    }, true);
  },

  // ADD STUDENT TO COURSE
  addStudentToCourse: function (req, res) {
    const courseId = req.params.id;
    const studentDetails = req.body;

    readFile((data) => {
      if (!data[courseId]) {
        return res.status(400).send("The course ID does not exist.");
      }

      if (!studentDetails.id || !studentDetails.firstName || !studentDetails.lastName || !studentDetails.picture || !studentDetails.grade) {
        return res.status(400).send("Missing required fields.");
      }

      if (data[courseId].students[studentDetails.id]) {
        return res.status(400).send("The student already exists in the course.");
      }

      data[courseId].students[studentDetails.id] = studentDetails;

      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send("New student added to the course.");
      });
    }, true);
  },

  // GET COURSE
  getCourse: function (req, res) {
    const courseId = req.params.id;

    readFile((data) => {
      if (!data[courseId]) {
        return res.status(400).send("The course ID does not exist.");
      }

      res.status(200).send(data[courseId]);
    }, true);
  },

  // DELETE STUDENT FROM COURSE
  deleteStudentFromCourse: function (req, res) {
    const courseId = req.params.courseId;
    const studentId = req.params.studentId;

    readFile((data) => {
      if (!data[courseId]) {
        return res.status(400).send("The course ID does not exist.");
      }

      if (!data[courseId].students[studentId]) {
        return res.status(400).send("The student ID does not exist in the course.");
      }

      delete data[courseId].students[studentId];

      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send(`Student ID: ${studentId} removed from the course.`);
      });
    }, true);
  },

  // DELETE COURSE
  deleteCourse: function (req, res) {
    const courseId = req.params.id;

    readFile((data) => {
      if (!data[courseId]) {
        return res.status(400).send("The course ID does not exist.");
      }

      delete data[courseId];

      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send(`Course ID: ${courseId} removed.`);
      });
    }, true);
  },
};
