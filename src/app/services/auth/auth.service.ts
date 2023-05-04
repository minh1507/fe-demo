import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { login, register } from 'src/app/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthAPIService {
  domain: string = 'http://localhost:5000/api/auth/';

  constructor(private http: HttpClient) {}

  public login(username: string, password: string) {
    return this.http.post<login>(this.domain + 'login', {
      username: username,
      password: password,
    });
  }

  public signup(username: string, password: string, type: number) {
    return this.http.post<register>(this.domain + 'register', {
      username: username,
      password: password,
      type: type,
    });
  }
}
