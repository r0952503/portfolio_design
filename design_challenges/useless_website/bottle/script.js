document.addEventListener('DOMContentLoaded', function() {
    // Prevent default scrolling behavior
    document.body.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, { passive: false });

    // Disable scroll for mouse wheel and keyboard
    window.addEventListener('wheel', function(e) {
        e.preventDefault();
    }, { passive: false });

    window.addEventListener('keydown', function(e) {
        // Space, Page Up, Page Down, End, Home, Arrow keys
        if([32, 33, 34, 35, 36, 37, 38, 39, 40].includes(e.keyCode)) {
            e.preventDefault();
        }
    }, { passive: false });

    let kraan = document.querySelector("#kraan");
    let bottle = document.querySelector("#bottle");
    let drop = document.querySelector("#drop");
    let fill = document.querySelector("#fill");
    let drink = document.querySelector("#drink");
    let reset = document.querySelector("#reset");

    fill.addEventListener("click", function (e) {
        e.preventDefault();

        let kraanRect = kraan.getBoundingClientRect();
        let bottleRect = bottle.getBoundingClientRect();

        let kraanEndRange = kraanRect.right - 20; 
        let kraanStartRange = kraanRect.left + 20; 
        
        console.log("kraanRect:", kraanRect);
        console.log("bottleRect:", bottleRect);
        console.log("kraanStartRange:", kraanStartRange);
        console.log("kraanEndRange:", kraanEndRange);

        if (bottleRect.left >= kraanStartRange && bottleRect.left <= kraanEndRange) {
            let currentTop = parseFloat(getComputedStyle(drop).top);
            let newTop = currentTop + 800;

            drop.style.transition = "top 1.9s ease";
            drop.style.top = newTop + "px";

            setTimeout(function() {
                drop.style.transition = "none";
                drop.style.top = "160px";
                drop.style.display = "none"; // Make the drop disappear after filling
            }, 500);

            setTimeout(function() {
                bottle.src = "images/filled.png";
            }, 500);
        } else {
            console.log("The bottle is not in the correct position to fill.");
        }
    });

    let isDragging = false;
    let startX;
    let startLeft;

    bottle.addEventListener("mousedown", startDrag);
    bottle.addEventListener("touchstart", startDrag, { passive: false });

    function startDrag(e) {
        e.preventDefault();
        isDragging = true;
        startX = e.clientX || e.touches[0].clientX;
        startLeft = parseFloat(getComputedStyle(bottle).left);
        bottle.style.userSelect = "none";
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", stopDrag);
        document.addEventListener("touchmove", onTouchMove, { passive: false });
        document.addEventListener("touchend", stopDrag);
    }

    function onMouseMove(e) {
        if (isDragging) {
            let mouseX = e.clientX;
            let offsetX = mouseX - startX;
            let newLeft = startLeft + offsetX;
            bottle.style.left = newLeft + "px";
        }
    }

    function onTouchMove(e) {
        if (isDragging) {
            let touchX = e.touches[0].clientX;
            let offsetX = touchX - startX;
            let newLeft = startLeft + offsetX;
            bottle.style.left = newLeft + "px";
        }
    }

    function stopDrag(e) {
        isDragging = false;
        bottle.style.userSelect = "";
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", stopDrag);
        document.removeEventListener("touchmove", onTouchMove);
        document.removeEventListener("touchend", stopDrag);
    }

    drink.addEventListener("click", function (e) {
        e.preventDefault();
        bottle.style.transform = "rotate(30deg)";

        if (bottle.src.includes("filled.png")) {
            bottle.src = "images/www.png";
            document.getElementById("tone").style.display = "none";

            setTimeout(function() {
                document.getElementById("thanks").style.display = "block";
            }, 500);
        } else {
            document.getElementById("thanks").style.display = "none";

            setTimeout(function() {
                document.getElementById("tone").style.display = "block";
            }, 500);
        }

        setTimeout(function() {
            reset.style.backgroundColor = "#FBB040";
        }, 1000);

        setTimeout(function() {
            reset.style.color = "#fffdd0";
        }, 1000);
    });
});
