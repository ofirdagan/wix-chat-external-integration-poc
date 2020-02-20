import {APP_ID} from '../constants';
import axios from 'axios';

export const getInitialAppTokens = async (code: string, appSecret: string): Promise<Tokens> => {
  const tokens = await axios.post('https://www.wix.com/oauth/access', {
    grant_type: 'authorization_code',
    client_id: APP_ID,
    client_secret: appSecret,
    code
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return {
    refreshToken: tokens.data.refresh_token,
    accessToken: tokens.data.access_token
  };
};

export const getAccessToken = async (refreshToken: string, appSecret: string): Promise<Tokens> => {
  const tokens = await axios.post('https://www.wix.com/oauth/access', {
    grant_type: 'refresh_token',
    client_id: APP_ID,
    client_secret: appSecret,
    refresh_token: refreshToken
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return {
    refreshToken: tokens.data.refresh_token,
    accessToken: tokens.data.access_token
  };
};


type AccessToken = string;
export interface Tokens {
  refreshToken: string,
  accessToken: string
}
