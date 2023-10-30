import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview.component';
import { OverviewResolver } from './services/overview.resolver';
import { AuditsAndRankingsComponent } from './audits-and-rankings/audits-and-rankings.component';
import { StudentsResolver } from '../students/services/students.resolver';

const routes: Routes = [
  {
    path: '',
    component: AuditsAndRankingsComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      // TODO: add resolvers
      students: StudentsResolver,
      studentsProgress: OverviewResolver,
    },
  },
  {
    path: 'cohort-detailed',
    component: OverviewComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      // TODO: add resolvers
      students: OverviewResolver,
      // signedUsers: UsersSignedResolver,
      // latestSignedUsers: LastdaySignedResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, ReactiveFormsModule],
  exports: [RouterModule],
})
export class OverviewRoutingModule {}
