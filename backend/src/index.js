const express = require('express');
const mongoose = require('mongoose');
const router = require('./router');

const app = express();

const dbUrl = 'mongodb+srv://'
  + 'omnistack:omnistack@omnistack-sxidu.mongodb.net/'
  + 'semana09?retryWrites=true&w=majority';

const dbConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(dbUrl, dbConfig);

app.use(express.json());
app.use(router);

app.listen(3333, () => {
  console.log('Listening...');
});
