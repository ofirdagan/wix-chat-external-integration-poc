### How to run locally?

* Run `ngrok http 3000` to tunnel a real url to your localhost
* Add a `.env` file in the project root that has the following structure:
```$xslt
app_secret=<secret>
APP_ID=<app_id>
BASE_URL=<your ngrok url> for example: https://7fe51b63.ngrok.io
PORT=3000
DB_URL=a simple key value store end point
PUBLIC_KEY="the public key from the dev center"
```

* `npm i`
* `npm run start:dev`


