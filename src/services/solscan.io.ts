import axios from 'axios';

export const getTokenMetadataByAddress = async (tokenAddress = '') =>
  axios.get(`https://api.solscan.io/account?address=${tokenAddress}`);
