import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './components/shared.module';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { StudentsModule } from './modules/students/students.module';
import { GraphQLModule } from './graphql.module';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, SideNavComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StudentsModule,
    HttpClientModule,
    SharedModule,
    ApolloModule,
    GraphQLModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
