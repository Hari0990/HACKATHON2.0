const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A hospital must have a name'],
      unique: true,
      trim: true
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
      coordinates: {
        latitude: Number,
        longitude: Number
      }
    },
    contact: {
      phone: String,
      email: String,
      website: String
    },
    facilities: [String],
    departments: [String],
    description: {
      type: String,
      trim: true
    },
    images: [String],
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
    emergencyServices: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual populate for doctors
hospitalSchema.virtual('doctors', {
  ref: 'Doctor',
  foreignField: 'hospital',
  localField: '_id'
});

// Only find active hospitals
hospitalSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;