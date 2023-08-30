import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Observable, of, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  clearToken() {
    localStorage.removeItem('token');
  }

  login(userInfo: { email: string, password: string }): Observable<string | boolean> {
    const savedUserData = localStorage.getItem('user');

    if (savedUserData) {
      const savedUser = JSON.parse(savedUserData);

      if (savedUser.email === userInfo.email && savedUser.password === userInfo.password) {
        this.setToken('asadaasdscwwwede');
        return of(true);
      } else {
        return throwError(() => new Error('Invalid email or password'));
      }
    } else {
      return throwError(() => new Error('User not found'));
    }
  }

  autoLogin() {
    const savedUserData = localStorage.getItem('user');

    if (savedUserData) {
      return JSON.parse(savedUserData);
    } else {
      return null;
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }
}
