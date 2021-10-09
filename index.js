let globalTaskData = [];
taskContents = document.getElementById("taskContents");

const addCard = () => {
  const newTaskDetails = {
    id: `${Date.now()}`,
    url: document.getElementById("imageURL").value,
    title: document.getElementById("taskTitle").value,
    task: document.getElementById("taskType").value,
    description: document.getElementById("taskDescription").value
  };

 
  taskContents.insertAdjacentHTML('beforeend',generateTaskCard(newTaskDetails));

  globalTaskData.push(newTaskDetails);
  saveToLocalStorage();
}

const generateTaskCard = ({ id, url, title, task, description }) => {
return(`<div class="col-md-6 col-lg-4 mt-3 pt-5 pb-10"  id=${id} key=${id} >
<div class="card" style="background-color : whitesmoke">
        <div class="card-header d-flex justify-content-end" style="background-color: rgb(53, 57, 53)">
                            
            <button type="button" class="btn" style="color: white" name=${id} onclick="editTask(this)">
                <i class="far fa-edit" name=${id} onclick="editTask(this)"></i>
            </button>

            <button type="button" class="btn" style="color: white" name=${id} onclick="deleteTask(this)">
                <i class="far fa-trash-alt" name=${id} onclick="deleteTask(this)"></i>
            </button>
        </div>
    <img src=${url} class="card-img-top" alt="image" />
    <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${description}</p>
        <span class="badge bg-dark">${task}</span>
    </div>
    <div class="card-footer">
        <button class="btn btn-outline-dark float-end">OPEN TASK</button>
    </div>
</div>
</div>`)
}


const saveToLocalStorage = () => {
    localStorage.setItem("foody", JSON.stringify({tasks: globalTaskData}));
}

const reloadTaskCard = () => {
    const localStorageCopy = JSON.parse(localStorage.getItem("foody"));
    if(localStorageCopy) {
        globalTaskData = localStorageCopy["tasks"];
    }
    globalTaskData.map((cardData) => {
        taskContents.insertAdjacentHTML('beforeend', generateTaskCard(cardData));
    })
}

const deleteTask = (e) => {
    const targetID = e.getAttribute("name");
    globalTaskData = globalTaskData.filter((cardData) => cardData.id!==targetID);
    saveToLocalStorage();
    window.location.reload();
}

const editTask = (e) => {
    const targetID = e.getAttribute("name");
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable", "true");
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable", "true");
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable", "true");
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML = "Save Changes";
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("onclick", "saveEdits(this)");
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("name", targetID);
};

const saveEdits = (e) => {
    const targetID = e.getAttribute("name");
    const updatedTaskData = {
        id: targetID,
        // url: document.getElementsByTagName("img")[4].getAttribute("src"),
        url: e.parentNode.parentNode.childNodes[3].getAttribute("src"),
        title: e.parentNode.parentNode.childNodes[5].childNodes[1].innerHTML,
        task: e.parentNode.parentNode.childNodes[5].childNodes[5].innerHTML,
        description: e.parentNode.parentNode.childNodes[5].childNodes[3].innerHTML,
    };
    globalTaskData = globalTaskData.map((cardData) => (cardData.id === targetID) ? updatedTaskData : cardData);
    saveToLocalStorage();
    window.location.reload();

    e.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable", "false");
    e.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable", "false");
    e.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable", "false");
    e.innerHTML = "Open Task";
};