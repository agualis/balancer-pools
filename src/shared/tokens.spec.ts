import { tokenByAddress } from './tokens';

test('finds token by address', ()=> {
  const wstETHAddress = '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0';
  expect(tokenByAddress(wstETHAddress).symbol).toBe('wstETH');
})

test('returns unknown token when token address is not found in the token list', ()=> {
  const missingAddress = '0x764a06fDdcE6b8895b6E7F9ba2874711BF31edEa';
  expect(tokenByAddress(missingAddress).symbol).toBe('???')

})

test('throws error when token address is invalid', ()=> {
  const invalidAddress = '0x123456';
  expect(()=> tokenByAddress(invalidAddress).symbol).toThrowErrorMatchingInlineSnapshot(
    '"invalid address (argument=\\"address\\", value=\\"0x123456\\", code=INVALID_ARGUMENT, version=address/5.6.1)"'
  );
})
