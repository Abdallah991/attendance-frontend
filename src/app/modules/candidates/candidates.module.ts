import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatesComponent } from './candidates.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/components/shared.module';
import { CandidatesRoutingModule } from './candidates-routing.module';
import { CandidatesService } from './services/candidates.service';
import { CandidatesResolver } from './services/candidates.resolver';
import { ViewCandidateComponent } from './view-candidate/view-candidate.component';
import { ViewCandidateResolver } from './services/view-candidate.resolver';
import { CandidateAttendanceResolver } from './services/candidate-attendance.resolver';

@NgModule({
  declarations: [CandidatesComponent, ViewCandidateComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    CandidatesRoutingModule,
  ],
  providers: [
    CandidatesService,
    CandidatesResolver,
    ViewCandidateResolver,
    CandidateAttendanceResolver,
  ],
})
export class CandidatesModule {}
