import { toUSD } from '@/shared/money-formatters';
import { tokenByAddress } from '@/shared/tokens'
import { toPercentage } from '@/shared/weight-formatters';
import { PaginatedPoolsQuery } from '@/generated/subgraph-types';

export type RawPool = PaginatedPoolsQuery['pools'][0];

export function generateRowsFromPages(pages: PaginatedPoolsQuery[]) {
  let allPools : RawPool[] = []
  pages.forEach(page => {
    allPools = allPools.concat(page.pools);
  })
  return allPools.map(rawPool => {
    return new PoolModel(rawPool);
  });
}

export class PoolModel {
  constructor(private rawPool: RawPool) {
    this.rawPool = rawPool
  }

  get id() {
    return this.rawPool.id
  }

  get tokensMetadata() {
    return this.rawPool.tokens
    ? this.rawPool.tokens.map(token => tokenByAddress(token.address))
    : []
  }

  get tokenUris() {
    return this.tokensMetadata.map(token => token.logoURI)
  }

  get tokenSymbols() {
    return this.tokensMetadata.map(token => token.symbol)
  }

  get composition() {
    if (!this.rawPool.tokens || !this.rawPool.poolType) {
      return '-'
    }

    if (['Weighted'].includes(this.rawPool.poolType)) {
      return this.rawPool.tokens
        .map(token => `${token.symbol} ${toPercentage(token.weight)}`)
        .join(' ');
    }
    return this.rawPool.poolType
  }

  get totalLiquidityUSD() {
    return toUSD(this.rawPool.totalLiquidity)
  }
}