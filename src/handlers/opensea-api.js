import axios from 'axios';
import {
  parseAccountUniqueTokens,
  parseAccountUniqueTokensTransactions,
} from './parsers';

const openseaApiKey = process.env.REACT_APP_OPENSEA_API_KEY || '';

/**
 * Configuration for opensea api
 * @type axios instance
 */
const api = axios.create({
  baseURL: 'https://rinkeby-api.opensea.io/api/v1',
  timeout: 30000, // 30 secs
  headers: {
    Accept: 'application/json',
    'X-API-KEY': openseaApiKey,
  },
});

/**
 * @desc get opensea unique tokens
 * @param  {String}   [address='']
 * @return {Promise}
 */
export const apiGetAccountUniqueTokens = async (address = '') => {
  const data = await api.get(`/assets?owner=${address}`);
  const result = parseAccountUniqueTokens(data);
  return result;
};

/**
 * @desc get opensea unique tokens transactions
 * @param  {String}   [address='']
 * @param  {String}   [nativeCurrency='']
 * @return {Promise}
 */
export const apiGetAccountUniqueTokensTransactions = async (
  address = '',
  nativeCurrency = '',
) => {
  const data = await api.get(`/events?account_address=${address}`);
  const result = parseAccountUniqueTokensTransactions(data, nativeCurrency);
  return result;
};
