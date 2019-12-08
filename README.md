[![Netlify Status](https://api.netlify.com/api/v1/badges/2442892a-1996-4c4b-bdd7-d94281143f57/deploy-status)](https://app.netlify.com/sites/giphy-stickers/deploys)

# Giphy Stickers Viewer


A giphy stickers viewer developed with react and typescript, utilizing react hooks.

Additionaly, this project uses the following libraries: 

- [grommet](https://v2.grommet.io/)
- [styled-components](https://www.styled-components.com/)
- [react-loader-spinner](https://www.npmjs.com/package/react-loader-spinner)
- [react-progressive-image](https://github.com/FormidableLabs/react-progressive-image)
- [react-scroll](https://github.com/fisshy/react-scroll)
- [react-tostify](https://github.com/fkhadra/react-toastify)
- [react-helmet](https://github.com/nfl/react-helmet)

## Setup

This project uses a [Netlify Labmda function](https://docs.netlify.com/functions/overview/) to communicate with the giphy API. When developing locally, the frontend app can be configured to call the API directly - Add an `.env` file in the root folder, with the giphy api key:

```
REACT_APP_GIPHY_API_KEY=[your key here]
```

Then you can install and run the app.

```
yarn
yarn start
```

### Developing locally with the Lambda Function

Running the serverless function locally is a bit more involved.
The function is defined in the `lambda/stickers/` folder and is deployed along with the frotend app. Rather than calling the Giphy API directly and exposing the API key, a GET request is made to `".netlify/functions/stickers"`, which in turn makes a request to the Giphy API and returns the result.

To run _both_ app and Lambda function locally, the following need to be installed and set up:
- [Netlify cli](https://docs.netlify.com/cli/get-started/#installation). 
- [Netlify dev](https://github.com/netlify/cli/blob/master/docs/netlify-dev.md)

With the above set up locally, rename the API key you set in the `env` file to `GIPHY_API_KEY`:

```
GIPHY_API_KEY=[your key here]
```

Once you have installed the dependencies with `yarn`, you will also need to run the `postinstall` script to compile the Lambda:

```
yarn
yarn postinstall
```

With the above complete, you can start both the app _and_ the labmda with a single command:

```
netlify develop
```


