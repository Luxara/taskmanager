import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/Task';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => this.tasks=tasks);
  }

  deleteTask(task:Task){
    this.taskService.deleteTask(task).subscribe(() => this.tasks=this.tasks.filter((t)=>t.id !==task.id));
  }

  toggleReminder(task:Task){
    if(task.urgent == true){
      task.urgent=false;
      task.important=false;
    } else if(task.important==true){
      task.urgent=true;
      task.important=false;
    } else if(task.urgent==false && task.important==false){
      task.important=true;
    } else{
      task.urgent=false;
      task.important=false;
    }

    this.taskService.updateTaskReminder(task).subscribe()
  }

  addTask(task:Task){
    this.taskService.addTask(task).subscribe((task) => this.tasks.push(task));
  }
}
