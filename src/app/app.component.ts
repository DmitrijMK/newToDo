import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

class Tasks {
  title: string;
  completed: boolean;
  editNow: boolean;

  constructor(title: string, completed: boolean = false, editNow: boolean = false) {
    this.title = title;
    this.completed = completed;
    this.editNow = editNow;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public tasks: Tasks[] = this.parse();

  public form: FormGroup = new FormGroup({
    task: new FormControl(),
  });

  public editForm: FormGroup = new FormGroup({
    task: new FormControl(),
  });

  submit() {
    const value: Tasks = new Tasks(this.form.value.task);
    this.tasks.push(value);
    this.form.reset();

    this.toJson(this.tasks);
  }

  deleteTask(index) {
    if (index > -1) {
      this.tasks.splice(index, 1);
    }

    this.toJson(this.tasks);
  }

  checkTask(task) {
    task.completed = !task.completed;
    this.toJson(this.tasks);
  }

  editTask(task) {
    task.editNow = !task.editNow;
  }

  confirmEdit(task) {
    console.log(task);
    task.title = this.editForm.value.task;
    task.editNow = !task.editNow;
    this.toJson(this.tasks);
    this.form.reset();
  }

  toJson(arr) {
    localStorage.setItem('myTodo', JSON.stringify(arr));
  }

  parse() {
    return JSON.parse(localStorage.getItem('myTodo'));
  }
}


