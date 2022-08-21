import Pools from '@/pages/pools/Pools.vue';
import { screen } from '@testing-library/vue';
import { renderWithDefaults } from '@tests/unit/render-helpers';

test('Renders list of paginated tokens', async () => {
  renderWithDefaults(Pools);

  await screen.findByText('Investment pools');
  await screen.findByText('Tokens');
  // composition of first mockFirstPoolsPage (from MSW handlers)
  await screen.findByText('BAL 80% WETH 20%');
});
