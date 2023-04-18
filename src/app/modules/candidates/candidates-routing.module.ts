import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CandidatesComponent } from './candidates.component';

const routes: Routes = [
  {
    path: '',
    component: CandidatesComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      // TODO: add resolvers
      //   candidates: CandidatesResolver,
      //   signedUsers: UsersSignedResolver,
      //   latestSignedUsers: LastdaySignedResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, ReactiveFormsModule],
  exports: [RouterModule],
})
export class CandidatesRoutingModule {}
