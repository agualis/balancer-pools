import { mount, MountResult } from 'vue-composable-tester';
import { useQueryProvider } from 'vue-query';

export function mountVueQueryComposable<R>(callback: () => R): MountResult<R> {
  return mount<R>(callback, {
    provider: useQueryProvider,
  });
}
