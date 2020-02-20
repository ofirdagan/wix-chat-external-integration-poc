import express from 'express';
import authenticationController from './controllers/authentication.crtl';

const app = express();
app.use('/authentication', authenticationController);

const port = 3000;
console.log(`Listening on port: ${port}`);
app.listen(port);