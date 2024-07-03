// utils/errorHandler.js
module.exports = (res, error) => {
    res.status(500).send({ error: error.message });
  };
  