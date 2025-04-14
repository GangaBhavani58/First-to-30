import { TestBed } from '@angular/core/testing';

import { GameOperationsService } from './game-operations.service';

describe('GameOperationsService', () => {
  let service: GameOperationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameOperationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
