import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebSocketService } from './services/web-socket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgForOf } from '@angular/common';
import { ChessBoardComponent } from './chess-board/chess-board.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, ChessBoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  from = '';
  to = '';
  moves: { from: string; to: string }[] = [];

  private webSocketService: WebSocketService = inject(WebSocketService);

  ngOnInit() {
    this.webSocketService.onMove().subscribe(move => {
      this.moves.push(move);
    });
  }

  handleMove(move: { from: string; to: string }) {
    this.webSocketService.sendMove(move);
  }
}
