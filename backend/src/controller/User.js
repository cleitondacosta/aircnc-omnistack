const UserModel = require('../model/User');
// index, show, store, update, destroy

module.exports = {
  async store(req, res) {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });

    if(!user) {
      const newUser = await UserModel.create({ email });
      return res.json(newUser);
    }
      else {
        return res.json(user);
      }
    },
};
