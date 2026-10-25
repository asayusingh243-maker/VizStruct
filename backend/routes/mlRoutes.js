
const express = require("express");
const { getHealth, predictLearner } = require("../controllers/mlController");

const router = express.Router();

router.get("/health", getHealth);
router.post("/predict", predictLearner);

module.exports = router;
