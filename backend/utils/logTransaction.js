const fs = require('fs');
const path = require('path');

const logTransaction = (transaction) => {
  const filePath = path.join(__dirname, '../transactions.json');
  const data = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : [];
  data.push(transaction);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

module.exports = logTransaction;
