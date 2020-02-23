import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import {getAccessToken} from '../services/authentication.service';
import jwt from 'jsonwebtoken';
import {getAppTokens} from '../services/storage';
import {sendMessage} from '../services/chat.service';
import {Guid} from '../types';
const router = express.Router();

const {APP_ID, app_secret} = process.env;

router.post('/on-message', bodyParser.text(), async (req: Request, res: Response) => {
  const body = req.body;
  jwt.verify(body, process.env.PUBLIC_KEY , function (err, decoded) {
    if (err) {
      console.log(`Error while verifying incoming webhook ${err}`);
    }
    const message = JSON.parse(decoded.data);
    const {eventType, instanceId} = message;
    console.log(`event type: ${eventType}`);
    console.log(`instance id: ${instanceId}`);

    const messageContent = JSON.parse(message.data);
    console.log(`messageContent: ${JSON.stringify(messageContent)}`);

    if (messageContent.direction === 'VisitorToBusiness') {
      const {channelId, payload} = messageContent;
      replyEcho(instanceId, payload.text, channelId);
    }
  });
  res.status(200).send('ok');
});

const replyEcho = async (instanceId: Guid, text: string, channelId: Guid) => {
  const appTokens = await getAppTokens(instanceId);
  const tokens = await getAccessToken(appTokens.refreshToken, app_secret, APP_ID);
  sendMessage(channelId, text, tokens.accessToken);
};

export default router;