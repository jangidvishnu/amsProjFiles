import { TestBed } from '@angular/core/testing';

import { AssetHistoryService } from './asset-history.service';

describe('AssetHistoryService', () => {
  let service: AssetHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
