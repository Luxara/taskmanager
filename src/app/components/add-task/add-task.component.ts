import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NgForm} from '@angular/forms'
import { Task } from 'src/app/Task';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Input() color!:string;
  @Input() bcolor!:string;
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  text!:string;
  date!:string;
  urgency!:string;
  important!:boolean;
  urgent!:boolean;
  reminder!:boolean;
  showAddTask!:boolean;
  subscription!:Subscription;

  constructor(private uiService:UiService) {
    this.subscription=this.uiService.onToggle().subscribe(
      value=>this.showAddTask=value)
   }

  ngOnInit(): void {
  }

  onFormSubmit(form:NgForm){
    if(!this.text){
      alert('Please add a task!')
      return
    }else if(!this.date){
      alert('Please add a date!')
      return
    }

    this.reminder=false;
    this.text=form.controls['text'].value;
    this.urgency=form.controls['date'].value;
    this.urgency=form.controls['urgency'].value;
    
    if(this.urgency=='normal'){
      this.important=false;
      this.urgent=false;
    }else if(this.urgency=='important'){
      this.important=true;
      this.urgent=false;
    }else if(this.urgency=='urgent'){
      this.important=false;
      this.urgent=true;
    }else{
      this.important=false;
      this.urgent=false;
    }

    const newTask={
      text:this.text,
      date:this.date,
      reminder:this.reminder,
      important:this.important,
      urgent:this.urgent,
    }

    this.onAddTask.emit(newTask);

    this.text=""
    this.date=""
  }
    
  

}
