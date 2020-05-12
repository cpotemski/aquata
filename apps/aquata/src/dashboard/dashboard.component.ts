import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Station, User } from '@aquata/api-interfaces';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

const headers = {
  'Content-Type': 'application/json'
};

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public stations$: Observable<Station[]>;

  constructor(private http: HttpClient) {
    this.stations$ = this.http
      .get<Station[]>('/api/station', {
        headers: {
          ...headers,
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }).pipe(
        catchError((err: HttpErrorResponse) => {
          if(err.status === 401) {
            localStorage.removeItem('token');
          }
          console.log('getStations', err);
          throw Error('not logged in!');

        })
      )
  }
}
