import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!: Socket;
  private serverUrl = environment.serverUrl;

  constructor(private http: HttpClient) {
    this.socket = io(this.serverUrl); // io parameter to be client or server url?
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

  on(event: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(event, (data) => {
        observer.next(data);
      });

      // cleanup
      return () => {
        this.socket.off();
      }
    });
  }

  insert(message: string): Observable<any> {
    return this.http.post(`${this.serverUrl}/chat`, { msg: message }).pipe(
      catchError((error) => throwError(() => error))
    );
  }
}
