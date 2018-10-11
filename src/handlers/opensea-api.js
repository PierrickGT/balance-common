import axios from 'axios';
import {
  parseAccountUniqueTokens,
  parseAccountUniqueTokensTransactions,
} from './parsers';

const openseaApiKey = process.env.REACT_APP_OPENSEA_API_KEY || '';

/**
 * Build Opensea API Axios instance depending on the network used
 * @param  {String} [network='mainnet']
 * @return {AxiosInstance}
 */
const buildAxiosInstance = (network = 'mainnet') => {
  let baseURL = 'https://api.opensea.io/api/v1';

  if (network === 'rinkeby') {
    baseURL = `https://${network}-api.opensea.io/api/v1`;
  }

  return axios.create({
    baseURL,
    timeout: 30000, // 30 secs
    headers: {
      Accept: 'application/json',
      'X-API-KEY': openseaApiKey,
    },
  });
};

/**
 * @desc get opensea unique tokens
 * @param  {String}   [address='']
 * @param  {String}   [network='mainnet']
 * @return {Promise}
 */
export const apiGetAccountUniqueTokens = async (
  address = '',
  network = 'mainnet',
) => {
  const api = buildAxiosInstance(network);
  const data = await api.get(`/assets?owner=${address}`);
  const result = parseAccountUniqueTokens(data);
  return result;
};

/**
 * @desc get opensea unique tokens transactions
 * @param  {String}   [address='']
 * @param  {String}   [nativeCurrency='']
 * @param  {String}   [network='mainnet']
 * @return {Promise}
 */
export const apiGetAccountUniqueTokensTransactions = async (
  address = '',
  nativeCurrency = '',
  network = 'mainnet',
) => {
  const api = buildAxiosInstance(network);
  const data = await api.get(`/events?account_address=${address}`);
  const result = parseAccountUniqueTokensTransactions(data, nativeCurrency);
  return result;
};
