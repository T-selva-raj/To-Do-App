import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoader = new BehaviorSubject<boolean>(false);
  public loaderState = this.isLoader.asObservable();

  constructor() { }


  showLoader() {
    this.isLoader.next(true);
  }

  hideLoader() {
    this.isLoader.next(false);
  }
}
