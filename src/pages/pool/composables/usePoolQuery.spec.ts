import * as queries from '../queries/pool.queries';
import { anOnchainPoolModel } from '@/pages/pool/test-builders/pool.builders';
import { mountVueQueryComposable } from '@tests/unit/mount-helpers';
import { waitFor } from '@testing-library/vue';
import { usePoolQuery } from './usePoolQuery';

vi.spyOn(queries, 'queryPool').mockImplementation(async ()=> anOnchainPoolModel())

test('query pool mixing onchain and subgraph (PoolType) sources', async () => {
  const poolId =
  '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014';

  const { isLoading, data } = mountVueQueryComposable(() =>
    usePoolQuery(poolId)
  ).result;

  expect(isLoading.value).toBeTruthy();

  await waitFor(() => {
    expect(isLoading.value).toBeFalsy();
    expect(data.value?.poolType).toEqual('Weighted');
    expect(data.value?.tokenSymbols).toEqual([ 'BAL', 'WETH' ]);
  });
});

