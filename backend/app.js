require('dotenv').config(); 

const express = require('express');
const app = express();
const crmRouter = require('./routes/crm-router');
const transactionRouter = require('./routes/transaction-router');
const apiKeysRouter = require('./routes/apiKeys-routes');

const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:3000', 'https://candidate-00-x-ecosystemapi.vercel.app', 'https://candidate-00-x-ecosystemapi-i8fxq19jn-jostan30s-projects.vercel.app'],
  credentials: true,
  optionsSuccessStatus: 200
}));


app.use(express.json());

app.use('/api', crmRouter);
app.use('/api', transactionRouter);
app.use('/api/keys', apiKeysRouter);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const PORT = process.env.PORT || 3000; // it will work even if the env isnt set || fallback port

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
