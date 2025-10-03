// server/src/services/achievementService.js

import User from '../models/UserModel.js';
import { achievementsList } from '../config/achievements.js';

// This function checks a specific rule and awards an achievement if met
const checkAndAward = async (user, achievement) => {
  // Check if user already has this achievement
  const alreadyUnlocked = user.unlockedAchievements.some(a => a.achievementId === achievement.id);
  if (alreadyUnlocked) {
    return; // Do nothing if already earned
  }

  // Check the specific rule for this achievement
  let ruleMet = false;
  switch (achievement.id) {
    case 'FIRST_EXCHANGE':
      if (user.swapsCompleted >= 1) ruleMet = true;
      break;
    case 'COMMUNITY_HELPER':
      if (user.swapsCompleted >= 5) ruleMet = true;
      break;
    // Add more cases for other achievements here
  }

  // If the rule is met, award the achievement
  if (ruleMet) {
    user.unlockedAchievements.push({ achievementId: achievement.id });
    user.points += achievement.points;
    console.log(`Awarded achievement '${achievement.title}' to user ${user.name}`);
  }
};

// Main function to check all achievements for a user
export const checkAchievements = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) return;

    // Check every achievement in our master list
    for (const achievementKey in achievementsList) {
      await checkAndAward(user, achievementsList[achievementKey]);
    }
    
    // You can add logic here to update the user's level based on their new points total
    // For example: if (user.points > 1000 && user.level < 2) { user.level = 2; }

    await user.save(); // Save all changes
  } catch (error) {
    console.error(`Error checking achievements for user ${userId}:`, error);
  }
};