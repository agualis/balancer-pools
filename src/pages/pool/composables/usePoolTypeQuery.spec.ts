import { waitFor } from '@testing-library/vue';
import { mockPoolById } from '@tests/msw/handlers';
import { mountVueQueryComposable } from '@tests/unit/mount-helpers';
import { usePoolTypeQuery } from './useTypeQuery';

test('query pool type', async () => {
  const poolId =
    '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014';

  const { isLoading, data } = mountVueQueryComposable(() =>
    usePoolTypeQuery(poolId)
  ).result;

  expect(isLoading.value).toBeTruthy();

  await waitFor(() => {
    expect(isLoading.value).toBeFalsy();
    expect(data.value).toEqual(mockPoolById.pool?.poolType);
  });
});
