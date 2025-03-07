setTimeout(() => {
    document.getElementById("start-up").style.display = "none";
    document.getElementById("os").style.display = "block";
}, 5500);

// 5500 is the actual time that should be used in the code above
// 0 is just for testing/dev purposes

// make the openable windows draggable
// yes this is shamelessly stolen from w3schools
// i'm goint to adapt it more in the morning (it's 4:13 am)

// update: i tried to adapt it to make it so the window can't be dragged into the void
// the important word there is 'tried' (i'm going to end it)

// after a 5 minute coding adventure (2 hours), the system that controls the order of windows is done

let window_order = [];
const desktop = document.getElementById("window-container");

// this creates the array of window ids
for (const window of desktop.children){
    window_order.push(window.getAttribute("id"));
}

// this calls the dragElement() function
for (const window of desktop.children){
    dragElement(window, window_order);
}

// controls everything to do with dragging a window
function dragElement(elmnt, window_order) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (elmnt.querySelector(".windowheader")) {
        // if present, the header is where you move the window from
        elmnt.querySelector(".windowheader").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the window from anywhere inside the window
        elmnt.onmousedown = dragMouseDown;
    }
    
    // puts the current window on top
    elmnt.onmousedown = orderWindows;

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

        // makes the window return to original size if maximised
        if (elmnt.getAttribute("maximised") == "true") {
            // positions the window to where your mouse is
            elmnt.style.top = pos4 + "px";
            elmnt.style.left = pos3 + "px";
            // makes the window the original size
            elmnt.style.width = elmnt.getAttribute("data-width");
            elmnt.style.height = elmnt.getAttribute("data-height");
            // adds the curved top corners
            elmnt.style.borderRadius = "0.5rem 0.5rem 0rem 0rem";
            
            elmnt.setAttribute("maximised", false);
        }
        
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
        const id = elmnt.getAttribute("id");
        document.getElementById(id).style.zIndex = "50";
    }

    function closeDragElement() {
        // stop moving when mouse button is released
        document.onmouseup = null;
        document.onmousemove = null;
    }

    function orderWindows() {
        const id = elmnt.getAttribute("id");
        // removes the previously clicked window's id from the array and puts it on the end
        const index = window_order.indexOf(id);
        if (index !== -1) {
            window_order.splice(index, 1);
        }
        window_order.push(id);

        // orders the z-index of the windows based on order of last clicked
        let i = 10;
        for (const temp_id of window_order){
            document.getElementById(temp_id).style.zIndex = i;
            i += 1;
        }
    }
}

// opens window and creates taskbar button
function windowOpen(id, task_id) {
    // only creates a taskbar button if it doesn't exist
    if (document.getElementById(task_id) == null) {
        // makes the window visible
        const window = document.getElementById(id);
        window.style.display = "block";

        // creates the taskbar button
        const taskbar = document.getElementById("taskbar-container");

        const taskbar_button = document.createElement("button");
        const button_text = document.createTextNode(document.getElementById(id + "Name").textContent);

        taskbar_button.appendChild(button_text);
        taskbar_button.setAttribute("class", "taskbar-button");
        taskbar_button.setAttribute("id", task_id);

        const task_function = "taskbarClick('" + id + "')"
        taskbar_button.setAttribute("onclick", task_function);

        taskbar.appendChild(taskbar_button);
    } else {
        // makes the window visible
        const window = document.getElementById(id);
        window.style.display = "block";
    }
    // removes the previously clicked window's id from the array and puts it on the end
    const index = window_order.indexOf(id);
    if (index !== -1) {
        window_order.splice(index, 1);
    }
    window_order.push(id);

    // orders the z-index of the windows based on order of last clicked
    let i = 10;
    for (const temp_id of window_order){
        document.getElementById(temp_id).style.zIndex = i;
        i += 1;
    }
}


function taskbarClick(id) {
    const window = document.getElementById(id);
    // if the window is minimised it will be opened and put above other windows
    if (window.style.display == "none") {
        window.style.display = "block";
    } else {
        window.style.display = "none";
    }
    // removes the previously clicked window's id from the array and puts it on the end
    const index = window_order.indexOf(id);
    if (index !== -1) {
        window_order.splice(index, 1);
    }
    window_order.push(id);

    // orders the z-index of the windows based on order of last clicked
    let i = 10;
    for (const temp_id of window_order){
        document.getElementById(temp_id).style.zIndex = i;
        i += 1;
    }
}

// closes window and removes taskbar button
function windowClose(id, task_id) {
    const window = document.getElementById(id);
    const taskbar_button = document.getElementById(task_id);
    
    window.style.display = "none";
    taskbar_button.remove();
}

// minimises window
function windowMinimise(id) {
    const window = document.getElementById(id);
    window.style.display = "none";
}

// maximises window
function windowMaximise(id) {
    const window = document.getElementById(id);
    const os = document.getElementById("os");

    const osWidth = os.clientWidth.toString();
    const osHeight = os.clientHeight.toString();

    if (window.getAttribute("maximised") == "false") {
        // stores the width + height prior to maximising
        window.setAttribute("data-width", window.clientWidth + "px");
        window.setAttribute("data-height", window.clientHeight + "px");
        // sets maximise to true
        window.setAttribute("maximised", true);

        // puts the window in the top left of the page 
        window.style.top = "0px";
        window.style.left = "0px";

        // makes the window the size of the desktop
        window.style.width = osWidth + "px";
        window.style.height = osHeight + "px";

        // removes the rounding at the top of the window
        window.style.borderRadius = "0px";

        // removes the previously clicked window's id from the array and puts it on the end
        const index = window_order.indexOf(id);
        if (index !== -1) {
            window_order.splice(index, 1);
        }
        window_order.push(id);

        // orders the z-index of the windows based on order of last clicked
        let i = 10;
        for (const temp_id of window_order){
            document.getElementById(temp_id).style.zIndex = i;
            i += 1;
        }
    } else {
        // if the window is already maximised it reverts to original size
        window.style.width = window.getAttribute("data-width");
        window.style.height = window.getAttribute("data-height");
        // adds the curved top corners
        window.style.borderRadius = "0.5rem 0.5rem 0rem 0rem";

        window.setAttribute("maximised", false);
    }
}

// resets window to it's original qualities
function windowReset(window_order) {
    // iterates through windows
    window_order.forEach((id) => {
        let window = document.getElementById(id);

        // moves window to the top right of the page
        window.style.top = "0px";
        window.style.left = "0px";

        // sets data size values to the original size
        window.setAttribute("data-width", window.getAttribute("original-width"));
        window.setAttribute("data-height", window.getAttribute("original-height"));

        // resets window to original size
        window.style.width = window.getAttribute("original-width");
        window.style.height = window.getAttribute("original-height");
    });
}

// gets current time for the clock
setInterval(() => {
    const today = new Date();

    let hour = today.getHours();
    let minute = today.getMinutes();

    hour = checkTime(hour);
    minute = checkTime(minute);

    document.getElementById('clock').innerHTML =  hour + ":" + minute ;

    function checkTime(i) {
        if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
        return i;
    }
}, 1000);
