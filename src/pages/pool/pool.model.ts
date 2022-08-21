import { OnChainPoolTokens } from '@/pages/pool/queries/pool.onchain';
/* eslint-disable security/detect-object-injection */
import { BigNumber } from 'ethers';
import { toTokenAmount as toTokenAmount } from '@/shared/money-formatters';
import { tokenByAddress } from '@/shared/tokens';
import { toPercentage } from '@/shared/weight-formatters';
import { formatUnits } from 'ethers/lib/utils';

export enum PoolType {
  Weighted = 'Weighted',
  Investment = 'Investment',
  Stable = 'Stable',
  MetaStable = 'MetaStable',
  StablePhantom = 'StablePhantom',
  LiquidityBootstrapping = 'LiquidityBootstrapping',
}

export function normalizeWeight(weight: BigNumber) {
  return Number(formatUnits(weight, 18));
}

export function isWeightedLike(poolType: string): boolean {
  return (
    poolType === PoolType.Weighted ||
    poolType === PoolType.Investment || //is Managed
    poolType === PoolType.LiquidityBootstrapping
  );
}

export class OnChainPoolModel {
  constructor(
    public poolType: string,
    private onChainPool: OnChainPoolTokens,
    private weights: BigNumber[]
  ) {
    this.poolType = poolType;
    this.onChainPool = onChainPool;
    this.weights = weights;
  }

  get tokensMetadata() {
    return this.onChainPool.tokens.map(token => tokenByAddress(token));
  }

  get tokenUris() {
    return this.tokensMetadata.map(token => token.logoURI);
  }

  get tokenSymbols() {
    return this.tokensMetadata.map(token => token.symbol);
  }

  get tokens() {
    return this.tokensMetadata.map((tokenMetadata, index) => {
      return {
        ...tokenMetadata,
        balance: toTokenAmount(
          formatUnits(this.onChainPool.balances[index], tokenMetadata.decimals)
        ),
        weight: this.weights.length
          ? toPercentage(normalizeWeight(this.weights[index]))
          : '-',
      };
    });
  }
}
