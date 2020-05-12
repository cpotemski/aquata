import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponse, User } from '@aquata/api-interfaces';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Component({
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent {
  email = 'c.potemski@gmail.com';
  password = 'password';

  constructor(private http: HttpClient, private router: Router) {}

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
      .subscribe(({ access_token }) => {
        localStorage.setItem('token', access_token);
        this.router.navigate(['/dashboard']);
      });
  }
}
