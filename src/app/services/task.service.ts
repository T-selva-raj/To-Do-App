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
    console.log(taskData);

    return this.http.postMethod(ROUTES.CREATE_TASK, taskData);
  }
}
