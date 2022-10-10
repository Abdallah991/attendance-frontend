import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { ButtonComponent } from './button/button.component';
import { TextFieldComponent } from './text-field/text-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SideNavComponent } from './side-nav/side-nav.component';

@NgModule({
  declarations: [
    TableComponent,
    ButtonComponent,
    TextFieldComponent,
    SideNavComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    TableComponent,
    ButtonComponent,
    TextFieldComponent,
    SideNavComponent,
  ],
})
export class SharedModule {}
