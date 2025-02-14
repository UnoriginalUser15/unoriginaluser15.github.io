setTimeout(function(){
    document.getElementById("start-up").style.display = "none";
    document.getElementById("os").style.display = "block";
}, 0);

// 5500 is the actual time that should be used in the code above
// 0 is just for testing/dev purposes

// make the openable windows draggable
// yes this is shamelessly stolen from w3schools
// i'm goint to adapt it more in the morning (it's 4:13 am)

// update: i tried to adapt it to make it so the window can't be dragged into the void
// the important word there is 'tried' (i'm going to end it)

// finish the system that controls the window order

var window_order = [];
const desktop = document.getElementById("window-container");

for (const window of desktop.children){
    dragElement(window);
    window_order.push(window.getAttribute("id"))
}

console.log(window_order)

function dragElement(elmnt, window_order) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (elmnt.querySelector(".windowheader")) {
        // if present, the header is where you move the window from
        elmnt.querySelector(".windowheader").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the window from anywhere inside the window
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

        // makes the selected window be above all other windows
        const id = elmnt.getAttribute("id")
        document.getElementById(id).style.zIndex = "50";
    }

    function closeDragElement() {
        // stop moving when mouse button is released
        document.onmouseup = null;
        document.onmousemove = null;
        
        // moves the window back to 10 on the z-index
        const id = elmnt.getAttribute("id")
        var new_window_order = window_order.filter()
    }
}

// closes a window that has been opened
function windowOpenClose(id) {
    var x = document.getElementById(id);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}