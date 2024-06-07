setTimeout(function(){
    // Select all elements and add a class to trigger the fall animation
    var elements = document.querySelectorAll('*');
    elements.forEach(function(element) {
        element.classList.add('fall-down');
        //element.classList.add('disappear');
    });
}, 2000); // Wait for 5 seconds before triggering the animation