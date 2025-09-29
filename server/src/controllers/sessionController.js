// server/src/controllers/sessionController.js

import Session from '../models/Session.js';
import SkillSwap from '../models/SkillSwapModel.js';
import User from '../models/UserModel.js';


/**
 * @desc    Create a new session for an accepted skill swap
 * @route   POST /api/sessions
 * @access  Private
 */
export const createSession = async (req, res) => {
  try {
    const { swapId, title, scheduledAt, durationInMinutes, meetingLink } = req.body;
    const userId = req.user.id;

    const swap = await SkillSwap.findById(swapId);
    if (!swap || swap.status !== 'accepted') {
      return res.status(400).json({ success: false, message: 'Sessions can only be created for accepted swaps.' });
    }

    // Authorization: Check if the logged-in user is part of the swap
    const isParticipant = swap.requester.toString() === userId || swap.receiver.toString() === userId;
    if (!isParticipant) {
      return res.status(403).json({ success: false, message: 'You are not authorized to schedule a session for this swap.' });
    }

    const newSession = await Session.create({
      swapId,
      participants: [swap.requester, swap.receiver],
      title,
      scheduledAt,
      durationInMinutes,
      meetingLink,
    });

    const populatedSession = await Session.findById(newSession._id)
      .populate({
        path: 'swapId',
        populate: [
          { path: 'requester', select: 'name profilePicture' },
          { path: 'receiver', select: 'name profilePicture' }
        ]
      });

    res.status(201).json({ success: true, data: populatedSession });

  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

/**
 * @desc    Get all sessions for the logged-in user (can be filtered by date)
 * @route   GET /api/sessions/me
 * @access  Private
 */
export const getMySessions = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Allow filtering by date range for the calendar view
    // Example: GET /api/sessions/me?startDate=2025-09-01&endDate=2025-09-30
    const { startDate, endDate } = req.query;
    
    let filter = { participants: userId };

    if (startDate && endDate) {
      filter.scheduledAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const sessions = await Session.find(filter)
      .populate({
        path: 'swapId',
        populate: [
          { path: 'requester', select: 'name profilePicture' },
          { path: 'receiver', select: 'name profilePicture' }
        ]
      })
      .sort({ scheduledAt: 'asc' });

    res.status(200).json({ success: true, count: sessions.length, data: sessions });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};


export const updateSession = async (req, res) => {
  try {
    const { status } = req.body;
    const sessionId = req.params.id;
    const userId = req.user.id;

    if (status !== 'completed' && status !== 'cancelled') {
      return res.status(400).json({ success: false, message: 'Invalid status.' });
    }

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ success: false, message: 'Session not found.' });
    }

    const isParticipant = session.participants.includes(userId);
    if (!isParticipant) {
      return res.status(403).json({ success: false, message: 'You are not authorized to update this session.' });
    }
    
    if (session.status !== 'scheduled') {
        return res.status(400).json({ success: false, message: `Session is already ${session.status}.` });
    }

    session.status = status;
    await session.save(); // Save the changes to the database

    // --- THIS IS THE FIX ---
    // After saving, find the session again and populate it fully before sending the response
    const populatedSession = await Session.findById(sessionId)
      .populate({
        path: 'swapId',
        populate: [
          { path: 'requester', select: 'name profilePicture' },
          { path: 'receiver', select: 'name profilePicture' }
        ]
      });

    // If the session is completed, update the learning hours for both users
    if (status === 'completed' && session.durationInMinutes > 0) {
      const hours = session.durationInMinutes / 60;
      await User.updateMany(
        { _id: { $in: session.participants } },
        { $inc: { learningHours: hours } }
      );
    }

    // Send the fully populated session back to the frontend
    res.status(200).json({ success: true, data: populatedSession, message: `Session marked as ${status}` });
  } catch (error) {
    console.error("Error updating session:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};


export const deleteSession = async (req, res) => {
  try {
    const sessionId = req.params.id;
    const userId = req.user.id;

    // 1. Find the session to ensure it exists
    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ success: false, message: 'Session not found.' });
    }

    // 2. Authorization: Check if the logged-in user is a participant
    const isParticipant = session.participants.includes(userId);
    if (!isParticipant) {
      return res.status(403).json({ success: false, message: 'You are not authorized to delete this session.' });
    }

    // 3. Delete the session
    await Session.findByIdAndDelete(sessionId);

    // 4. Send a success response
    res.status(200).json({ success: true, message: 'Session deleted successfully.' });

  } catch (error) {
    console.error("Error deleting session:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};