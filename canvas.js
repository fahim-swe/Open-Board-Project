

let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;




let pencilColorCont = document.querySelectorAll(".pencil-color");
let pencilWidthElem = document.querySelector(".pencil-width");
let eraserWidth = document.querySelector(".eraser-width");
let redoIcon = document.querySelector(".redo-icon");
let undoIcon = document.querySelector(".undo-icon");




let tool = canvas.getContext('2d');
let mouseDown = false;
let pencilColor = "black";
let pencilColorWidth = "3";
let eraserColorWidth = "3";

let undoRedoTracker = []; // Data
let track = 0; // represent which action from tracker array 


// // Basic canvas
// // tool.strokeStyle = "red";  // Color
// // tool.lineWidth = "3"; // width
// // tool.beginPath(); // new graphic (path) (line)
// // tool.moveTo(0, 0); // start point
// // tool.lineTo(50, 50); // end point
// // tool.stroke(); // fill color (fill graphic) 

// // tool.lineTo(60, 100);
// // tool.stroke();

// // tool.strokeStyle = "blue";
// // tool.lineWidth = "4";
// // tool.beginPath();
// // tool.moveTo(0,0);
// // tool.lineTo(30, 90);
// // tool.stroke();


// // mousedown  --> start new path, mousemove ---> path fill(graphic)



tool.lineWidth  = "3";


canvas.addEventListener("mousedown", (e)=>{
    mouseDown = true;
    beginPath({
        x: e.clientX, 
        y: e.clientY
    });
})


canvas.addEventListener("mousemove", (e)=>{
    if(mouseDown){
       drawStroke({
        x: e.clientX, 
        y: e.clientY,
        
       })
    }
   
})

canvas.addEventListener("mouseup", (e)=>{
    mouseDown = false;

    let url = canvas.toDataURL();
    undoRedoTracker.push(url);
    track = undoRedoTracker.length-1;
})






pencilColorCont.forEach(element => {
    element.addEventListener("click", (e)=> {
        // console.log(element.classList[0]);
        pencilColor = element.classList[0];
        // console.log(pencilColor);
        tool.strokeStyle = pencilColor;
    })
})

pencilWidthElem.addEventListener("change", (e)=>{
    tool.lineWidth  = pencilWidthElem.value;
    pencilColorWidth = pencilWidthElem.value;
})


eraserWidth.addEventListener("change", (e)=>{
    tool.lineWidth  = eraserWidth.value;
    eraserColorWidth = eraserWidth.value;
})

eraserIcon.addEventListener("click", (e)=> {
    if(eraserFlag){
        tool.strokeStyle = "#FFFFFF";
        tool.lineWidth = eraserColorWidth;
    }
    else{
        tool.strokeStyle = pencilColor;
        tool.lineWidth = pencilColorWidth;
    }
})


// Download 
downloadIcon.addEventListener("click", (e)=> {
    var anchor = document.createElement("a");
    anchor.href = canvas.toDataURL("image/png");
    anchor.download = "IMAGE.PNG";
    anchor.click();
})


// Redo
undoIcon.addEventListener("click", (e)=> {
    
})


redoIcon.addEventListener("click", (e)=>{

})


function beginPath(strokeObj)
{
    tool.beginPath();
    tool.moveTo(strokeObj.x, strokeObj.y);
}

function drawStroke(strokeObj)
{
    tool.lineTo(strokeObj.x, strokeObj.y);
    tool.stroke();
}