import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideNavComponent } from './components/side-nav/side-nav.component';

const routes: Routes = [
  {
    path: '',
    component: SideNavComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        // students routes
        path: 'students',
        loadChildren: () =>
          import('./modules/students/students.module').then(
            (m) => m.StudentsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
