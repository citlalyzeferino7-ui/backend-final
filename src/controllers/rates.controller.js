const axios = require('axios');

exports.getRates = async (req, res, next) => {
  try {
    const response = await axios.get(
      'https://api.exchangerate-api.com/v4/latest/USD'
    );

    res.json(response.data);

  } catch (error) {
    next(error);
  }
};