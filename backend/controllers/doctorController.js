const Doctor = require('../models/doctorModel');
const Appointment = require('../models/appointmentModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// Get all doctors
exports.getAllDoctors = catchAsync(async (req, res, next) => {
  const doctors = await Doctor.find();

  res.status(200).json({
    status: 'success',
    results: doctors.length,
    data: {
      doctors
    }
  });
});

// Get current doctor profile
exports.getMe = (req, res, next) => {
  req.params.id = req.doctor.id;
  next();
};

// Update current doctor data
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if doctor POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields that are not allowed to be updated
  const filteredBody = filterObj(
    req.body,
    'name',
    'email',
    'phone',
    'about',
    'photo',
    'consultationFee'
  );

  // 3) Update doctor document
  const updatedDoctor = await Doctor.findByIdAndUpdate(req.doctor.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      doctor: updatedDoctor
    }
  });
});

// Update doctor availability
exports.updateAvailability = catchAsync(async (req, res, next) => {
  const { availableSlots } = req.body;

  if (!availableSlots || !Array.isArray(availableSlots)) {
    return next(new AppError('Please provide valid availability slots', 400));
  }

  const updatedDoctor = await Doctor.findByIdAndUpdate(
    req.doctor.id,
    { availableSlots },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      doctor: updatedDoctor
    }
  });
});

// Get doctor's appointments
exports.getMyAppointments = catchAsync(async (req, res, next) => {
  const appointments = await Appointment.find({ doctor: req.doctor.id });

  res.status(200).json({
    status: 'success',
    results: appointments.length,
    data: {
      appointments
    }
  });
});

// Update appointment status
exports.updateAppointmentStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;

  if (!status || !['scheduled', 'completed', 'cancelled', 'no-show'].includes(status)) {
    return next(new AppError('Please provide a valid appointment status', 400));
  }

  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return next(new AppError('No appointment found with that ID', 404));
  }

  // Check if the appointment belongs to the doctor
  if (appointment.doctor.id !== req.doctor.id) {
    return next(new AppError('You are not authorized to update this appointment', 403));
  }

  appointment.status = status;
  await appointment.save();

  res.status(200).json({
    status: 'success',
    data: {
      appointment
    }
  });
});

// Get doctor by ID
exports.getDoctor = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    return next(new AppError('No doctor found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      doctor
    }
  });
});

// Create new doctor (admin only)
exports.createDoctor = catchAsync(async (req, res, next) => {
  const newDoctor = await Doctor.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      doctor: newDoctor
    }
  });
});

// Update doctor (admin only)
exports.updateDoctor = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!doctor) {
    return next(new AppError('No doctor found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      doctor
    }
  });
});

// Delete doctor (admin only)
exports.deleteDoctor = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findByIdAndDelete(req.params.id);

  if (!doctor) {
    return next(new AppError('No doctor found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});