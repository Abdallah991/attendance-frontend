import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { ButtonComponent } from './button/button.component';
import { TextFieldComponent } from './text-field/text-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { SingleSelectComponent } from './single-select/single-select.component';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';
import { SearchDropDownComponent } from './search-drop-down/search-drop-down.component';
import { MatDialogModule } from '@angular/material/dialog';
import { VacationComponent } from './vacation/vacation.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    TableComponent,
    ButtonComponent,
    TextFieldComponent,
    LoaderComponent,
    SingleSelectComponent,
    SuccessDialogComponent,
    SearchDropDownComponent,
    VacationComponent,
    DatePickerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
  ],
  exports: [
    TableComponent,
    ButtonComponent,
    TextFieldComponent,
    LoaderComponent,
    SingleSelectComponent,
    SuccessDialogComponent,
    SearchDropDownComponent,
    DatePickerComponent,
  ],
})
export class SharedModule {}
