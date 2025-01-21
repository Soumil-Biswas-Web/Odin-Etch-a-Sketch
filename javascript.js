let isDrawing = false; // Variable to track if the mouse button is pressed

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

let color = "0, 0, 0";

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

// Bind `New Grid` button to init event
const newGridBtn = document.querySelector('.new');
newGridBtn.addEventListener('click', () => init());

const clearGridBtn = document.querySelector('.clear');
clearGridBtn.addEventListener('click', () => clearGraph());

const switchColorBtn = document.querySelector('.switch');
switchColorBtn.addEventListener('click', () => changeColor("255, 0, 0"));

const switchBlackBtn = document.querySelector('.black');
switchBlackBtn.addEventListener('click', () => changeColor("0, 0, 0"));

const shadeBtn = document.querySelector('.shade');
shadeBtn.addEventListener('click', () => toggleShading());

//Driver code for testing
createGraph(50);