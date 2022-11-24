import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { ButtonComponent } from './button/button.component';
import { TextFieldComponent } from './text-field/text-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { SingleSelectComponent } from './single-select/single-select.component';

@NgModule({
  declarations: [
    TableComponent,
    ButtonComponent,
    TextFieldComponent,
    LoaderComponent,
    SingleSelectComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    TableComponent,
    ButtonComponent,
    TextFieldComponent,
    LoaderComponent,
    SingleSelectComponent,
  ],
})
export class SharedModule {}
