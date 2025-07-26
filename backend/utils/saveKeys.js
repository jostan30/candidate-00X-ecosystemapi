const fs = require("fs");
const path = require("path");
const keysFile = path.join(__dirname, "../config/apiKeys.json");

const saveKeys = (keys) => {
  fs.writeFileSync(keysFile, JSON.stringify(keys, null, 2));
};

module.exports = saveKeys;
