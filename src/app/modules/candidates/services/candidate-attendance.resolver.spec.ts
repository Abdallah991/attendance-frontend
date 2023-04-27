import { TestBed } from '@angular/core/testing';

import { CandidateAttendanceResolver } from './candidate-attendance.resolver';

describe('CandidateAttendanceResolver', () => {
  let resolver: CandidateAttendanceResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CandidateAttendanceResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
