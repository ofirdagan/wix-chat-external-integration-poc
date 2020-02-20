import express, {Request, Response} from 'express';
import authenticationController from './controllers/authentication.crtl';

const app = express();
app.use('/authentication', authenticationController);

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Server is up');
});

const port = process.env.PORT;

console.log(`Listening on port: ${port}`);
app.listen(port);