const mongoose = require('mongoose');

module.exports = {
  // onConnected is a callback function that is called 
  // when the mongoose 'open' event occurs 
  async connect(dbUrl, onConnected) {
    const dbConfig = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    console.log("Connecting to database ...");

    mongoose.connect(dbUrl, dbConfig)
      .catch(err => console.error(err));

    const connection = mongoose.connection;

    connection.on('open', () => {
      console.log('Connection established.');
      onConnected();
    });

    connection.on('error', err => { 
      throw err;
    });
  },
}
