import { toUSD, toTokenAmount} from '@/shared/money-formatters'

test('format bignumber string (from subgraph) into USD', ()=> {
  const totalLiquidityFromSubgraph = '255347714.2471456930957092319273296'
  expect(toUSD(totalLiquidityFromSubgraph)).toBe('$255,347,714')
})

test('format bignumber string from chain into token units', ()=> {
  expect(toTokenAmount('0x0e5de3')).toBe('941,539.00')
})