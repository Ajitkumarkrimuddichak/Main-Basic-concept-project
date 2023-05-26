let taskForm=document.querySelector('#task-form');
let taskInput=document.querySelector('#ip-task');
let taskListForm=document.querySelector('#task-list-form');

taskForm.addEventListener('submit',function(event)
{
	event.preventDefault();
	let task=taskInput.value.trim();
	//console.log(task);
	//localStorage.setItem('tasks',task);

	let taskList=localStorage.getItem('tasks')?JSON.parse(localStorage.getItem('tasks')):[];

	taskList.unshift(task);

	localStorage.setItem('tasks',JSON.stringify(taskList));

	//console.log(taskList);

	displayTask();

	window.reload();
	
})

//Display Tasks

function displayTask()
{
	let taskList=localStorage.getItem('tasks')?JSON.parse(localStorage.getItem('tasks')):[];

	let eachTask=``;
	for(let task of taskList)
	{
		eachTask=eachTask+`<li class="list-group-item list-group-item-action list-group-item-primary">
							<span>${task}</span>
								<button class="close">
									<i class="fa fa-times-circle"></i>
								</button>
							</li>`
	}
	//console.log(eachTask);
	taskListForm.innerHTML=eachTask;
}
displayTask();


//Delete Functionality

taskListForm.addEventListener('click',function(event)
{
	let targetElement=event.target;
	//console.log(targetElement);
	if(targetElement.classList.contains('fa-times-circle'))
	{
		//console.log("TRUE")
		let selectedElement=targetElement.parentElement.parentElement;

		let selectedText=selectedElement.innerText;

		//console.log(selectedText);

		let taskList=localStorage.getItem('tasks')?JSON.parse(localStorage.getItem('tasks')):[];

		taskList=taskList.filter(function(task)
		{
			return selectedText!==task;
		})

		//console.log(taskList);
		localStorage.setItem('tasks',JSON.stringify(taskList));
		displayTask();
	}
	else
	{
		console.log("FALSE");
	}
})