$(document).ready(function() {
    var courseId = window.location.pathname.split('/').pop();

    // Load student list on page load
    loadStudentList(courseId);

    // Handle back to list button click
    $('#back-to-list').click(function() {
        window.location.href = '/list'; // Redirect back to the course list
    });

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
                $('#student-list').html(studentList);
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
