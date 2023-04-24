import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CandidatesComponent } from './candidates.component';
import { CandidatesResolver } from './services/candidates.resolver';

const routes: Routes = [
  {
    path: '',
    component: CandidatesComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      candidates: CandidatesResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, ReactiveFormsModule],
  exports: [RouterModule],
})
export class CandidatesRoutingModule {}
