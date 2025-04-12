const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Appointment must belong to a patient']
    },
    doctor: {
      type: mongoose.Schema.ObjectId,
      ref: 'Doctor',
      required: [true, 'Appointment must belong to a doctor']
    },
    hospital: {
      type: mongoose.Schema.ObjectId,
      ref: 'Hospital'
    },
    date: {
      type: Date,
      required: [true, 'Appointment must have a date']
    },
    time: {
      type: String,
      required: [true, 'Appointment must have a time']
    },
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled', 'no-show'],
      default: 'scheduled'
    },
    type: {
      type: String,
      enum: ['in-person', 'virtual'],
      default: 'in-person'
    },
    reason: {
      type: String,
      required: [true, 'Please provide a reason for the appointment']
    },
    notes: String,
    followUp: {
      required: Boolean,
      date: Date
    },
    prescription: {
      medications: [{
        name: String,
        dosage: String,
        frequency: String,
        duration: String,
        notes: String
      }],
      instructions: String,
      issuedAt: Date
    },
    payment: {
      amount: Number,
      status: {
        type: String,
        enum: ['pending', 'completed', 'refunded'],
        default: 'pending'
      },
      method: String,
      transactionId: String,
      paidAt: Date
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Create indexes for faster queries
appointmentSchema.index({ patient: 1, date: 1 });
appointmentSchema.index({ doctor: 1, date: 1 });

// Populate patient and doctor references when finding appointments
appointmentSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'patient',
    select: 'name email phone'
  }).populate({
    path: 'doctor',
    select: 'name specialization phone'
  });

  next();
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;