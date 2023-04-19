import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview.component';
import { OverviewResolver } from './services/overview.resolver';
import { UsersSignedResolver } from './services/users-signed.resolver';
import { LastdaySignedResolver } from './services/lastday-signed.resolver';

const routes: Routes = [
  {
    path: '',
    component: OverviewComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      // TODO: add resolvers
      candidates: OverviewResolver,
      signedUsers: UsersSignedResolver,
      latestSignedUsers: LastdaySignedResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, ReactiveFormsModule],
  exports: [RouterModule],
})
export class OverviewRoutingModule {}
