import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { login, register } from 'src/app/models/auth.model';
import { user } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserAPIService {
  domain: string = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) {}

  public getAll(low: number, high: number) {
    return this.http.get<user[]>(this.domain + `user?low=${low}&high=${high}`);
  }

  public getOne(id: any) {
    return this.http.get<any>(this.domain + 'user/' + id);
  }

  public search(username: string, roleId: number, low: any, high: any) {
    return this.http.get<any>(
      this.domain +
        `user/search?username=${username}&roleId=${roleId}&low=${low}&high=${high}`
    );
  }

  public getInfo() {
    return this.http.get<any>(this.domain + 'user/info/pagi');
  }

  public deleteOne(id: any) {
    return this.http.delete<any>(this.domain + 'user/' + id);
  }

  public create(username: string, password: string, type: number, date: string) {
    return this.http.post<register>(this.domain + 'user', {
      username: username,
      password: password,
      type: type,
      date: date
    });
  }

  public update(id: number, username: string, roleId: number, date: string) {
    return this.http.patch<register>(this.domain + 'user', {
      id: id,
      username: username,
      roleId: roleId,
      date: date
    });
  }
}
