import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/components/shared.module';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsService } from './services/students.service';
import { StudentsResolver } from './services/students.resolver';
import { ViewStudentComponent } from './view-student/view-student.component';
import { ViewStudentResolver } from './services/view-student.resolver';
import { StudentAttendanceResolver } from './services/student-attendance.resolver';
import { AddStudentComponent } from './add-student/add-student.component';
import { CohortsService } from '../cohorts/services/cohorts.service';
import { CohortsResolver } from '../cohorts/services/cohorts.resolver';

@NgModule({
  declarations: [StudentsComponent, ViewStudentComponent, AddStudentComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    StudentsRoutingModule,
  ],
  providers: [
    StudentsService,
    StudentsResolver,
    ViewStudentResolver,
    StudentAttendanceResolver,
    CohortsService,
    CohortsResolver,
  ],
})
export class StudentsModule {}
