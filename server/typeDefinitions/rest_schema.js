import { gql } from "apollo-server-express";

export default gql`

 type TravelVehicle {
    id: ID!
    name: String
    type: String
  }
  type Travel {
    name: String,
    missionPatchSmall: String
    missionPatchLarge: String
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
    travel: Travel
    travelVehicle: TravelVehicle
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
    combination: LaunchAlbumCombo

    getAllNewReleases:[Album]

    launches(
            pageSize: Int
            after: String
    ): LaunchConnection!

    launch(id: ID!): Launch
  }

  type LaunchAlbumCombo{
    release:[Album]
     travel: LaunchConnection
  }
  type Album {
    id: ID!
    name: String
    release_date: String
    artist: String
    artist_id: String
  }


  
`;
// type UpdateUserEmailMutationResponse implements MutationResponse {
//   code: String!
//   success: Boolean!
//   message: String!
//   post: Post
//   user: User
// }