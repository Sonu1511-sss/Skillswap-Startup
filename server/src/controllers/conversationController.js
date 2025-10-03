// server/src/controllers/conversationController.js

import Conversation from '../models/Conversation.js';

//---------------------- conversations for the logged-in user------------------------------
export const getConversations = async (req, res) => {
  try {
    const userId = req.user.id;
    const conversations = await Conversation.find({ participants: userId })
      .populate('participants', 'name profilePicture email')
      .sort({ updatedAt: -1 });
    res.status(200).json({ success: true, data: conversations });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};


//------------------------- Find an existing conversation ||create a new one---------------
export const startOrGetConversation = async (req, res) => {
    try {
        const loggedInUserId = req.user.id;
        const { otherUserId } = req.body;

        if (!otherUserId) {
            return res.status(400).json({ success: false, message: "Other user ID is required." });
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [loggedInUserId, otherUserId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [loggedInUserId, otherUserId]
            });
        }
        
        const populatedConversation = await Conversation.findById(conversation._id)
            .populate('participants', 'name profilePicture email');

        res.status(200).json({ success: true, data: populatedConversation });

    } catch (error) {
        console.error("Error starting conversation:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

//---------------------------- MaerkAsRead---------------------------
export const markAsRead = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const userId = req.user.id;

        const conversation = await Conversation.findById(conversationId);
        if (conversation) {
            conversation.unreadCounts.set(userId, 0);
            await conversation.save();
        }
        res.status(200).json({ success: true, message: "Marked as read." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};