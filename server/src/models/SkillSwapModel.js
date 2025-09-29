// models/SkillSwap.js

import mongoose from 'mongoose';

const SkillSwapSchema = new mongoose.Schema({
  //----------------- User send the Request----------------
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  //----------- user RECEIVING the request-----------------
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  skillOffered: {
    type: String,
    required: true,
  },
  skillWanted: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  preferredTime: {
    type: String,
  },
  //------------------------------ Statuc for track swaping skill------------------
  status: {
    type: String,
    required: true,
    enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
    default: 'pending',
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

export default mongoose.model('SkillSwap', SkillSwapSchema);