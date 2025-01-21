let isDrawing = false; // Variable to track if the mouse button is pressed

let color = "0, 0, 0";

// Add a mousedown event listener to set the drawing state
document.addEventListener("mousedown", function () {
    isDrawing = true;
    // console.log("isDrawing: ", + isDrawing);
});

// Add a mouseup event listener to reset the drawing state
document.addEventListener("mouseup", function () {
    isDrawing = false;
    // console.log("isDrawing: ", + isDrawing);
});

function colorBox (e) {
    if (isDrawing) {
        if (isShading) {
            // Get current background color and increment opacity
            let currentOpacity = parseFloat(e.target.dataset.opacity) || 0;
            currentOpacity = Math.min(currentOpacity + 0.1, 1); // Increment by 10%, max at 100%
            e.target.style.backgroundColor = `rgba(${color}, ${currentOpacity})`;
            e.target.dataset.opacity = currentOpacity; // Store the new opacity
        }
        else {
            e.target.style.background = `rgb(${color})`; // Change color only if mouse is pressed
            e.target.dataset.opacity = 1; // Reset opacity to 100%
        }
    }
}

// change the color of the brush
function changeColor (inputcolor) {
    color = inputcolor;
    // console.log("Changed brush color to " + color);
}

// Prompt for changing to custom color:
function promptColorChange () {
    const inputcolor = prompt(
        `Enter color hex code in the format r, g, b

        For example: 0,0,0 (black); 255,255,255 (white); 255,0,0 (red)
        `
    );
    // Regular expression to validate the input format
    const rgbRegex = /^\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\s*$/;
    if (inputcolor === null) {
        return; // Exit the function without doing anything
    }

    if (!rgbRegex.test(inputcolor)) {
        alert("Color entered in an invalid format. Please try again.");
        promptColorChange(); // Re-prompt for a valid input
    } else {
        const [r, g, b] = inputcolor.match(rgbRegex).slice(1).map(Number);

        // Check if RGB values are in the valid range (0-255)
        if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
            alert("RGB values must be between 0 and 255. Please try again.");
            promptColorChange(); // Re-prompt for a valid input
        } else {
            changeColor(inputcolor); // Pass the validated color to your function
        }
    }   
}

let isShading = false;

// change brush to shading mode:
function toggleShading () {
    isShading = !isShading;
}

// Create Each box in the Row
function createBox(){
    const box = document.createElement('div');
    box.setAttribute('class', 'box');
    box.addEventListener("mouseenter", (e) => colorBox(e));
    return box;
}

// Create each row for the graph
function createRow(n){
    const row = document.createElement('div');
    row.setAttribute('class', 'row');
    for(let i=0; i<n; i++){
        const box = createBox();
        row.appendChild(box);
    }
    return row;
}

// Create new sketchpad div
function createGraph(n){
    const body = document.querySelector('body');
    const sketchpad = document.createElement('div');
    sketchpad.setAttribute('class', 'sketchpad');
    
    for(let i=0; i<n; i++){
        const row = createRow(n);
        sketchpad.appendChild(row);
    }

    body.appendChild(sketchpad);
}

// Clear the sketchpad div
function clearGraph(){
    const body = document.querySelector('body');
    const sketchpad = document.querySelector('.sketchpad');
    body.removeChild(sketchpad);
}

//Initial Prompt
function init() {
    const graphSize = prompt("Enter graph size N to make a NxN grid. N must be less than 100.");
    if (graphSize === null) {
        return; // Exit the function without doing anything
    }
    if (graphSize > 100){
        alert("Grpah size too big! N must be less than 100.");
        init();
    }
    else if(graphSize < 0){
        alert("Graph size cannot be a negative number!");
        init();
    }
    else if(document.querySelector('.sketchpad') == null){
        createGraph(graphSize);
    }
    else{
        clearGraph();
        createGraph(graphSize);
    }
}

function printImage () {
    const sketchpad = document.querySelector(".sketchpad");

    if (!sketchpad) {
        alert("Sketchpad not found!");
        return;
    }
    // Trigger the print dialog
    window.print();
}

// Bind all buttons to their respective event
const newGridBtn = document.querySelector('.new');
newGridBtn.addEventListener('click', () => init());

const clearGridBtn = document.querySelector('.clear');
clearGridBtn.addEventListener('click', () => clearGraph());

const switchColorBtn = document.querySelector('.switch');
switchColorBtn.addEventListener('click', () => promptColorChange());

const switchBlackBtn = document.querySelector('.black');
switchBlackBtn.addEventListener('click', () => changeColor("0, 0, 0"));

const shadeBtn = document.querySelector('.shade');
shadeBtn.addEventListener('click', () => toggleShading());

const eraserBtn = document.querySelector('.eraser');
eraserBtn.addEventListener('click', () => changeColor("255, 255, 255"));

const printkBtn = document.querySelector('.print');
printkBtn.addEventListener('click', () => printImage());

//Driver code for testing. Comment Out before making live.
// createGraph(50);