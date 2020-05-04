import { gql } from "apollo-server-express";

export default gql`  
"""
Declare directive and scalar types here
"""
directive @upper on FIELD_DEFINITION
directive @intl on FIELD_DEFINITION
directive @length(max: Int) on FIELD_DEFINITION | INPUT_FIELD_DEFINITION
scalar Date
interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
}
directive @auth(
    requires: Role = USER,
  ) on OBJECT | FIELD_DEFINITION
  
  enum Role {
    ADMIN
    REVIEWER
    USER
    UNKNOWN
  }
  

`
// union
// __resolveType
