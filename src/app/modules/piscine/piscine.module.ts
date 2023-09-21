import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PiscineComponent } from './piscine.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PiscineRoutingModule } from './piscine-routing.module';
import { SharedModule } from 'src/app/components/shared.module';
import { PiscineDetailComponent } from './piscine-detail/piscine-detail.component';

@NgModule({
  declarations: [PiscineComponent, PiscineDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    PiscineRoutingModule,
  ],
})
export class PiscineModule {}
