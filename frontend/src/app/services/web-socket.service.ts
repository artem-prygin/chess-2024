import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket!: Socket;
  private moveSubject = new Subject<{ from: string; to: string }>();

  constructor() {
    this.connect();
  }

  connect() {
    this.socket = io('http://localhost:3000'); // Подключение к NestJS серверу
  }

  onMove(): Observable<{ from: string; to: string }> {
    return this.moveSubject.asObservable();
  }

  sendMove(move: { from: string, to: string }) {
    this.moveSubject.next(move);
  }
}
