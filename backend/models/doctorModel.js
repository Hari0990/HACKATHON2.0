const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        // This only works on CREATE and SAVE
        validator: function(el) {
          return el === this.password;
        },
        message: 'Passwords do not match'
      }
    },
    specialization: {
      type: String,
      required: [true, 'Please provide your specialization']
    },
    qualifications: [{
      degree: String,
      institution: String,
      year: Number
    }],
    experience: {
      type: Number,
      required: [true, 'Please provide your years of experience']
    },
    licenseNumber: {
      type: String,
      required: [true, 'Please provide your license number'],
      unique: true
    },
    phone: {
      type: String,
      required: [true, 'Please provide your phone number'],
      validate: {
        validator: function(v) {
          return validator.isMobilePhone(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      }
    },
    hospital: {
      type: mongoose.Schema.ObjectId,
      ref: 'Hospital'
    },
    availableSlots: [{
      day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      },
      startTime: String,
      endTime: String
    }],
    consultationFee: {
      type: Number,
      required: [true, 'Please provide your consultation fee']
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, 'Rating must be above 0'],
      max: [5, 'Rating must be below 5']
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User'
        },
        rating: Number,
        review: String,
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    photo: {
      type: String,
      default: 'default.jpg'
    },
    about: {
      type: String,
      trim: true
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual populate for appointments
doctorSchema.virtual('appointments', {
  ref: 'Appointment',
  foreignField: 'doctor',
  localField: '_id'
});

// Pre-save middleware to hash password
doctorSchema.pre('save', async function(next) {
  // Only run this function if password was modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

// Update passwordChangedAt property when password is changed
doctorSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000; // Subtract 1 second to ensure token is created after password change
  next();
});

// Only find active doctors
doctorSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});

// Instance method to check if password is correct
doctorSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Instance method to check if doctor changed password after token was issued
doctorSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;