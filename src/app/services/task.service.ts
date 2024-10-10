import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { ROUTES } from '../shared/constants/routes';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpService) { }

  createTask(taskData: any): Observable<any> {
    return this.http.postMethod(ROUTES.CREATE_TASK, taskData);
  }

  getDashBoardDetails(): Observable<any> {
    return this.http.getMethod(ROUTES.DASHBOARD);
  }
  getAllTasks(queryParams?: any): Observable<any> {
    console.log(queryParams);

    return this.http.getMethod(ROUTES.CREATE_TASK, queryParams);
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.deleteMethod(ROUTES.CREATE_TASK, taskId)
  }
}
