// server/src/controllers/skillSwapController.js

import SkillSwap from '../models/SkillSwapModel.js';
import User from '../models/UserModel.js';

//----------------------- Create new Swap loged in user , GET /api/swaps,  Private  -----------------------

export const createSwapRequest = async (req, res) => {
  try {
    const { receiverId, skillOffered, skillWanted, message, preferredTime } = req.body;
    const requesterId = req.user.id;      // Get the logged-in user's ID from authMiddleware


    // --------- Validation ------
    if (!receiverId || !skillOffered || !skillWanted || !message) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
    }

    // A user cannot send a swap request to themselves
    if (requesterId === receiverId) {
      return res.status(400).json({ success: false, message: 'You cannot swap skills with yourself.' });
    }

    // Check if the receiver exists
    const receiverExists = await User.findById(receiverId);
    if (!receiverExists) {
      return res.status(404).json({ success: false, message: 'The user you are trying to swap with does not exist.' });
    }

    const newSwap = new SkillSwap({
      requester: requesterId,
      receiver: receiverId,
      skillOffered,
      skillWanted,
      message,
      preferredTime,
    });

    const savedSwap = await newSwap.save();

    res.status(201).json({
      success: true,
      message: 'Swap request sent successfully!',
      data: savedSwap,
    });
  } catch (error) {
    console.error('Error creating swap request:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

//-------------- Get all swaps related to the logged-in user , GET /api/swaps/me,  Private-----------------------

export const getMySwaps = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find all swaps where the user is either the requester OR the receiver
    const swaps = await SkillSwap.find({ $or: [{ requester: userId }, { receiver: userId }] })
      .populate('requester', 'name profilePicture location reviews')
      .populate('receiver', 'name profilePicture location reviews')
      .sort({ createdAt: -1 }); // Show the newest swaps first

    res.status(200).json({
      success: true,
      count: swaps.length,
      data: swaps,
    });
  } catch (error) {
    console.error('Error fetching swaps:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};


//-----------------Update the status of a swap request (accept, reject, etc.),PUT /api/swaps/:id,Private-----------------------

export const updateSwapStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const swapId = req.params.id;
    const userId = req.user.id;

    const allowedStatus = ['accepted', 'rejected', 'completed', 'cancelled'];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status update.' });
    }

    const swap = await SkillSwap.findById(swapId);

    if (!swap) {
      return res.status(404).json({ success: false, message: 'Swap request not found.' });
    }

    // --- Authorization Check with CORRECTED LOGIC ---
    // Only the receiver can accept or reject a pending request
    if (swap.status === 'pending' && (status === 'accepted' || status === 'rejected')) {
      if (swap.receiver.toString() !== userId) {
        return res.status(403).json({ success: false, message: 'You are not authorized to perform this action.' });
      }
    } 
    // Either user can cancel an accepted request
    else if (swap.status === 'accepted' && status === 'cancelled') {
        if (swap.requester.toString() !== userId && swap.receiver.toString() !== userId) {
            return res.status(403).json({ success: false, message: 'You are not authorized to perform this action.' });
        }
    }
    // Add logic here later for 'completed' if needed
    else if (swap.status === 'accepted' && status === 'completed') {
        // You might want to check if either user is part of the swap
        if (swap.requester.toString() !== userId && swap.receiver.toString() !== userId) {
            return res.status(403).json({ success: false, message: 'You are not authorized to perform this action.' });
        }
    }
    else {
      // If the transition is not allowed (e.g., trying to accept an already accepted swap), send an error
      return res.status(400).json({ success: false, message: `Cannot change status from ${swap.status} to ${status}.` });
    }

    swap.status = status;
    const updatedSwap = await swap.save();

    res.status(200).json({
      success: true,
      message: `Swap request has been ${status}.`,
      data: updatedSwap,
    });
  } catch (error) {
    console.error('Error updating swap status:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};


//-----------------GetSwap By ID----------------------

export const getSwapById = async (req, res) => {
  try {
    const swapId = req.params.id;
    const userId = req.user.id;

    const swap = await SkillSwap.findById(swapId)
      .populate('requester', '-password') // Populate with full user details, except password
      .populate('receiver', '-password');

    if (!swap) {
      return res.status(404).json({ success: false, message: 'Swap not found.' });
    }

    // Authorization: Make sure the logged-in user is part of this swap
    const isParticipant = swap.requester.id === userId || swap.receiver.id === userId;
    if (!isParticipant) {
      return res.status(403).json({ success: false, message: 'You are not authorized to view this swap.' });
    }

    res.status(200).json({ success: true, data: swap });
  } catch (error) {
    console.error('Error fetching swap by ID:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

