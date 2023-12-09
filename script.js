//
//  JS File
//  YOU CAN REMOVE ALL OF THIS CODE AND START FRESH
//

//
// Variables
//

//the follwoing are the variables that contain assigned values
var tBody = document.getElementById("tBody");
var containerModal = document.querySelector(".modalContainer");
var selectedDayValue = "monday";
var selectedDayName = document.getElementById("selectedDayName");
var weekday = "monday";
var currentWeekday = "Monday";
var deleteYes = document.getElementById("deleteYes");
var deleteNo = document.getElementById("deleteNo");
var weekdayContainer = document.getElementById("weekdayContainer");
var addBtn = document.getElementById("addBtn");
var modalHeading = document.getElementById("modalHeading");

var weekdaysTask = "";
function updateTable()// this fucntion updates the task table, when a task is delted or such
{
  tBody.textContent = ""; //the content stored in tBoday is ""
  for (var i = 0; i < weekdaysTask[selectedDayValue].length; i++) // for loop to store the updated data in the 
  {
    var tableRow = document.createElement("tr");//table row element created
    var taskTime = document.createElement("td");//element created to store data releted to time
    var taskTable = document.createElement("td");//element created to store data releted to tasks
    taskTable.classList.add("taskTable");//task list
    taskTime.textContent = weekdaysTask[selectedDayValue][i].addedTime;//the value of the time selected is in addedTime and the specific day can be found by weekdaysTask[selectedDayValue], the end value is stored in variable taskTime
    taskTable.textContent = weekdaysTask[selectedDayValue][i].addedTask;//the task is stored in addedTime and the specific day can be found by weekdaysTask[selectedDayValue], the end value is stored in variable taskTable
    var button1 = document.createElement("div");// new div element is created
    var tableDeleteBtn = document.createElement("button");// new div element is created
    tableDeleteBtn.innerText = "Delete Task";// the button created will show the text "delete task"
    tableDeleteBtn.classList.add("deleteBtn");//a class named deleteBtn is added
    tableDeleteBtn.addEventListener("click", buttonClicked);// when the button is clicked (the "click" event occurs, buttonClicked function is called)
    button1.append(tableDeleteBtn);
    taskTable.append(button1);
    tableRow.append(taskTime, taskTable);
    tBody.append(tableRow);
  }
}
