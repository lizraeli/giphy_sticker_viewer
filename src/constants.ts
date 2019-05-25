const GIPHY_API_HOST = "https://api.giphy.com";
const STICKER_API_PATH = "/v1/stickers/search";

export const STICKER_API_BASE_URL =
  GIPHY_API_HOST +
  STICKER_API_PATH +
  `?api_key=${process.env.REACT_APP_GIPHY_API_KEY}`;
