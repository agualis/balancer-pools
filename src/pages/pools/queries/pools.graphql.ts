import { gql } from 'graphql-request';

export const FRAGMENT_POOL_DETAILS = gql`
  fragment Pool on Pool {
    id
    address
    poolType
    swapFee
    totalLiquidity
    tokens {
      address
      balance
      weight
      symbol
    }
  }
`;

export const orderedPoolsQuery = gql`{
  pools (
    first: 10,
    orderBy: totalLiquidity,
    orderDirection: desc,
    ) {
      ...Pool
    }
  }
  ${FRAGMENT_POOL_DETAILS}
  `

export const paginatedPoolsQuery = gql`
query paginatedPools($pageSize: Int!, $skip: Int!) {
  pools(
    first: $pageSize,
    skip: $skip,
    orderBy: totalLiquidity,
    orderDirection: desc,
    where: {
      poolType_not_in: ["Element", "AaveLinear", "Linear", "ERC4626Linear"]
    }
  )
  {
    ...Pool
  }
}
${FRAGMENT_POOL_DETAILS}
`
