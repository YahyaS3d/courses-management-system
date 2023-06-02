$(document).ready(function() {
    // Handle form submission
    $('#add-course-form').submit(function(event) {
        event.preventDefault();

        var courseId = $('input[name="courseId"]').val();
        var courseName = $('input[name="courseName"]').val();
        var lecturerName = $('input[name="lecturerName"]').val();

        addCourse(courseId, courseName, lecturerName);
    });

    // Handle back to list button click
    $('#back-to-list').click(function() {
        window.location.href = '/list'; // Redirect back to the course list
    });

    // Function to add a new course
    function addCourse(courseId, courseName, lecturerName) {
        $.ajax({
            type: 'POST',
            url: '/courses/create',
            data: {
                courseId: courseId,
                courseName: courseName,
                lecturerName: lecturerName
            },
            success: function(response) {
                console.log('Course added successfully');
                window.location.href = '/list'; // Redirect back to the course list
            },
            error: function() {
                console.log('Failed to add course');
            }
        });
    }
});
