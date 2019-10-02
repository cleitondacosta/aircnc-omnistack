const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

function configureAPI() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/files', express.static(path.resolve(
    __dirname, "..", "uploads"
  )));
  app.use(routes);

  return app;
}

module.exports = {
  init(port) {
    const app = configureAPI();

    app.listen(port, () => {
      console.log(`API listening on port ${port}.`);
    });
  },
}
