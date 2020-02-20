import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import {getAccessToken} from '../services/authentication.service';
import jwt from 'jsonwebtoken';
import {getAppTokens} from '../services/storage';
import {sendMessage} from '../services/chat.service';
const router = express.Router();

const {APP_ID, app_secret} = process.env;

router.post('/on-message', bodyParser.text(), async (req: Request, res: Response) => {
  const body = req.body;
  jwt.verify(body, process.env.PUBLIC_KEY , function (err, decoded) {
    if (err) {
      console.log(`Error while verifying incoming webhook ${err}`);
    }
    const message = JSON.parse(decoded.data);
    console.log(`event type: ${message.eventType}`);
    console.log(`instance id: ${message.instanceId}`);

    const messageContent = JSON.parse(message.data);
    console.log(`messageContent: ${JSON.stringify(messageContent)}`);

    if (messageContent.direction === 'VisitorToBusiness') {
      const {channelId, payload} = messageContent;
      replyEcho(payload.text, channelId);
    }
  });
  res.status(200).send('ok');
});

const replyEcho = async (text: string, channelId: string) => {
  const appTokens = await getAppTokens();
  const tokens = await getAccessToken(appTokens.refreshToken, app_secret, APP_ID);
  sendMessage(channelId, text, tokens.accessToken);
};

export default router;