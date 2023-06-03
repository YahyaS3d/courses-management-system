$(document).ready(function() {
    // Handle form submission
    $('#add-student-form').submit(function(event) {
        event.preventDefault();

        var studentId = $('input[name="studentId"]').val();
        var studentName = $('input[name="studentName"]').val();
        var grade = $('input[name="grade"]').val();

        var courseId = window.location.pathname.split('/').pop();

        addStudent(courseId, studentId, studentName, grade);
    });

    // Handle back to list button click
    $('#back').click(function() {
        window.location.href = '/list'; // Redirect back to the course list
    });

    // Function to add a new student to a course
    function addStudent(courseId, studentId, studentName, grade) {
        $.ajax({
            type: 'POST',
            url: `/courses/add-student/${courseId}`,
            data: {
                id: studentId,
                name: studentName,
                grade: grade
            },
            success: function(response) {
                console.log('Student added successfully');
                window.location.href = '/list'; // Redirect back to the course list
            },
            error: function() {
                console.log('Failed to add student');
            }
        });
    }
});