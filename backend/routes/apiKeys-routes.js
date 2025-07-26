const express = require("express");
const { getKeys, addKeys, deleteKeys } = require("../controllers/apiKeys-controller");
const router = express.Router();



// GET all API keys
router.get("/",getKeys);

// POST add a new API key
router.post("/", addKeys);

// DELETE a key
router.delete("/:id", deleteKeys);

module.exports = router;
