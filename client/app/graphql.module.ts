// import {NgModule} from '@angular/core';
// import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
// import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
// import {InMemoryCache} from 'apollo-cache-inmemory';
// import { setContext } from 'apollo-link-context';
// import { ApolloLink, concat } from 'apollo-link';
// import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';

const uri = 'http://localhost:4000/graphql'; // <-- add the URL of the GraphQL server here
export function provideApollo(httpLink: HttpLink) {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8'
    }
  }));
  const auth = setContext((operation, context) => ({
    headers: {
      Authorization: `Bearer $blah`
    },
  }));
  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  const cache = new InMemoryCache();
// export function createApollo(httpLink: HttpLink) {
//   const basic =  setContext((op, ctx) => ({
//     headers: new HttpHeaders()
//       .set('Accept', 'charset=uf-8'),
//   }));

//   const auth = setContext((operation, ctx) => ({
//     headers: ctx.headers.append('authorization', `Bearer PlsLogMeIn`)
//   }));

//   const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);

  return {
    link,
    cache
  };
}

@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: provideApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
