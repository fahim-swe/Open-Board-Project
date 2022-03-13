
let toolsCont = document.querySelector(".tools-cont");
let optionsCont = document.querySelector('.options-cont');

let pencilIcon = document.querySelector('.pencil-icon');
let eraserIcon = document.querySelector('.eraser-icon');
let stickyIcon = document.querySelector('.sticky-icon');
let uploadIcon = document.querySelector('.upload-icon');
let downloadIcon = document.querySelector('.download-icon');


let pentoolsCont = document.querySelector('.pencil-tool');
let erasertoolsCont = document.querySelector('.eraser-tool-cont');



let optionFlag = true;
let pencilFlag = true;
let eraserFlag = false;

optionsCont.addEventListener("click", (e) => {

    optionFlag = !optionFlag;
    if(optionFlag) openTools();
    else closeTools();
})

function openTools()
{
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove("fa-times");
    iconElem.classList.add("fa-bars");
    
    toolsCont.style.display = "flex";
}

function closeTools()
{
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove("fa-bars");
    iconElem.classList.add("fa-times");

    toolsCont.style.display = "none";
    pentoolsCont.style.display = "none";
    erasertoolsCont.style.display = "none";
}

pencilIcon.addEventListener("click", (e) => {
    
    pencilFlag = !pencilFlag;
    if(pencilFlag){
        pentoolsCont.style.display = "block";
    }
    else{
        pentoolsCont.style.display = "none";
    }
})

eraserIcon.addEventListener("click", (e) => {
    
    eraserFlag = !eraserFlag;
    if(eraserFlag){
        erasertoolsCont.style.display = "flex";
    }
    else{
        erasertoolsCont.style.display = "none";
    }
})



// Sticky Icon 
stickyIcon.addEventListener("click", (e) => {

    let sticktyTemplateHTML = `
        <div class="header-cont">
        <div class="minimize"></div>
        <div class="remove"></div>
        </div>
        <div class="note-cont">
            <textarea></textarea>
        </div>
    `
    createSticky(sticktyTemplateHTML);
})


function dragAndDrop(element, event)
{
    // (1) prepare to moving: make absolute and on top by z-index
    element.style.position = 'absolute';
    element.style.zIndex = 1000;

    // move it out of any current parents directly into body
    // to make it positioned relative to the body
    

    // centers the ball at (pageX, pageY) coordinates
    function moveAt(pageX, pageY) {
        element.style.left = pageX - element.offsetWidth / 2 + 'px';
        element.style.top = pageY - element.offsetHeight / 2 + 'px';
    }

    // move our absolutely positioned ball under the pointer
    // moveAt(event.pageX, event.pageY);

    function onMouseMove(event) {
         moveAt(event.pageX, event.pageY);
    }

    // (2) move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // (3) drop the ball, remove unneeded handlers
    element.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };
}


function noteActions(minimize, remove, sticktyCont)
{
    remove.addEventListener("click", (e)=>{
        sticktyCont.remove();
    })

    minimize.addEventListener("click", (e)=> {
        let noteCont = sticktyCont.querySelector('.note-cont');

        let dis = getComputedStyle(noteCont).getPropertyValue("display");
        
        if(dis == "none"){
            noteCont.style.display = "block";
        }
        else{
            noteCont.style.display = "none";
        }
    })
}

// Upload image on sticky icon
uploadIcon.addEventListener("click", (e)=>{

    // image 
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", (e)=>{
        let file = input.files[0];
        let url = URL.createObjectURL(file);

        let sticktyTemplateHTML = `
            <div class="header-cont">
            <div class="minimize"></div>
            <div class="remove"></div>
            </div>
            <div class="note-cont">
                <img src = "${url}"/>
            </div>
        `

        createSticky(sticktyTemplateHTML);
        
    })
})

function createSticky(sticktyTemplateHTML)
{
    let sticktyCont = document.createElement('div');
    sticktyCont.setAttribute("class", "sticky-cont");

    sticktyCont.innerHTML = sticktyTemplateHTML;

    document.body.append(sticktyCont);

    let minimize = sticktyCont.querySelector('.minimize');
    let remove = sticktyCont.querySelector('.remove');

    noteActions(minimize, remove, sticktyCont);

    sticktyCont.onmousedown = function(event) {
        dragAndDrop(sticktyCont, event);
    };

    sticktyCont.ondragstart = function() {
        return false;
    }
}