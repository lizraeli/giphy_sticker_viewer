const STICKERS_LAMBDA_URL = ".netlify/functions/stickers?";
const { REACT_APP_LOCAL_GIPHY_API_KEY } = process.env;
const STICKERS_LOCAL_URL = REACT_APP_LOCAL_GIPHY_API_KEY
  ? `https://api.giphy.com/v1/stickers/search?api_key=${REACT_APP_LOCAL_GIPHY_API_KEY}&`
  : null;

// Use the local url if provided, otherwise call the lambda
export const BASE_STICKERS_URL = STICKERS_LOCAL_URL || STICKERS_LAMBDA_URL;
