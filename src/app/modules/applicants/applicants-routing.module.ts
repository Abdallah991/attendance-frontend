import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ApplicantsComponent } from './applicants.component';
import { ApplicantsResolver } from './services/applicants.resolver';
import { ApplicantsStatusComponent } from './applicants-status/applicants-status.component';
import { ApplicantsGraphsComponent } from './applicants-graphs/applicants-graphs.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicantsComponent,
    // to be able to add the value
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      applicants: ApplicantsResolver,
    },
  },
  {
    path: 'status',
    component: ApplicantsStatusComponent,
    // to be able to add the value
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      applicants: ApplicantsResolver,
    },
  },
  {
    path: 'graphs',
    component: ApplicantsGraphsComponent,
    // to be able to add the value
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      // TODO: run resolvers
      // applicants: ApplicantsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, ReactiveFormsModule],
  exports: [RouterModule],
})
export class ApplicantsRoutingModule {}
