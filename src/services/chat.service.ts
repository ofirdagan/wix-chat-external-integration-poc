import axios from 'axios';

export const sendMessage = (channelId: string, text: string, accessToken: string) => {
  try {
    axios.post(`https://www.wixapis.com/chat/v1/channels/${channelId}/messages`, {
      channelId,
      type: 'TEXT',
      payload: {
        text
      }
    }, {
      headers: {
        authorization: accessToken,
        'content-type': 'application/json'
      }
    });
  }
  catch (e) {
    console.log(`Error sending message ${e}`);
    throw e;
  }
};