import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from 'src/app/components/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users.component';
import { UsersService } from './services/users.service';
import { UsersResolver } from './services/users.resolver';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
  declarations: [UsersComponent, EditUserComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
