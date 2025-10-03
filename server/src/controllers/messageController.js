import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';

// -------------------------Get all conversations for the logged-in user---------------------------
export const getConversations = async (req, res) => {
  try {
    const userId = req.user.id;
    const conversations = await Conversation.find({ participants: userId })
      .populate('participants', 'name profilePicture')
      .sort({ lastMessageAt: -1 });
    res.status(200).json({ success: true, data: conversations });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

//--------------------------Get all messages for a specific conversation----------------------------
export const getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const messages = await Message.find({ conversationId }).populate('senderId', 'name profilePicture');
        res.status(200).json({ success: true, data: messages });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};