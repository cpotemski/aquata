import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, LoginResponse } from '@aquata/api-interfaces';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'aquata-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  email = 'c.potemski@gmail.com';
  password = 'password';

  constructor(private http: HttpClient) {}

  login() {
    this.http
      .post<LoginResponse>(
        '/api/auth/login',
        {
          email: this.email,
          password: this.password
        },
        httpOptions
      )
      .subscribe(({ access_token }) =>
        localStorage.setItem('token', access_token)
      );
  }

  getUsers() {
    this.http
      .get<User[]>('/api/user', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .subscribe((users: User[]) => {
        console.log('users', users);
      });
  }
}
