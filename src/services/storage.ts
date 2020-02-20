import {Tokens} from './authentication.service';
import axios from 'axios';
const {DB_URL} = process.env;

export const setAppTokens = async (tokens: Tokens) => {
  try {
    await axios.post(DB_URL, tokens);
  } catch (e) {
    console.log(`Error setting tokens`, e);
    throw e;
  }
};

export const getAppTokens = async (): Promise<Tokens> => {
  try {
    const result = await axios.get(DB_URL);
    return result.data as Tokens;
  } catch (e) {
    console.log(`Error getting tokens`, e);
    throw e;
  }
};