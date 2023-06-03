window.onload = function() {
    // Get the list of buttons
    var buttons = document.querySelectorAll('.route-button');
  
    // Attach click event listeners to each button
    buttons.forEach(function(button) {
      button.addEventListener('click', function() {
        var route = button.dataset.route;
        // Redirect to the specified route
        window.location.href = route;
      });
    });
  };
  