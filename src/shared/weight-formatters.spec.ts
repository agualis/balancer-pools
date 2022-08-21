import { toPercentage } from './weight-formatters';

describe('formats weight as percentage', () => {
  test('when the input is a valid string', () => {
    const weightFromSubgraph = '0.21';
    expect(toPercentage(weightFromSubgraph)).toBe('21%');
  });

  test('when the input is null', () => {
    const weightFromSubgraph = null;
    expect(toPercentage(weightFromSubgraph)).toBe('-');
  });

  test('when the input is a number', () => {
    const normalizedWeightFromChain = Number('0.45');
    expect(toPercentage(normalizedWeightFromChain)).toBe('45%');
  });
});
