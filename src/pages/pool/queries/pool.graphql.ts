import { gql } from 'graphql-request';

export const poolById = gql`
query poolById($poolId: ID!){
  pool(id: $poolId)
  {
    poolType
  }
}
`