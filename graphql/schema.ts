// copied from schema.graphql because we cant get webpack graphql-loader to work with typescript
import { gql } from 'apollo-server-lambda'
export const typeDefs = gql`
  type Query {
    randomNumber: Int @cacheControl(maxAge: 30)
  }

`
