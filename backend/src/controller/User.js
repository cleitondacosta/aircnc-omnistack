const UserModel = require('../model/User');
// index, show, store, update, destroy

module.exports = {
  async store(req, res) {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });

    if(!user) {
      const newUser = await UserModel.create({ email });

      console.log(`Created new user for: "${email}".`);
      
      return res.json(newUser);
    }
      else {
        console.log(`User "${email}" already exists.`);
        return res.json(user);
      }
    },
};
