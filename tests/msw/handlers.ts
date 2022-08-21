import {
  aRawPool,
  aNonWeightedRawPool,
} from '../../src/pages/pools/test-builders/pools.builders';
import { graphql } from 'msw';
import { aPoolById } from '@/pages/pool/test-builders/pool.builders';

export const mockFirstPoolsPage = {
  pools: [aRawPool(), aNonWeightedRawPool()],
};

export const mockSecondPoolsPage = {
  pools: [aNonWeightedRawPool(), aRawPool()],
};

export const mockPoolById = aPoolById();

export const handlers = [
  graphql.query('paginatedPools', (req, res, ctx) => {
    const pageResponse = (page: object) => res(ctx.data(page));
    // Return pages of PageSize 2 for the sake of simpler testing
    const pageNumber = req.variables.skip / 5 / 2;
    if (pageNumber === 0) return pageResponse(mockFirstPoolsPage);
    if (pageNumber === 1) return pageResponse(mockSecondPoolsPage);
  }),

  graphql.query('poolById', (req, res, ctx) => {
    const response = (pool: object) => res(ctx.data(pool));

    return response(mockPoolById);
  }),
];
