// server/src/controllers/sessionController.js

import Session from '../models/Session.js';
import SkillSwap from '../models/SkillSwapModel.js';
import User from '../models/UserModel.js';

//-------------------------- CreateSession--------------------------------

export const createSession = async (req, res) => {
  try {
    const { swapId, title, scheduledAt, durationInMinutes, meetingLink } = req.body;
    const userId = req.user.id;

    const swap = await SkillSwap.findById(swapId);
    if (!swap || swap.status !== 'accepted') {
      return res.status(400).json({ success: false, message: 'Sessions can only be created for accepted swaps.' });
    }

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


//-------------------------- getMySession----------------------------------

export const getMySessions = async (req, res) => {
  try {
    const userId = req.user.id;
    
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

//-------------------------- updateSession --------------------------------

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
    await session.save(); 
    const populatedSession = await Session.findById(sessionId)
      .populate({
        path: 'swapId',
        populate: [
          { path: 'requester', select: 'name profilePicture' },
          { path: 'receiver', select: 'name profilePicture' }
        ]
      });

    if (status === 'completed' && session.durationInMinutes > 0) {
      const hours = session.durationInMinutes / 60;
      await User.updateMany(
        { _id: { $in: session.participants } },
        { $inc: { learningHours: hours } }
      );
    }

    res.status(200).json({ success: true, data: populatedSession, message: `Session marked as ${status}` });
  } catch (error) {
    console.error("Error updating session:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};


//-------------------------- deleteSession --------------------------------

export const deleteSession = async (req, res) => {
  try {
    const sessionId = req.params.id;
    const userId = req.user.id;

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ success: false, message: 'Session not found.' });
    }

    const isParticipant = session.participants.includes(userId);
    if (!isParticipant) {
      return res.status(403).json({ success: false, message: 'You are not authorized to delete this session.' });
    }

    await Session.findByIdAndDelete(sessionId);

    res.status(200).json({ success: true, message: 'Session deleted successfully.' });

  } catch (error) {
    console.error("Error deleting session:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};