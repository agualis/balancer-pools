import request from 'graphql-request';

export const balancerSubgraph =
  'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-v2';

export async function queryBalancerSubgraph(query: string, variables?: object) {
  return request(balancerSubgraph, query, variables);
}