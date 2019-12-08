require("dotenv").config();
const axios = require("axios");

const GIPHY_API_HOST = "https://api.giphy.com";
const STICKER_API_PATH = "/v1/stickers/search";

const STICKER_API_BASE_URL =
  GIPHY_API_HOST +
  STICKER_API_PATH +
  `?api_key=${process.env.GIPHY_API_KEY}`;

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
 * @returns {void}
 */
const handler = async event => {
  try {
    const { q = "", offset = 0 } = event.queryStringParameters;

    const stickers = await axios.get(
      STICKER_API_BASE_URL + `&q=${q}&offset=${offset}`
    );

    return {
      statusCode: 200,
      body: JSON.stringify(stickers.data)
    };
  } catch (error) {
    if (error.response) {
      const { status, data = {} } = error.response;
      const { message = "error fetching stickers" } = data;
      return { statusCode: status, body: message };
    } else if (error.request) {
      return { statusCode: 500, body: "no response received from giphy api" };
    }
    return { statusCode: 500, body: error.message };
  }
};

exports.handler = handler;
