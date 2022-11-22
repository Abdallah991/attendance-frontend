import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/components/shared.module';
import { StudentsRoutingModule } from '../students/students-routing.module';
import { EventsRoutingModule } from './events-routing.module';

@NgModule({
  declarations: [EventsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EventsRoutingModule,
    SharedModule,
  ],
})
export class EventsModule {}
