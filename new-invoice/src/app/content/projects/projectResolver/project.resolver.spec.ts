import { TestBed } from '@angular/core/testing';

import { ProjectResolver } from './project.resolver';

describe('ProjectResolver', () => {
  let resolver: ProjectResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProjectResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
