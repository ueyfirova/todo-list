/* eslint-disable */
import '../styles/index.scss';

const inputBox = document.querySelector('.todo-field input');
const addBtn = document.querySelector('.todo-field button');
const todoItems = document.querySelector('.todo-items');
const deleteAllBtn = document.querySelector('.todo-footer button');
let listArr;

inputBox.onkeyup = () => {
	let userData = inputBox.value; //getting user entered value
	if(userData.trim() != 0) { //if user values aren't only spaces
		addBtn.classList.add('active'); //active add btn
	}else {
		addBtn.classList.remove('active'); //unactive add btn
	}
};
showTasks();

// if user clicks on add btn

addBtn.onclick = () => {
	let userData = inputBox.value;
	let getLocalStorage = localStorage.getItem("New Todo");
	if(getLocalStorage === null) {
		listArr = [];
	}else{
		listArr = JSON.parse(getLocalStorage);
	}
	listArr.push(userData);
	localStorage.setItem("New Todo", JSON.stringify(listArr));
	showTasks();
	addBtn.classList.remove("active");
};

//put item on the list
function showTasks() {
	todoItems.querySelectorAll('li').forEach(n => n.remove());
	let getLocalStorage = localStorage.getItem("New Todo");
	if(getLocalStorage == null) {
		listArr = [];
	}else{
		listArr = JSON.parse(getLocalStorage);
	}
	
	listArr.forEach((element, index) => {
		const listItem = document.createElement('li');
		listItem.id = `element-${index}`;
		listItem.innerHTML = `${element}`;

		const deleteBtn = document.createElement('span');
		deleteBtn.innerHTML = `<i class="fas fa-times"></i>`;
		deleteBtn.addEventListener('click', () => deleteTask(index));

		listItem.appendChild(deleteBtn);
		todoItems.appendChild(listItem);
	});
	inputBox.value = '';
	const pendingNumb = document.querySelector('.pendingNumb');
	pendingNumb.textContent = listArr.length;
	if(listArr.length > 0){ //if array length is greater than 0
		deleteAllBtn.classList.add("active"); //active the delete button
	  }else{
		deleteAllBtn.classList.remove("active"); //unactive the delete button
	  }

}

// delete item from the list
function deleteTask(index){
	let getLocalStorage = localStorage.getItem("New Todo");
	listArr = JSON.parse(getLocalStorage);
	listArr.splice(index, 1); //delete or remove the li
	localStorage.setItem("New Todo", JSON.stringify(listArr));
	showTasks(); //call the showTasks function
  }

  deleteAllBtn.addEventListener('click', () => {
	listArr = [];
	localStorage.setItem("New Todo", JSON.stringify(listArr));
	showTasks();
  });


