import { TestBed } from '@angular/core/testing';

import { DialogueAndalertsService } from './dialogue-andalerts.service';

describe('DialogueAndalertsService', () => {
  let service: DialogueAndalertsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogueAndalertsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
