import { Component, EventEmitter, inject, Output } from '@angular/core';
import { WebSocketService } from '../services/web-socket.service';
import { CommonModule } from '@angular/common';

type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
type PieceColor = 'white' | 'black';

interface ChessPiece {
  type: PieceType;
  color: PieceColor;
}

@Component({
  selector: 'app-chess-board',
  standalone: true,
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.scss'],
  imports: [CommonModule],
})
export class ChessBoardComponent {
  private webSocketService = inject(WebSocketService);

  @Output() move = new EventEmitter<{ from: string; to: string }>();

  selectedCell: string | null = null;
  board: { [key: string]: ChessPiece | null } = {};
  cells: string[] = [];
  Math = Math;

  constructor() {
    this.initializeBoard();
    this.initializeCells();

    this.webSocketService.onMove().subscribe((move) => {
      this.movePiece(move.from, move.to);
    });
  }

  initializeBoard() {
    this.board = {
      // Белые фигуры
      'a1': { type: 'rook', color: 'white' },
      'b1': { type: 'knight', color: 'white' },
      'c1': { type: 'bishop', color: 'white' },
      'd1': { type: 'queen', color: 'white' },
      'e1': { type: 'king', color: 'white' },
      'f1': { type: 'bishop', color: 'white' },
      'g1': { type: 'knight', color: 'white' },
      'h1': { type: 'rook', color: 'white' },
      'a2': { type: 'pawn', color: 'white' },
      'b2': { type: 'pawn', color: 'white' },
      'c2': { type: 'pawn', color: 'white' },
      'd2': { type: 'pawn', color: 'white' },
      'e2': { type: 'pawn', color: 'white' },
      'f2': { type: 'pawn', color: 'white' },
      'g2': { type: 'pawn', color: 'white' },
      'h2': { type: 'pawn', color: 'white' },

      // Чёрные фигуры
      'a8': { type: 'rook', color: 'black' },
      'b8': { type: 'knight', color: 'black' },
      'c8': { type: 'bishop', color: 'black' },
      'd8': { type: 'queen', color: 'black' },
      'e8': { type: 'king', color: 'black' },
      'f8': { type: 'bishop', color: 'black' },
      'g8': { type: 'knight', color: 'black' },
      'h8': { type: 'rook', color: 'black' },
      'a7': { type: 'pawn', color: 'black' },
      'b7': { type: 'pawn', color: 'black' },
      'c7': { type: 'pawn', color: 'black' },
      'd7': { type: 'pawn', color: 'black' },
      'e7': { type: 'pawn', color: 'black' },
      'f7': { type: 'pawn', color: 'black' },
      'g7': { type: 'pawn', color: 'black' },
      'h7': { type: 'pawn', color: 'black' },
    };
  }

  initializeCells() {
    const rows = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const cols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    this.cells = cols.flatMap((col) => rows.map((row) => `${col}${row}`));
  }

  selectCell(cell: string) {
    if (this.selectedCell) {
      this.webSocketService.sendMove({ from: this.selectedCell, to: cell });
      this.movePiece(this.selectedCell, cell);
      this.move.emit({ from: this.selectedCell, to: cell });
      this.selectedCell = null;
    } else {
      this.selectedCell = cell;
    }
  }

  movePiece(from: string, to: string) {
    if (this.board[from]) {
      this.board[to] = this.board[from];
      this.board[from] = null;
    }
  }

  getPieceSymbol(piece: ChessPiece | null): string {
    if (!piece) return '';
    const symbols: Record<PieceType, Record<PieceColor, string>> = {
      pawn: { white: '♙', black: '♟' },
      rook: { white: '♖', black: '♜' },
      knight: { white: '♘', black: '♞' },
      bishop: { white: '♗', black: '♝' },
      queen: { white: '♕', black: '♛' },
      king: { white: '♔', black: '♚' },
    };
    return symbols[piece.type][piece.color];
  }
}
