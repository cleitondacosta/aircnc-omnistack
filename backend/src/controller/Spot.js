const SpotModel = require('../model/Spot');
const UserModel = require('../model/User');

module.exports = {
  async index(req, res) {
    const { tech } = req.query;

    const spots = await SpotModel.find(
      { techs: tech }
    );

    return res.json(spots);
  },

  async store(req, res) {
    const { filename } = req.file;
    const { company, techs, price } = req.body;
    const { user_id } = req.headers;

    const user = await UserModel.findById(user_id);

    if(!user)
      return res.status(400).json(
        { error: 'User does not exists.' }
      );

    const spot = await SpotModel.create({
      user: user_id,
      thumbnail: filename,
      company,
      techs: techs.split(',').map(tech => tech.trim()),
      price
    });

    return res.json(spot);
  },
}
