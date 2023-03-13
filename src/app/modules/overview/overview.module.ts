import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/components/shared.module';
import { OverviewRoutingModule } from './overview-routing.module';
import { ApolloModule } from 'apollo-angular';

@NgModule({
  declarations: [OverviewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OverviewRoutingModule,
    SharedModule,
    ApolloModule,
  ],
})
export class OverviewModule {}
