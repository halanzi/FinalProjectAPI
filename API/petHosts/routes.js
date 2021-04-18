// Dependencies
const e = require("express");
const express = require("express");
const router = express.Router();
const passport = require("passport");

// Controllers
const {
  createPetHost,
  fetchPetHost,
  updatePetHost,
  deletePetHost,
  listPetHost,
} = require("./controllers");

// Param middleware
router.param("petHostId", async (req, res, next, petHostId) => {
  const petHost = await fetchPetHost(petHostId, next);
  if (petHost) {
    req.petHost = petHost;
    next();
  } else {
    const err = new Error("Pet Host Not Found");
    err.status = 404;
    next(err);
  }
});

// Create Pet Host Profile
router.post("/createPetHost", createPetHost);
// Update Pet Host Profile
router.put("/:petHostId", updatePetHost);
// Delete Pet Host Profile
router.delete("/:petHostId", deletePetHost);
// List Pet Hosts
router.get("/", listPetHost);

module.exports = router;