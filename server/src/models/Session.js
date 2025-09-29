// server/src/models/Session.js

import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
  // Link to the SkillSwap this session belongs to
  swapId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SkillSwap',
    required: true,
  },
  // The two users involved in the session for easy querying
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  title: {
    type: String,
    required: true,
    trim: true,
  },
  // The date and time the session is scheduled for
  scheduledAt: {
    type: Date,
    required: true,
  },
  // Duration in minutes
  durationInMinutes: {
    type: Number,
    required: true,
  },
  // Status of the session
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled',
  },
  // Optional link for a video call
  meetingLink: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

export default mongoose.model('Session', SessionSchema);