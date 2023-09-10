import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PiscineComponent } from './piscine.component';
import { PiscineResolver } from './services/piscine.resolver';

const routes: Routes = [
  {
    path: '',
    component: PiscineComponent,
    // to be able to add
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      applicants: PiscineResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, ReactiveFormsModule],
  exports: [RouterModule],
})
export class PiscineRoutingModule {}
