import {BASE_URL} from '../constants';
import express, {Request, Response} from 'express';
import {getInitialAppTokens} from '../services/authentication.service';
const router = express.Router();

router.get('/oauth-handshake', (req: Request, res: Response) => {
  const token = req.query.token;
  const redirectTo = `${BASE_URL}/authentication/redirect-after-oauth`;
  const redirectUrl = `https://www.wix.com/app-oauth-installation/consent?token=${token}&appId=${process.env.APP_ID}&redirectUrl=${redirectTo}`;
  res.redirect(redirectUrl);
});

router.get('/redirect-after-oauth', async (req: Request, res: Response) => {
  const {code, instanceId} = req.query;
  console.log(`app instanceId: ${instanceId}`);
  const tokens = await getInitialAppTokens(code, process.env.app_secret, process.env.APP_ID);
  console.log(`tokens: `, tokens);
  res.redirect('https://www.wix.com/app-oauth-installation/token-received');
});


export default router;