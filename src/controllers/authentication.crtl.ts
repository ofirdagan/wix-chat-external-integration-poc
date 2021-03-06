import express, {Request, Response} from 'express';
import {getInitialAppTokens} from '../services/authentication.service';
import {setAppTokens} from '../services/storage';
const router = express.Router();
const {BASE_URL, APP_ID, app_secret} = process.env;

router.get('/oauth-handshake', (req: Request, res: Response) => {
  const token = req.query.token;
  const redirectTo = `${BASE_URL}/authentication/redirect-after-oauth`;
  const redirectUrl = `https://www.wix.com/app-oauth-installation/consent?token=${token}&appId=${APP_ID}&redirectUrl=${redirectTo}`;
  res.redirect(redirectUrl);
});

router.get('/redirect-after-oauth', async (req: Request, res: Response) => {
  const {code, instanceId} = req.query;
  console.log(`app instanceId: ${instanceId}`);
  const tokens = await getInitialAppTokens(code, app_secret, APP_ID);
  console.log(`tokens: `, tokens);
  await setAppTokens(instanceId, tokens);
  res.redirect('https://www.wix.com/app-oauth-installation/token-received');
});


export default router;