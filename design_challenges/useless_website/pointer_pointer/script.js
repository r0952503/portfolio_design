document.addEventListener('mousemove', function(e) {
    var pointer = document.getElementById('pointer');
    pointer.style.left = e.pageX + 'px';
    pointer.style.top = e.pageY + 'px';
  });
  