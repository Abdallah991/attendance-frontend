import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentsRoutingModule } from './students-routing.module';
// import { StudentsService } from './services/students.service';
import { StudentsResolver } from './services/students.resolver';
import { SharedModule } from 'src/app/components/shared.module';
import { EditStudentComponent } from './edit-student/edit-student.component';

@NgModule({
  declarations: [StudentsComponent, EditStudentComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StudentsRoutingModule,
    SharedModule,
  ],
  providers: [
    // StudentsService,
    StudentsResolver,
  ],
})
export class StudentsModule {}
