import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ROUTES } from '../shared/constants/routes';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private userProfile = new BehaviorSubject({ profileImage: '', userName: '' });
  userProfileValue = this.userProfile.asObservable();


  constructor(private http: HttpService) { }

  setProfileImage(val: any) {
    this.userProfile.next(val);
  }
  getProfileData() {
    return this.http.getMethod(ROUTES.PROFILE)
  }
  editProfileData(data: any, params?: any) {
    return this.http.putMethod(ROUTES.PROFILE, data);
  }
}
