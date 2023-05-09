# twin-day-2023
The website for SEC Twin Day 2023.

### Running locally
Make sure you have a compatible version of Node installed.

This project uses the same service account as [`hall-monitor`](https://github.com/gunnsec/hall-monitor), so go there for
information about creating a google sheets service account and downloading a credentials file. You should have a `keys.json`
that looks something like this:
```json
{
  "type": "service_account",
  "project_id": "...",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n...\n...\n...\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "...",
  "client_id": "...",
  "auth_uri": "...",
  "token_uri": "...",
  "auth_provider_x509_cert_url": "...",
  "client_x509_cert_url": "..."
}
```
For this app, instead of using a `keyFile` to authenticate, credentials are passed via the `credentials` property from
environment variables. To define these variables locally, create a `.env.local` file in the root directory that declares
your `CLIENT_EMAIL`, `PRIVATE_KEY`, and the ID of the app's backing spreadsheet. Your `.env.local` file should look
something like this:
```
CLIENT_EMAIL=...
PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n...\n...\n...\n...\n-----END PRIVATE KEY-----\n
SPREADSHEET_ID=...
```
For the `PRIVATE_KEY`, make sure that the `\n` newline characters are kept as `\n` and not converted to actual newlines,
or the `.env` will not be parsed correctly.

After defining environment variables, run `npm install` to install dependencies and `npm run dev` to start the dev server
on `localhost:3000`.

### Deploying
Every push to `main` automatically rebuilds and deploys the site to Vercel with GitHub actions, using [the configuration described here](https://gist.github.com/ky28059/1c9af929a9030105da8cf00006b50484).
To set environment variables in the workflow, `CLIENT_EMAIL`, `PRIVATE_KEY`, and `TWIN_DAY_2023_SPREADSHEET_ID` are kept as
organization secrets.

![image](https://user-images.githubusercontent.com/60120929/180081903-f2d2215d-a572-4a33-a38e-0954f6bc250b.png)
