const validApiKeys = require('../config/apiKeys.json');

const verifyApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) return res.status(401).json({ message: 'Missing API key' });

  const isValid = Object.values(validApiKeys).includes(apiKey);
  if (!isValid) return res.status(403).json({ message: 'Invalid API key' });

  next();
};

module.exports = verifyApiKey;
