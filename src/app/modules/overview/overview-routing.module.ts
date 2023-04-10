import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview.component';
import { CandidatesResolver } from './services/candidates.resolver';

const routes: Routes = [
  {
    path: '',
    component: OverviewComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      // TODO: add resolvers
      candidates: CandidatesResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, ReactiveFormsModule],
  exports: [RouterModule],
})
export class OverviewRoutingModule {}
