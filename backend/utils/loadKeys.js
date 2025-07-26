const fs = require("fs");
const path = require("path");
const keysFile = path.join(__dirname, "../config/apiKeys.json");


const loadKeys = () => {
  const raw = fs.readFileSync(keysFile);
  return JSON.parse(raw);
};

module.exports = loadKeys;