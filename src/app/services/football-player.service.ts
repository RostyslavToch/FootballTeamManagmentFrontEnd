import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Team } from '../team';
import { apiUrl } from '../globals';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { FootballPlayer } from '../footballPlayer';

@Injectable({
  providedIn: 'root'
})
export class FootballPlayerService {
  constructor(private http: HttpClient, private notifier: NotifierService) { }

  getFootballPlayers(): Observable<FootballPlayer[]> {
    return this.http.get<FootballPlayer[]>(`${apiUrl}/footballplayers`)
      .pipe(
        tap(_ => console.log('fetched football players')),
        catchError(this.handleError())
      );
  }

  getFootballPlayer(id: number): Observable<FootballPlayer> {
    const url = `${apiUrl}/footballPlayers/${id}`;
    return this.http.get<FootballPlayer>(url)
      .pipe(
        tap(_ => console.log(`fetched football player id=${id}`)),
        catchError(this.handleError())
      );
  }

  addFootballPlayer(footballPlayer: FootballPlayer): Observable<FootballPlayer> {
    return this.http.post<FootballPlayer>(`${apiUrl}/footballplayers`, footballPlayer)
      .pipe(
        tap((p: FootballPlayer) => {
          console.log(`added football player id=${p.id}`);
          this.notifier.notify('success', 'Added football player successfully');
        }),
        catchError(this.handleError())
      );
  }

  updateFootballPlayer(footballPlayer: FootballPlayer): Observable<FootballPlayer | object> {
    const url = `${apiUrl}/footballplayers/${footballPlayer.id}`;
    return this.http.put(url, footballPlayer)
      .pipe(
        tap(_ => {
          console.log(`updated football player id=${footballPlayer.id}`);
          this.notifier.notify('success', 'Updated football player successfully');
        }),
        catchError(this.handleError())
      );
  }

  deleteFootballPlayer(id: number): Observable<FootballPlayer> {
    const url = `${apiUrl}/FootballPlayers/${id}`;
    return this.http.delete<FootballPlayer>(url)
      .pipe(
        tap(_ => {
          console.log(`deleted football player id=${id}`);
          this.notifier.notify('success', 'Deleted football player successfully');
        }),
        catchError(this.handleError())
      );
  }

  private handleError() {
    return (error: any): Observable<any> => {
      console.log(error);
      this.notifier.notify('error', error.statusText);
      return throwError(error);
    };
  }
}
