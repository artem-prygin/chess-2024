import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chess-board',
  standalone: true,
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.scss'],
  imports: [CommonModule],
})
export class ChessBoardComponent {
  @Output() move = new EventEmitter<{ from: string; to: string }>();
  board: string[][];
  selectedFrom: string | null = null;
  selectedTo: string | null = null;

  constructor() {
    this.board = this.initializeBoard();
  }

  initializeBoard(): string[][] {
    const board: string[][] = [];
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    for (let i = 8; i >= 1; i--) {
      const row = letters.map(letter => `${letter}${i}`);
      board.push(row);
    }
    return board;
  }

  selectCell(cell: string) {
    if (!this.selectedFrom) {
      this.selectedFrom = cell;
    } else if (!this.selectedTo) {
      this.selectedTo = cell;
      this.sendMove();
    }
  }

  sendMove() {
    if (this.selectedFrom && this.selectedTo) {
      this.move.emit({ from: this.selectedFrom, to: this.selectedTo });
      this.selectedFrom = null;
      this.selectedTo = null;
    }
  }
}
