const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          refPath: 'participantModel'
        },
        model: {
          type: String,
          enum: ['User', 'Doctor']
        }
      }
    ],
    type: {
      type: String,
      enum: ['patient-doctor', 'patient-ai'],
      required: [true, 'Conversation must have a type']
    },
    title: String,
    lastMessage: {
      type: String,
      trim: true
    },
    lastMessageAt: Date,
    isActive: {
      type: Boolean,
      default: true
    },
    metadata: {
      relatedAppointment: {
        type: mongoose.Schema.ObjectId,
        ref: 'Appointment'
      },
      aiContext: Object
    }
  },
  {
    timestamps: true
  }
);

// Create indexes for faster queries
conversationSchema.index({ participants: 1 });
conversationSchema.index({ lastMessageAt: -1 });

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;