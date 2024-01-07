import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeWarsComponent } from './code-wars.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/components/shared.module';
import { CodeWarsRoutingModule } from './code-wars-routing.module';
import { AddWarriorComponent } from './add-warrior/add-warrior.component';

@NgModule({
  declarations: [CodeWarsComponent, AddWarriorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    CodeWarsRoutingModule,
  ],
})
export class CodeWarsModule {}
