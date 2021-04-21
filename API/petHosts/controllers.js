// Databases
const { PetHost, User, Review } = require("../../db/models");

// Fetch Pet Host
exports.fetchPetHost = async (petHostID, next) => {
  try {
    const petHost = await PetHost.findByPk(petHostID);
    return petHost;
  } catch (err) {
    next(err);
  }
};

// Create Pet Host Profile
exports.createPetHost = async (req, res, next) => {
  try {
    req.body.userId = req.user.id;
    const newPetHost = await PetHost.create(req.body);
    res.status(201).json(newPetHost);
  } catch (err) {
    next(err);
  }
};

// Update Profile
exports.updatePetHost = async (req, res, next) => {
  try {
    if (req.files) {
      req.body.image = `http://${req.get("host")}/media/${req.files.filesname}`;
    }
    const host = await PetHost.findOne({
      where: {
        userId: req.user.id,
      },
    });
    await host.update(req.body);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

// Delete Profile
exports.deletePetHost = async (req, res, next) => {
  try {
    const host = await PetHost.findOne({
      where: {
        userId: req.user.id,
      },
    });
    await host.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

// Average Rating
exports.averageReview = async (req, res, next) => {
  try {
    const host = await PetHost.findByPk(req.body.petHostId);

    const where = { where: { hostId: host.id } };
    const total = await Review.sum(`rating`, where);
    const count = await Review.count(where);

    const average = Math.round(total / count);

    res.json({ average });
  } catch (err) {
    next(err.message);
  }
};

// List Profile
exports.listPetHost = async (req, res, next) => {
  try {
    const petHosts = await PetHost.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(petHosts);
  } catch (err) {
    next(err);
  }
};
