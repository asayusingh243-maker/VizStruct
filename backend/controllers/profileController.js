const User = require("../models/User");
const LearnerProfile = require("../models/LearnerProfile");

const getProfile = async (req, res) => {
  try {
    const profile = await LearnerProfile.findOne({
      userId: req.user._id,
    }).lean();

    res.json({
      success: true,
      profile: {
        user: {
          id: req.user._id,
          fullName: req.user.fullName,
          email: req.user.email,
          level: req.user.level,
        },
        learnerProfile: profile,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load profile",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const {
      fullName,
      name,
      email,
      level,
      skillLevel,
      programmingLanguages,
      strengths,
      weaknesses,
      learningPreferences,
      interests,
      goals,
    } = req.body;

    const userUpdates = {};

    if (fullName !== undefined || name !== undefined) {
      userUpdates.fullName = String(fullName ?? name).trim();
    }

    if (email !== undefined) {
      userUpdates.email = String(email).trim().toLowerCase();
    }

    if (level !== undefined) {
      userUpdates.level = level;
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: userUpdates },
      { new: true, runValidators: true }
    ).select("-password");

    const profileUpdates = {};

    if (skillLevel !== undefined) profileUpdates.skillLevel = skillLevel;
    if (programmingLanguages !== undefined) {
      profileUpdates.programmingLanguages = programmingLanguages;
    }
    if (strengths !== undefined) profileUpdates.strengths = strengths;
    if (weaknesses !== undefined) profileUpdates.weaknesses = weaknesses;
    if (learningPreferences !== undefined) {
      profileUpdates.learningPreferences = learningPreferences;
    }
    if (interests !== undefined) profileUpdates.interests = interests;
    if (goals !== undefined) profileUpdates.goals = goals;

    const learnerProfile = await LearnerProfile.findOneAndUpdate(
      { userId: req.user._id },
      {
        $set: profileUpdates,
        $setOnInsert: { userId: req.user._id },
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
      }
    );

    res.json({
      success: true,
      message: "Profile updated successfully",
      profile: {
        user,
        learnerProfile,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "That email is already in use",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
