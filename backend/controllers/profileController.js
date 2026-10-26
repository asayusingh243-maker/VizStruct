

const LearnerProfile = require("../models/LearnerProfile");

const createOrUpdateProfile = async (req, res) => {
  try {
    const {
      skillLevel,
      programmingLanguages,
      strengths,
      weaknesses,
      learningPreferences,
      interests,
      goals,
    } = req.body;

    const profile = await LearnerProfile.findOneAndUpdate(
      { userId: req.user._id },
      {
        userId: req.user._id,
        skillLevel,
        programmingLanguages,
        strengths,
        weaknesses,
        learningPreferences,
        interests,
        goals,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Learner profile saved successfully",
      profile,
    });
  } catch (error) {
    console.error("Profile save error:", error.message);

    res.status(500).json({
      message: "Server error while saving learner profile",
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const profile = await LearnerProfile.findOne({
      userId: req.user._id,
    });

    if (!profile) {
      return res.status(404).json({
        message: "Learner profile not found",
      });
    }

    res.status(200).json({
      profile,
    });
  } catch (error) {
    console.error("Profile fetch error:", error.message);

    res.status(500).json({
      message: "Server error while fetching learner profile",
    });
  }
};

module.exports = {
  createOrUpdateProfile,
  getProfile,
};