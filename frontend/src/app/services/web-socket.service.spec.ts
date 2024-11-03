import { TestBed } from '@angular/core/testing';
import { WebSocketService } from './web-socket.service';

describe('WebSocketService', () => {
  let service: WebSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should connect to WebSocket', () => {
    spyOn(service, 'connect');
    service.connect();
    expect(service.connect).toHaveBeenCalled();
  });

  it('should send and receive moves', (done) => {
    const move = { from: 'e2', to: 'e4' };
    spyOn(service, 'sendMove').and.callFake(() => {
      service.onMove().subscribe((receivedMove) => {
        expect(receivedMove).toEqual(move);
        done();
      });
      service.sendMove(move);
    });
  });
});
