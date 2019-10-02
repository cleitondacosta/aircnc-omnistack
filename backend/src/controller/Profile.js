const SpotModel = require('../model/Spot');

module.exports = {
  async show(req, res) {
    const { user_id } = req.headers;

    console.log(
      `Request to list all Spots created by "${user_id}".`
    );
    const spots = await SpotModel.find({ user: user_id });

    return res.json(spots);
  },
}
