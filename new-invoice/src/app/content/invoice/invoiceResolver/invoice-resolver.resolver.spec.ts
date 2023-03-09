import { TestBed } from '@angular/core/testing';

import { InvoiceResolverResolver } from './invoice-resolver.resolver';

describe('InvoiceResolverResolver', () => {
  let resolver: InvoiceResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(InvoiceResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
