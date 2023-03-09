import { TestBed } from '@angular/core/testing';

import { TestResolver } from './test.resolver';

describe('TestResolver', () => {
  let resolver: TestResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TestResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
