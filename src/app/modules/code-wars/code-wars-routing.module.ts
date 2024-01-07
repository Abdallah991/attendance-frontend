import { RouterModule, Routes } from '@angular/router';
import { CodeWarsComponent } from './code-wars.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AddWarriorComponent } from './add-warrior/add-warrior.component';

const routes: Routes = [
  {
    path: '',
    component: CodeWarsComponent,
    // to be able to add
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, ReactiveFormsModule],
  exports: [RouterModule],
})
export class CodeWarsRoutingModule {}
