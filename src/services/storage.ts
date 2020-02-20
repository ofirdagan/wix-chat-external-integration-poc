import {Tokens} from './authentication.service';
import axios from 'axios';

export const setAppTokens = async (tokens: Tokens) => {
  try {
    await axios.post('https://ofirdagan.wixsite.com/db-test/_functions/appTokens/', tokens);
  } catch (e) {
    console.log(`Error setting tokens`, e);
    throw e;
  }
};

export const getAppTokens = async (): Promise<Tokens> => {
  try {
    const result = await axios.get('https://ofirdagan.wixsite.com/db-test/_functions/appTokens/');
    return result.data as Tokens;
  } catch (e) {
    console.log(`Error getting tokens`, e);
    throw e;
  }
};