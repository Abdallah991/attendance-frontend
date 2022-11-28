import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditUserResolver } from './services/edit-user.resolver';
import { UsersResolver } from './services/users.resolver';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      users: UsersResolver,
    },
  },
  {
    path: 'add-user',
    component: EditUserComponent,
    data: {
      type: 'create',
    },
  },
  {
    path: 'edit-user/:userId',
    component: EditUserComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    data: {
      type: 'view',
    },
    resolve: {
      user: EditUserResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, ReactiveFormsModule],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
