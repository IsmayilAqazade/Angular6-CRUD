import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated(): boolean {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true' ? true : false;
    return isAuthenticated ;
  }

  constructor(private http: HttpClient, private router: Router) {
  }
  login(username: string, password: string) {
    return this.http.post<any>('https://reqres.in/api/login', {email: username, password: password});
  }
  logout() {
    localStorage.setItem('isAuthenticated', 'false');
    this.router.navigate(['login'];
  }
}

