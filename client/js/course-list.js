$(document).ready(function() {
    // Load course list on page load
    loadCourseList();

    // Handle add course button click
    $('#add-course').click(function() {
        window.location.href = '/add_course'; // Redirect to the add course form
    });

    // Function to load the course list
    function loadCourseList() {
        $.ajax({
            type: 'GET',
            url: '/getCourses',
            success: function(response) {
                if (response.length > 0) {
                    var courseList = '';
                    response.forEach(function(course) {
                        courseList += `
                            <div class="course">
                                <div class="course-details">
                                    <div>Course ID: ${course.courseId}</div>
                                    <div>Course Name: ${course.courseName}</div>
                                    <div>Lecturer's Name: ${course.lecturerName}</div>
                                    <div>Start Date: ${course.startDate}</div>
                                    <div>End Date: ${course.endDate}</div>
                                </div>
                                <div class="course-actions">
                                    <button class="edit-course" data-course-id="${course.courseId}">Edit</button>
                                    <button class="delete-course" data-course-id="${course.courseId}">Delete</button>
                                    <button class="add-student" data-course-id="${course.courseId}">Add Student</button>
                                    <button class="view-students" data-course-id="${course.courseId}">View Students</button>
                                </div>
                            </div>
                        `;
                    });
                    $('#course-list').html(courseList);
                } else {
                    $('#course-list').html('<p>No courses found.</p>');
                }
            },
            error: function() {
                console.log('Failed to load course list');
            }
        });
    }

    // Handle edit course button click
    $(document).on('click', '.edit-course', function() {
        var courseId = $(this).data('course-id');
        window.location.href = `/edit_course/${courseId}`; // Redirect to the edit course form
    });

    // Handle delete course button click
    $(document).on('click', '.delete-course', function() {
        var courseId = $(this).data('course-id');
        deleteCourse(courseId);
    });

    // Handle add student button click
    $(document).on('click', '.add-student', function() {
        var courseId = $(this).data('course-id');
        window.location.href = `/add_student/${courseId}`; // Redirect to the add student form
    });

    // Handle view students button click
    $(document).on('click', '.view-students', function() {
        var courseId = $(this).data('course-id');
        loadStudentList(courseId);
    });

    // Function to delete a course
    function deleteCourse(courseId) {
        $.ajax({
            type: 'DELETE',
            url: `/deleteCourse/${courseId}`,
            success: function(response) {
                console.log('Course deleted successfully');
                loadCourseList();
            },
            error: function() {
                console.log('Failed to delete course');
            }
        });
    }

    // Function to load the student list for a course
    function loadStudentList(courseId) {
        $.ajax({
            type: 'GET',
            url: `/getCourse/${courseId}`,
            success: function(response) {
                var studentList = '';
                if (response.students.length > 0) {
                    response.students.forEach(function(student) {
                        studentList += `
                            <div class="student">
                                <div>Student ID: ${student.studentId}</div>
                                <div>Student Name: ${student.studentName}</div>
                                <div>Grade: ${student.grade}</div>
                                <button class="delete-student" data-course-id="${courseId}" data-student-id="${student.studentId}">Delete</button>
                            </div>
                        `;
                    });
                } else {
                    studentList = '<p>No students found.</p>';
                }
                $('#student-list').html(studentList).show();
            },
            error: function() {
                console.log('Failed to load student list');
            }
        });
    }

    // Handle delete student button click
    $(document).on('click', '.delete-student', function() {
        var courseId = $(this).data('course-id');
        var studentId = $(this).data('student-id');
        deleteStudent(courseId, studentId);
    });

    // Function to delete a student from a course
    function deleteStudent(courseId, studentId) {
        $.ajax({
            type: 'DELETE',
            url: `/deleteStudentFromCourse/${courseId}/${studentId}`,
            success: function(response) {
                console.log('Student deleted successfully');
                loadStudentList(courseId);
            },
            error: function() {
                console.log('Failed to delete student');
            }
        });
    }
});
