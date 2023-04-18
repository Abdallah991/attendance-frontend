import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import {
  ApolloClientOptions,
  InMemoryCache,
  ApolloLink,
} from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { platformToken } from './constants/api';

const uri = 'https://learn.reboot01.com/api/graphql-engine/v1/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  // define the cache
  const cache = new InMemoryCache({});
  // create http
  const http = httpLink.create({
    uri: uri,
  });

  return {
    assumeImmutableResults: true,
    cache,
    link: ApolloLink.from([basicContext, http]),
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
      },
    },
  };
}

const basicContext = setContext((_, { headers }) => {
  // set the context
  return {
    headers: {
      authorization: 'Bearer ' + platformToken,
      'Content-Type': 'application/json',
    },
  };
});

@NgModule({
  imports: [BrowserModule, HttpClientModule, ApolloModule],
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
