import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  taskform!: FormGroup;
  priority: string[] = ["High", "Medium", "Low"];
  constructor(private fb: FormBuilder) {
    this.taskform = this.fb.group({
      taskName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      importance: ['', [Validators.required]]
    });
  }

  dateFilter = (d: Date | null): boolean => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return d !== null && d >= currentDate;
  }
}
