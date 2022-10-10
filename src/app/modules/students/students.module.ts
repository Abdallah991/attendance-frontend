import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsService } from './services/students.service';
import { StudentsResolver } from './services/students.resolver';

@NgModule({
  declarations: [StudentsComponent],
  imports: [CommonModule, ReactiveFormsModule, StudentsRoutingModule],
  providers: [StudentsService, StudentsResolver],
})
export class StudentsModule {}
