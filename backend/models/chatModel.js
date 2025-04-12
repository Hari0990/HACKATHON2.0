const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'Chat must belong to a conversation']
    },
    sender: {
      type: String,
      enum: ['patient', 'doctor', 'ai'],
      required: [true, 'Chat must have a sender']
    },
    senderId: {
      type: mongoose.Schema.ObjectId,
      refPath: 'senderModel'
    },
    senderModel: {
      type: String,
      enum: ['User', 'Doctor']
    },
    message: {
      type: String,
      required: [true, 'Chat must have a message']
    },
    attachments: [{
      type: String,
      url: String,
      name: String
    }],
    read: {
      type: Boolean,
      default: false
    },
    readAt: Date
  },
  {
    timestamps: true
  }
);

// Create indexes for faster queries
chatSchema.index({ conversation: 1, createdAt: 1 });

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;