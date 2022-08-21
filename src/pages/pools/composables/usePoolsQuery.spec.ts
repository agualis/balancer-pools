import { mountVueQueryComposable } from '@tests/unit/mount-helpers';
import { mockFirstPoolsPage, mockSecondPoolsPage } from '@tests/msw/handlers';
import { waitFor } from '@testing-library/vue';
import { useInfinitePaginatedPoolsQuery } from './usePoolsQuery';

test('returns pool pages when using infinite query', async () => {
  const { isLoading, data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    mountVueQueryComposable(() => useInfinitePaginatedPoolsQuery()).result;

  expect(isLoading.value).toBeTruthy();

  await waitFor(() => {
    expect(isLoading.value).toBeFalsy();
    expect(data.value?.pages.length).toBe(1);
    expect(data.value?.pages[0]).toEqual(mockFirstPoolsPage);
  });

  expect(hasNextPage?.value).toBeTruthy();

  // Fetch second page
  fetchNextPage.value();

  expect(isFetchingNextPage.value).toBeTruthy();

  await waitFor(() => {
    expect(isFetchingNextPage.value).toBeFalsy();
    expect(isLoading.value).toBeFalsy();
    expect(data.value?.pages.length).toBe(2);
    expect(data.value?.pages[0]).toEqual(mockFirstPoolsPage);
    expect(data.value?.pages[1]).toEqual(mockSecondPoolsPage);
  });
});