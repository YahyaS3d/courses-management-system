$(document).ready(function() {
    // Load course list on page load
    loadCourseList();

    // Handle add course button click
    $('#add-course').click(function() {
        window.location.href = '/new'; // Redirect to the add course form
    });

    // Function to load the course list
    function loadCourseList() {
        $.ajax({
            type: 'GET',
            url: '/courses/get-all',
            success: function(response) {
                if (Object.keys(response).length > 0) {
                    var courseList = '';
                    for (var courseId in response) {
                        var course = response[courseId];
                        courseList += `
                            <div class="course">
                                <div class="course-details">
                                    <div>Course ID: ${course.id}</div>
                                    <div>Course Name: ${course.name}</div>
                                    <div>Lecturer's Name: ${course.lecturer}</div>
                                    <div>Start Date: ${course.start_date}</div>
                                    <div>End Date: ${course.end_date}</div>
                                    <div>Prerequisite Courses: ${course.prerequisite_course.join(', ')}</div>
                                </div>
                                <div class="course-actions">
                                    <button class="edit-course" data-course-id="${course.id}">Edit</button>
                                    <button class="delete-course" data-course-id="${course.id}">Delete</button>
                                    <button class="add-student" data-course-id="${course.id}">Add Student</button>
                                    <button class="view-students" data-course-id="${course.id}">View Students</button>
                                </div>
                            </div>
                        `;
                    }
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
            url: `/courses/delete/${courseId}`,
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
            url: `/courses/get/${courseId}`,
            success: function(response) {
                var studentList = '';
                if (Object.keys(response.students).length > 0) {
                    for (var studentId in response.students) {
                        var student = response.students[studentId];
                        studentList += `
                            <div class="student">
                                <div>Student ID: ${student.id}</div>
                                <div>Student Name: ${student.name}</div>
                                <div>Grade: ${student.grade}</div>
                                <button class="delete-student" data-course-id="${courseId}" data-student-id="${student.id}">Delete</button>
                            </div>
                        `;
                    }
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
            url: `/courses/delete-student/${courseId}/${studentId}`,
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
