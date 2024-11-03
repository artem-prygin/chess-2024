import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WebSocketService } from './services/web-socket.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockWebSocketService: jasmine.SpyObj<WebSocketService>;

  beforeEach(async () => {
    mockWebSocketService = jasmine.createSpyObj('WebSocketService', ['sendMove', 'onMove']);
    mockWebSocketService.onMove.and.returnValue(of({ from: 'e2', to: 'e4' }));

    await TestBed.configureTestingModule({
      providers: [{ provide: WebSocketService, useValue: mockWebSocketService }],
      imports: [/* Здесь должны быть необходимые импорты для компонента */],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send move', () => {
    component.handleMove({ from: 'e2', to: 'e4' });
    expect(mockWebSocketService.sendMove).toHaveBeenCalledWith({ from: 'e2', to: 'e4' });
  });
});
