import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { AuthGuard } from './guards/auth.guard';
import { AssistantGuard } from './guards/assistant.guard';

const routes: Routes = [
  {
    path: '',
    component: SideNavComponent,
    // TODO: Activate this auth gaurd, if token is not there direct the user to login
    canActivate: [AuthGuard],
    children: [
      {
        // users routes
        path: 'users',
        loadChildren: () =>
          import('./modules/users/users.module').then((m) => m.UsersModule),
        canActivate: [AssistantGuard],
      },
      {
        // overview routes
        path: 'overview',
        loadChildren: () =>
          import('./modules/overview/overview.module').then(
            (m) => m.OverviewModule
          ),
        canActivate: [AssistantGuard],
      },

      {
        // candidates routes
        path: 'students',
        loadChildren: () =>
          import('./modules/students/students.module').then(
            (m) => m.StudentsModule
          ),
        canActivate: [AssistantGuard],
      },
      {
        // APPLICANTS routes
        path: 'applicants',
        loadChildren: () =>
          import('./modules/applicants/applicants.module').then(
            (m) => m.ApplicantsModule
          ),
        canActivate: [AssistantGuard],
      },
      {
        // SP routes
        path: 'piscine',
        loadChildren: () =>
          import('./modules/piscine/piscine.module').then(
            (m) => m.PiscineModule
          ),
      },
      {
        // CW routes
        path: 'code-wars',
        loadChildren: () =>
          import('./modules/code-wars/code-wars.module').then(
            (m) => m.CodeWarsModule
          ),
      },
      {
        path: 'change-password',
        loadChildren: () =>
          import('./modules/change-password/change-password.module').then(
            (m) => m.ChangePasswordModule
          ),
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
