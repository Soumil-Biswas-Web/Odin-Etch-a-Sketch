// Create Each box in the Row
function createBox(){
    const box = document.createElement('div');
    box.setAttribute('class', 'box');
    //box.addEventListener('hover', () => changeColor(box));
    box.addEventListener("mouseenter", function(e) {
        e.target.style.background = "black";
    })
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
const button = document.querySelector('button');
button.addEventListener('click', () => init());