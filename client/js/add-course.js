$(document).ready(function() {
    // Handle form submission
    $('#add-course-form').submit(function(event) {
        event.preventDefault();

        var courseId = $('input[name="courseId"]').val();
        var courseName = $('input[name="courseName"]').val();
        var lecturerName = $('input[name="lecturerName"]').val();
        var startDate = $('input[name="startDate"]').val();
        var endDate = $('input[name="endDate"]').val();
        var prerequisiteCourses = $('input[name="prerequisiteCourses"]').val().split(',');

        addCourse(courseId, courseName, lecturerName, startDate, endDate, prerequisiteCourses);
    });

    // Handle back to list button click
    $('#back').click(function() {
        window.location.href = '/list'; // Redirect back to the course list
    });

    // Function to add a new course
    function addCourse(courseId, courseName, lecturerName, startDate, endDate, prerequisiteCourses) {
        $.ajax({
            type: 'POST',
            url: '/courses/create',
            data: {
                id: courseId,
                name: courseName,
                lecturer: lecturerName,
                start_date: startDate,
                end_date: endDate,
                prerequisite_course: prerequisiteCourses
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
