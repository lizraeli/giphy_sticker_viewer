const axios = require("axios");

const GIPHY_API_HOST = "https://api.giphy.com";
const STICKER_API_PATH = "/v1/stickers/search";

const STICKER_API_BASE_URL =
  GIPHY_API_HOST +
  STICKER_API_PATH +
  `?api_key=${process.env.REACT_APP_GIPHY_API_KEY}`;

/**
 * @typedef LambdaEvent
 * @property {string} path
 * @property {string} httpMethod
 * @property {Object} headers
 * @property {{[key: string]: string}} queryStringParameters
 * @property {string} body
 * @property {boolean} isBase64Encoded
 */

/**
 * @param {LambdaEvent} event
 * @param {any} context
 * @returns {void}
 */
const handler = async event => {
  try {
    const { q, offset = 0 } = event.queryStringParameters;
    const stickers = await axios.get(
      STICKER_API_BASE_URL + `&q=${q}&offset=${offset}`
    );

    return {
      statusCode: 200,
      body: JSON.stringify(stickers.data)
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};

exports.handler = handler;
