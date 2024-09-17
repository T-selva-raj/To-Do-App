import { TestBed } from '@angular/core/testing';

import { HtttpInterceptor } from './htttp.interceptor';

describe('HtttpInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HtttpInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HtttpInterceptor = TestBed.inject(HtttpInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
