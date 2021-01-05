import { ApolloServer, SchemaDirectiveVisitor } from 'apollo-server-express';
import { makeExecutableSchema, addSchemaLevelResolveFunction } from 'graphql-tools';
import app from './app';
import { CONFIG } from './config';

import LaunchesAPI from './datasources/rest_datasource/rocket_launch';
import LivestaxAPI from './datasources/db_datasource/postgres';
import SpotifyAPI from './datasources/rest_datasource/spotify'
import createStore from './datasources/db_datasource/postgres/pg';
import typeDefs from './typeDefinitions';
import resolvers from './resolvers';
import { upper, intl, auth, length } from './directives';
import { genericErrorHandler, methodNotAllowed } from './utils/express_errorhandler';
import authenticate from './utils/authentication';
import errorReport from './utils/google-error-reporting';

// creates a sequelize connection once. NOT for every request
const store = createStore();

// Set up any dataSources our resolvers need
const dataSources = () => ({
  apiDataSource: new LaunchesAPI(),
  apiLivestax: new LivestaxAPI({store}),
  spotifyDataSource : new SpotifyAPI()
});

// Make a single schema using makeExecutableSchema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const rootResolveFunction = (parent, args, context, info) => {
  //perform action before any other resolvers
  console.log('roottresolver')
};

addSchemaLevelResolveFunction(schema, rootResolveFunction)
// Plugin the upper directive
SchemaDirectiveVisitor.visitSchemaDirectives(schema, {
  upper,
  intl,
  auth,
  length
})

// Create server with appropriate options
const server = new ApolloServer({
  schema,
  dataSources,
  context: ({req}) => ({
    loggedInUser: authenticate(req),
    role: 'ADMIN'
  }),
  introspection: true,
  tracing:true,
  playground: true,
  engine: {
    apiKey: process.env.ENGINE_API_KEY,
    // ...internalEngineDemo,
    
  },
  onHealthCheck: () => {
    return new Promise((resolve, reject) => {
      // Replace the `true` in this conditional with more specific checks!
      if (true) {
        resolve();
      } else {
        reject();
      }
    });
  },
  // Parses every error
  // Can be used for masking outgoing error
  // Logging error
  formatError: (err) => {
    console.error('Parsed Error', err);
    // check if graphql error is received here
    errorReport.report(new Error(`${err}`));
    // Don't give the specific errors to the client.
    if (err.message.startsWith("Database Error: ")) {
      return new Error('Internal server error');
    }
    
    // Otherwise return the original error.  The error can also
    // be manipulated in other ways, so long as it's returned.
    return err;
  }
  
});

server.applyMiddleware({ app });

// Launch the web server.
app.listen({ port: 4000 },() => {
  console.log(`🚀  Server ready at   http://localhost:4000${server.graphqlPath}`);
});

app.use('/', genericErrorHandler, methodNotAllowed);

app.on('error', error => console.log('err3', error));