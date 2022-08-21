import * as queries from './queries/pool.queries';
import Pool from '@/pages/pool/Pool.vue';
import { screen } from '@testing-library/vue';
import { renderWithDefaults } from '@tests/unit/render-helpers';
import { anOnchainPoolModel } from './test-builders/pool.builders';

const mockPool = anOnchainPoolModel()
vi.spyOn(queries, 'queryPool').mockImplementation(async ()=> mockPool)

test('Renders the token composition details of the given pool', async () => {
  renderWithDefaults(Pool, {
    global: {
      mocks: {
        $route: {
          params: { id: '123456789' }
        }
      }
    }
  });

  await screen.findByText('Token');
  await screen.findByText('Weighted pool');
  await screen.findByText(mockPool.tokens[0].symbol);
  await screen.findByText(mockPool.tokens[1].symbol);
});
