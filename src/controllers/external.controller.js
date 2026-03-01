const axios = require('axios');

async function getRates(req, res, next) {
  try {

    const response = await axios.get(
      'https://api.exchangerate-api.com/v4/latest/USD'
    );

    res.json(response.data);

  } catch (error) {
    next(error);
  }
}

module.exports = { getRates };