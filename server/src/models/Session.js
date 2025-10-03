// server/src/models/Session.js

import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
  swapId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SkillSwap',
    required: true,
  },
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
  scheduledAt: {
    type: Date,
    required: true,
  },
  durationInMinutes: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled',
  },
  meetingLink: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

export default mongoose.model('Session', SessionSchema);