function createBox(){
    const box = document.createElement('div');
    box.setAttribute('class', 'box');
    
    return box;
}

function createRow(n){
    const row = document.createElement('div');
    row.setAttribute('class', 'row');
    for(let i=0; i<n; i++){
        const box = createBox();
        row.appendChild(box);
    }
    return row;
}

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

//Initial Prompt
function init{
    const graphSize = prompt("Enter graph size N to make a NxN grid. N must be less than 100.");
    if (graphSize > 100){
        alert("Grpah size too big! N must be less than 100.");
        init();
    }
    else{
        createGraph(graphSize);
    }
}

// Driver Code
init();