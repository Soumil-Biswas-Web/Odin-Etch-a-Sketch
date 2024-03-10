const graphSize = prompt("Enter graph size N to make a NxN grid. N must be less than 100.");
if (graphSize > 100){
    alert("Grpah size too big! N must be less than 100.");
}
else{
    createGraph(graphSize);
}