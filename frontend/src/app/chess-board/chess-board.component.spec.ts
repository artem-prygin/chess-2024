import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChessBoardComponent } from './chess-board.component';

describe('ChessBoardComponent', () => {
  let component: ChessBoardComponent;
  let fixture: ComponentFixture<ChessBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChessBoardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ChessBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should select a cell', () => {
    component.selectCell('e2'); // Выбираем первую клетку
    expect(component.selectedFrom).toBe('e2'); // Проверяем, что selectedFrom установлено
  });

  it('should emit move on second selection', () => {
    spyOn(component.move, 'emit'); // Шпион на emit событие
    component.selectCell('e2'); // Выбираем первую клетку
    component.selectCell('e4'); // Выбираем вторую клетку
    expect(component.move.emit).toHaveBeenCalledWith({ from: 'e2', to: 'e4' }); // Проверяем, что emit вызван
  });
});
