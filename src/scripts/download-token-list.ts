
import fs from 'fs';
import axios from 'axios';
import prettier from 'prettier';

console.log('⬇️  Downloading token list...');
const balancerTokenListURL = 'https://raw.githubusercontent.com/balancer-labs/assets/master/generated/listed.tokenlist.json'
const tokenListJson = await axios.get(balancerTokenListURL);

const MAINNET = 1;
const mainNetTokens = tokenListJson.data.tokens.filter((token: { chainId: number; }) => token.chainId === MAINNET);

const assetDirPath = './src/assets/data/'
const tokenListFilePath = `${assetDirPath}mainnet-tokens.json`

fs.createWriteStream('token-list.json');
// eslint-disable-next-line security/detect-non-literal-fs-filename
fs.writeFileSync(tokenListFilePath,
  prettier.format(JSON.stringify(mainNetTokens), {parser: 'json'})
)

console.log(`✅ Token list json downloaded in ${tokenListFilePath}`);