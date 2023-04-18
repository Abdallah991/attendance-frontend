import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatesComponent } from './candidates.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  declarations: [CandidatesComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
})
export class CandidatesModule {}
