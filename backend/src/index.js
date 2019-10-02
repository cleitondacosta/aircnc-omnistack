const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
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

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(
  __dirname, "..", "uploads"
)));
app.use(router);

app.listen(3333, () => {
  console.log('Listening...');
});
