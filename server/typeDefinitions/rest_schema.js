import { gql } from "apollo-server-express";

export default gql`

 type Rocket {
    id: ID!
    name: String
    type: String
  }
  type User @auth(requires: ADMIN) {
    name: String
    banned: Boolean @auth(requires: ADMIN)
    canPost: Boolean @auth(requires: REVIEWER)
  }
 type Launch @auth(requires: ADMIN){
    id: ID! @auth(requires: ADMIN)
    site: String @upper 
    isBooked: Boolean! @auth(requires: REVIEWER)
  }
  interface PaginationResponse  {
    cursor: String!
    hasMore: Boolean!
  }
  type LaunchConnection implements PaginationResponse {
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }
  type Query {
    launches(
            pageSize: Int
            after: String
    ): LaunchConnection!

    launch(id: ID!): Launch
  }

  
`;
// type UpdateUserEmailMutationResponse implements MutationResponse {
//   code: String!
//   success: Boolean!
//   message: String!
//   post: Post
//   user: User
// }