import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/components/shared.module';
import { OverviewRoutingModule } from './overview-routing.module';
// import { ApolloModule } from 'apollo-angular';
import { OverviewService } from './services/overview.service';
import { LastdaySignedResolver } from './services/lastday-signed.resolver';
import { OverviewResolver } from './services/overview.resolver';
import { UsersSignedResolver } from './services/users-signed.resolver';

@NgModule({
  declarations: [OverviewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OverviewRoutingModule,
    SharedModule,
    // ApolloModule,
  ],
  providers: [
    OverviewResolver,
    UsersSignedResolver,
    LastdaySignedResolver,
    OverviewService,
  ],
})
export class OverviewModule {}
