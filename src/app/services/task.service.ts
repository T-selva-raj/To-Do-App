import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { debounceTime, Observable, Subject, switchMap } from 'rxjs';
import { ROUTES } from '../shared/constants/routes';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public searchSubject = new Subject<string>();
  results: any[] = [];

  constructor(private http: HttpService) {
    this.searchSubject
      .pipe(
        debounceTime(300),
        switchMap((searchTerm) => this.getAllTasks(searchTerm))
      )
      .subscribe((response: any[]) => {
        this.results = response;
      });
  }

  createTask(taskData: any): Observable<any> {
    return this.http.postMethod(ROUTES.CREATE_TASK, taskData);
  }

  getDashBoardDetails(): Observable<any> {
    return this.http.getMethod(ROUTES.DASHBOARD);
  }
  getAllTasks(queryParams?: any): Observable<any> {
    return this.http.getMethod(ROUTES.CREATE_TASK, queryParams);
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.deleteMethod(ROUTES.CREATE_TASK, taskId)
  }
  editTask(taskId: number, data: any): Observable<any> {
    return this.http.putMethod(ROUTES.CREATE_TASK, data, taskId)
  }
  onSearch(value: any) {
    this.searchSubject.next(value);
  }
}
