import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import paginateResults from "../utils/pagination";
import { UserInputError } from 'apollo-server-express';

export default {
  // Date: new GraphQLScalarType({
  //     name: "Date",
  //     description: "Date custom scalar type",
  //     parseValue(value) {
  //       return new Date(value); // value from the client
  //     },
  //     serialize(value) {
  //       return value.getTime(); // value sent to the client
  //     },
  //     parseLiteral(ast) {
  //       if (ast.kind === Kind.INT) {
  //         return new Date(+ast.value); // ast value is always in string format
  //       }
  //       return null;
  //     }
  //   }),
  // Odd: new GraphQLScalarType({
  //   name: "Odd",
  //   description: "Odd custom scalar type",
  //   parseValue: oddValue,
  //   serialize: oddValue,
  //   parseLiteral(ast) {
  //     if (ast.kind === Kind.INT) {
  //       return oddValue(parseInt(ast.value, 10));
  //     }
  //     return null;
  //   }
  // }),
  Query: {
    combination : async (_, __, { dataSources }) => {
      console.log("dataSources.apiDataSource", dataSources.apiDataSource);
      const release= await dataSources.spotifyDataSource.getAllNewReleases();
      const allLaunches= await dataSources.apiDataSource.getAllLaunches();
      const launches = paginateResults({
        after : null,
        pageSize : 20,
        results: allLaunches
      });

      const travel=  {
        launches,
        cursor: launches.length ? launches[launches.length - 1].cursor : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: launches.length
          ? launches[launches.length - 1].cursor !==
            allLaunches[allLaunches.length - 1].cursor
          : false
      };
      return {release, travel};
    },
    getAllNewReleases: async (_, __, { dataSources }) => {
      console.log("dataSources.apiDataSource", dataSources.apiDataSource);
      return dataSources.spotifyDataSource.getAllNewReleases();
    },
    launch: async (id, _, { dataSources }) => {
      console.log("dataSources.apiDataSource", dataSources.apiDataSource);
      return dataSources.apiDataSource.getLaunchById({ id });
    },
    launches: async (_, { pageSize = 20, after }, { dataSources }) => {
      // throwCustomErroMessage();
      const allLaunches = await dataSources.apiDataSource.getAllLaunches();
      // we want these in reverse chronological order
      // allLaunches.reverse();
      const launches = paginateResults({
        after,
        pageSize,
        results: allLaunches
      });

      return {
        launches,
        cursor: launches.length ? launches[launches.length - 1].cursor : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: launches.length
          ? launches[launches.length - 1].cursor !==
            allLaunches[allLaunches.length - 1].cursor
          : false
      };
    }
  }
};

function oddValue(value) {
  return value % 2 === 1 ? value : null;
}


const throwCustomErroMessage = () => {
  throw new UserInputError('Main error message', {
    errorMessage1: 'Error message description'
  });
}