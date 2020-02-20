import express, {Request, Response} from 'express';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
app.use('/authentication', require('./controllers/authentication.crtl').default);
app.use('/webhooks', require('./controllers/webhooks.ctrl').default);

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Server is up');
});

const port = process.env.PORT;

console.log(`Listening on port: ${port}`);
app.listen(port);