import asyncHandler from 'express-async-handler';
import Admin from '../models/adminModel.js';
import AuditLog from '../models/auditLogModel.js';
import { generateToken } from '../utils/generateToken.js';

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    admin.lastLogin = new Date();
    await admin.save();

    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      permissions: admin.permissions,
      token: generateToken(admin._id),
      languagePreference: admin.languagePreference
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get admin profile
// @route   GET /api/admin/profile
// @access  Private
export const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id);
  if (admin) {
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      permissions: admin.permissions,
      languagePreference: admin.languagePreference
    });
  } else {
    res.status(404);
    throw new Error('Admin not found');
  }
});

// @desc    Create new admin
// @route   POST /api/admin
// @access  Private/Super Admin
export const createAdmin = asyncHandler(async (req, res) => {
  const { name, email, password, role, permissions } = req.body;

  const adminExists = await Admin.findOne({ email });
  if (adminExists) {
    res.status(400);
    throw new Error('Admin already exists');
  }

  const admin = await Admin.create({
    name,
    email,
    password,
    role,
    permissions
  });

  await AuditLog.create({
    adminId: req.admin._id,
    action: 'CREATE_ADMIN',
    entityType: 'admin',
    entityId: admin._id,
    details: { name, email, role, permissions },
    ipAddress: req.ip,
    userAgent: req.headers['user-agent']
  });

  res.status(201).json({
    _id: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    permissions: admin.permissions
  });
});

// @desc    Update admin language preference
// @route   PUT /api/admin/language
// @access  Private
export const updateLanguagePreference = asyncHandler(async (req, res) => {
  const { language } = req.body;

  const admin = await Admin.findById(req.admin._id);
  if (admin) {
    admin.languagePreference = language;
    await admin.save();

    await AuditLog.create({
      adminId: req.admin._id,
      action: 'UPDATE_LANGUAGE',
      entityType: 'admin',
      entityId: admin._id,
      details: { language },
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });

    res.json({ message: 'Language preference updated', language });
  } else {
    res.status(404);
    throw new Error('Admin not found');
  }
});