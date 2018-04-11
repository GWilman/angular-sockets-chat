import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  login(userData) {
    return this.http.post('http://localhost:4000/api/login', userData);
  }

  register(userData) {
    return this.http.post('http://localhost:4000/api/register', userData);
  }

  setSession(token) {
    return localStorage.setItem('token', token);
  }

  logout() {
    return localStorage.removeItem('token');
  }

  public isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  public getPayload() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    return JSON.parse(atob(token.split('.')[1]));
  }

}
