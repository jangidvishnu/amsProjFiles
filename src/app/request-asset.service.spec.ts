import { TestBed } from '@angular/core/testing';

import { RequestAssetService } from './request-asset.service';

describe('RequestAssetService', () => {
  let service: RequestAssetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestAssetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
