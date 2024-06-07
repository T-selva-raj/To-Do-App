import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const user = localStorage.getItem('uuid');
    if (user) {
      this.router.navigate(['app/dashboard']);
      return false;
    }
    return true;
  }
}
