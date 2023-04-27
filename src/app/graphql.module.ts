import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';

const uri = 'https://learn.reboot01.com/api/graphql-engine/v1/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8',
    },
  }));
  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache(),
    headers: {
      // Authorization: 'Bearer ' + platformToken,
      'Content-Type': 'application/json',
    },
  };
}

@NgModule({
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
function setContext(
  arg0: (operation: any, context: any) => { headers: { Accept: string } }
) {
  throw new Error('Function not implemented.');
}
