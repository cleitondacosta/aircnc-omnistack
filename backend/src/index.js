const database = require('./database');
const api = require('./api');

const dbUrl = 'mongodb+srv://'
  + 'omnistack:omnistack@omnistack-sxidu.mongodb.net/'
  + 'semana09?retryWrites=true&w=majority';

database.connect(dbUrl, () => api.init(3333));
