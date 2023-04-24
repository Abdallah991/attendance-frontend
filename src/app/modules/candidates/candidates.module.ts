import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatesComponent } from './candidates.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/components/shared.module';
import { CandidatesRoutingModule } from './candidates-routing.module';
import { CandidatesService } from './services/candidates.service';
import { CandidatesResolver } from './services/candidates.resolver';

@NgModule({
  declarations: [CandidatesComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    CandidatesRoutingModule,
  ],
  providers: [CandidatesService, CandidatesResolver],
})
export class CandidatesModule {}
