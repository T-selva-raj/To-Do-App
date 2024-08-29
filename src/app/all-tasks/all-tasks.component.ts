import { Component } from '@angular/core';
interface colors {
  progress: string,
  done: string,
  open: string,
  medium: string,
  low: string,
  high: string
}
interface Task {
  name: string;
  due: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'inProgress' | 'done';
}


@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent {

  allTasks: Task[] = [
    { name: "sample1wqwertds", due: "1-1-1111", priority: "high", status: "done" },
    { name: "sample2", due: "1-1-1111", priority: "medium", status: "open" },
    { name: "sample3", due: "1-1-1111", priority: "high", status: "done" },
    { name: "sample4", due: "1-1-1111", priority: "low", status: "done" },
    { name: "sample5", due: "1-1-1111", priority: "high", status: "done" },
    { name: "sample6", due: "1-1-1111", priority: "high", status: "done" },
    { name: "sample7", due: "1-1-1111", priority: "low", status: "done" },
    { name: "sample8", due: "1-1-1111", priority: "high", status: "done" },
    { name: "sample9", due: "1-1-1111", priority: "high", status: "done" },
    { name: "sample10", due: "1-1-1111", priority: "high", status: "done" },
    { name: "sample11", due: "1-1-1111", priority: "high", status: "open" },
    { name: "sample1", due: "1-1-1111", priority: "high", status: "open" },
    { name: "sample2", due: "1-1-1111", priority: "medium", status: "open" },
    { name: "sample3", due: "1-1-1111", priority: "high", status: "open" },
    { name: "sample4", due: "1-1-1111", priority: "low", status: "open" },
    { name: "sample5", due: "1-1-1111", priority: "high", status: "open" },
    { name: "sample6", due: "1-1-1111", priority: "high", status: "open" },
    { name: "sample7", due: "1-1-1111", priority: "low", status: "open" },
    { name: "sample8", due: "1-1-1111", priority: "high", status: "open" },
    { name: "sample9", due: "1-1-1111", priority: "high", status: "open" },
    { name: "sample10", due: "1-1-1111", priority: "high", status: "open" },
    { name: "sample11", due: "1-1-1111", priority: "high", status: "open" }
  ];

  textColor: colors = {
    progress: '#7FDBDA',
    done: "#81B214",
    open: "#EB5353",
    medium: "#7FDBDA",
    low: '#81B214',
    high: "#EB5353",
  };

  getColor(value: string | number | any) {
    return this.textColor[value as keyof colors] || 'white';

  }



  onStatusChange(task: any, event: { target: { value: any; }; }) {
    task.status = event.target.value;
  }

}
