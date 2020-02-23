import {Tokens} from './authentication.service';
import axios from 'axios';
import {Guid} from '../types';
const {DB_URL} = process.env;

export const setAppTokens = async (instanceId: Guid, tokens: Tokens) => {
  try {
    await axios.post(DB_URL, {instanceId, ...tokens});
  } catch (e) {
    console.log(`Error setting tokens`, e);
    throw e;
  }
};

export const getAppTokens = async (instanceId: Guid): Promise<Tokens> => {
  try {
    const result = await axios.get(`${DB_URL}/${instanceId}`);
    return result.data as Tokens;
  } catch (e) {
    console.log(`Error getting tokens`, e);
    throw e;
  }
};