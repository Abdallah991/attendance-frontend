import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CohortsComponent } from './cohorts.component';
import { SharedModule } from 'src/app/components/shared.module';
import { CohortsRoutingModule } from './cohorts-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CohortsService } from './services/cohorts.service';

@NgModule({
  declarations: [CohortsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    CohortsRoutingModule,
  ],
  providers: [CohortsService],
})
export class CohortsModule {}
