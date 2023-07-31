import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicantsComponent } from './applicants.component';
import { SharedModule } from 'src/app/components/shared.module';
import { ApplicantsRoutingModule } from './applicants-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ApplicantsGraphsComponent } from './applicants-graphs/applicants-graphs.component';
import { ApplicantsStatusComponent } from './applicants-status/applicants-status.component';

@NgModule({
  declarations: [ApplicantsComponent, ApplicantsGraphsComponent, ApplicantsStatusComponent],
  imports: [
    CommonModule,
    SharedModule,
    ApplicantsRoutingModule,
    ReactiveFormsModule,
  ],
})
export class ApplicantsModule {}
