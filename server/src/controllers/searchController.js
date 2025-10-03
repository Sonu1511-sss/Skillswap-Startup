// server/src/controllers/searchController.js
import User from '../models/UserModel.js';
import SkillSwap from '../models/SkillSwapModel.js';
import Message from '../models/Message.js'; // You can add this later

/**
 * @desc    Search across multiple collections
 * @route   GET /api/search?q=<query>
 * @access  Private
 */
export const search = async (req, res) => {
  try {
    const { q } = req.query; // Get the search query from the URL (e.g., ?q=react)
    
    if (!q) {
      return res.status(400).json({ success: false, message: 'Search query is required.' });
    }

    // Create a case-insensitive regular expression from the query
    const regex = new RegExp(q, 'i');

    // Perform searches in parallel for better performance
    const [users, swaps] = await Promise.all([
      // Search for users by name, skills offered, or skills wanted
      User.find({
        $or: [
          { name: regex },
          { skillsOffered: regex },
          { skillsWanted: regex },
        ],
        _id: { $ne: req.user.id } // Exclude the logged-in user
      }).select('-password'),

      // Search for swaps by skill offered or skill wanted
      SkillSwap.find({
        participants: req.user.id, // Only search within the user's own swaps
        $or: [
          { skillOffered: regex },
          { skillWanted: regex },
        ]
      }).populate('requester receiver', 'name profilePicture'),
    ]);

    res.status(200).json({
      success: true,
      data: {
        users,
        swaps,
        // messages, // You can add message search results here
      },
    });

  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};