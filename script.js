//
//  JS File
//  YOU CAN REMOVE ALL OF THIS CODE AND START FRESH
//

//
// Variables
//
const SELECTED_DAY_CLASS = "day";
const LOCAL_STORAGE_KEY = "thedata";

// ... (existing code)

function Day(event) {
  if (!event.target.classList.contains(SELECTED_DAY_CLASS)) {
    return;
  } else {
    // ... (existing code)
  }
}

weekdayContainer.addEventListener("click", Day);

function saveTasks() {
  try {
    const stored = JSON.stringify(weekdaysTask);
    localStorage.setItem(LOCAL_STORAGE_KEY, stored);
  } catch (error) {
    console.error("Error saving tasks:", error);
  }
}

function GETTHEDATA() {
  try {
    const taskStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (taskStorage !== null) {
      weekdaysTask = JSON.parse(taskStorage);
    } else {
      weekdaysTask = {
        monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [], sunday: [],
      };
    }
  } catch (error) {
    console.error("Error retrieving tasks:", error);
  }
}
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

var targetDayFirstChild;
function Day(event)//this function get the selected day name
{
  if (event.target.className.indexOf("day") === -1)//the if statement uses mutliple event properties, while this line of code can be expanded, for the sake of keeping it short, we do it in one line
  {
    return;
  }
  else 
  {
    var targetDay = event.target;//when the event occurs the value will be stored in targetDay
    var targetDayId = targetDay.getAttribute("id");//by using getAttribute we can get the value of targetDay's "id" and store it in targetDayId
    targetDayFirstChild = targetDay.firstChild.textContent;//the content of the first child of targetDay is returned and stored in targetDayFirstChild
    selectedDayValue = targetDayId;// the value of targetDayId is stored in selectedDayValue, that would be the weekday's name
    weekday = targetDayId;// the value of targetDayId is stored in weekday, that would be the weekday's name
    selectedDayName.textContent = targetDayFirstChild;//the name of the day is taken and stored in selectedDayName
    updateTable();//the updateTable function is called, we call this function multiple times in the program to keep updating the information
  }
}
weekdayContainer.addEventListener("click", Day);//Day function will be called when "click" event occurs

//more variables are declared
var newIndex = 0;
var selectedTimeValue = "";
function newTaskIndex()//this fucntion finds the index of where the new data should be 
{
  newIndex = 0;//variable declared
  var temp3= parseInt(selectedTimeValue.slice(0, 2));
  for (var i = 0; i < weekdaysTask[selectedDayValue].length; i++)//for loop begins
  {
    var temp4 = parseInt(weekdaysTask[selectedDayValue][i].time);//the interger array location is stored in a temp variable

    if ( temp3 > temp4 ) //if this condition is true then we know that newIndex should be incremented
    {
      newIndex++;
    } 
    else// the value is returned when we find the correct index
    {
      return;
    }
  }
}

var inputBoxValue = "";//variable declared
function task()//function addes new tasks to the table
{
  newTaskIndex();// function newTaskIndex is called so we know when to add the new data in the table
  weekdaysTask[selectedDayValue].splice(newIndex, 0, 
    {
      addedTime: selectedTimeValue,
      addedTask: inputBoxValue,
    }
    );// new task is added using splice
    saveTasks();//function saveTasks to store the new functions so that we dont lose them when the page is refreshed
}

function addBtnClicked ()//this function is called when the add button is clicked
{
  containerModal.classList.remove("hidden");//the modal is shown
  modalHeading.textContent = "Add Task";//the prompt "Add Task" is displayed on the popup
  submitButton.addEventListener("click", enteredTask);//enteredTask function will be called when "click" event occurs
}
addBtn.addEventListener("click", addBtnClicked);//addBtnClicked function will be called when "click" event occurs

function enteredTask()//this function does things *thumbs up*
{
  selectedDay = document.getElementById("selectedDay");//the value of selectedDay is stored
  selectedTime = document.getElementById("selectedTime");//the value of selectedTime is stored
  inputBox = document.getElementById("enteredTask");//the value of enteredTask is stored
  selectedDayValue = selectedDay.options[selectedDay.selectedIndex].value;//the value at the index of the selected day is stored
  selectedTimeValue = selectedTime.options[selectedTime.selectedIndex].textContent;//the text content at the index of the selected time is stored
  inputBoxValue = inputBox.value;//the task is stored
  currentWeekday = selectedDay.options[selectedDay.selectedIndex].textContent;
  selectedDayName.textContent = currentWeekday;
  task();//the task function is called
  updateTable();//the updateTable function is called
  containerModal.classList.add("hidden");//the madal is hidden till the delete task button or add buttons are clicked
  selectedDay.selectedIndex = 0;//the value is set to a defalut
  selectedTime.selectedIndex = 0;//the value is set to a defalut
  inputBox.value = "";//the value is set to a defalut
}
submitButton.addEventListener("click", enteredTask);//enteredTask function will be called when "click" event occurs

function buttonClicked()//this function is called when the delete task button is clicked
{
  deleteModal.classList.remove("hidden");//the modal that was previously hidden is now visible
}

var taskIndex = "";//variable created
function deleteTask() //this function deletes selected task
{
  weekdaysTask[selectedDayValue].splice(taskIndex, 1);//the task at the given index is deleted
  deleteModal.classList.add("hidden");//the modal is once again hidden
  saveTasks();//the saveTasks function is called
  updateTable();//the updateTable function is called
}
deleteYes.addEventListener("click", deleteTask);//deleteTask function will be called when "click" event occurs

function doNotDeleteTask()//this fuctnion is called when the user decides against deleting the task after initially wanting too
{
  deleteModal.classList.add("hidden");//the modal is hidden once again and no other changes are made
}
deleteNo.addEventListener("click", doNotDeleteTask);//doNotDeleteTask function will be called when "click" event occurs

function saveTasks()//this function save the enterted information so that we dont lose it when the page is refreshed
{
  var temp5 = weekdaysTask;
  var stored = JSON.stringify(temp5);
  localStorage.setItem("thedata", stored);//the entered data is stored locally
}

function GETTHEDATA() 
{
  var taskStorage = localStorage.getItem("thedata");//all avalible data is stored in taskStorage
  if (taskStorage !== null) 
  {
    var temp5 = JSON.parse(taskStorage);//temp5 is once again used for sacrifice
    weekdaysTask = temp5;
  }
  else if (taskStorage === null) //if there no data, elements get a makeover aka the go back to initial values
  {
    weekdaysTask = 
    {
      monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [], sunday: [],
    };
  }
}

function defaultPage() // this function loads the default page when the page is refreshed
{
  GETTHEDATA();//the GETTHEDATA function is called
  updateTable();//the updateTable function is called
}
defaultPage();//default page loaded
