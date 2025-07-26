const fs = require('fs');
const path = require('path');

const getTransactions = (req, res) => {
  const filePath = path.join(__dirname, '../transactions.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading transactions:', err);
      return res.status(500).json({ message: 'Failed to load transactions' });
    }

    const transactions = JSON.parse(data || '[]');
    res.status(200).json({
      total: transactions.length,
      transactions,
    });
  });
};

module.exports = { getTransactions };
