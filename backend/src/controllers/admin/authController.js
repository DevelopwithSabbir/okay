import asyncHandler from 'express-async-handler';
import { getAdminByEmail } from '../../services/adminService.js';
import { generateToken } from '../../utils/generateToken.js';

// Store verification codes temporarily (in production, use Redis or similar)
const verificationCodes = new Map();

export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await getAdminByEmail(email);

  if (admin && (await admin.matchPassword(password))) {
    // Generate verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    verificationCodes.set(email, {
      code: verificationCode,
      timestamp: Date.now(),
      attempts: 0
    });

    // In production, send this via email
    console.log('Verification code:', verificationCode);

    res.json({
      message: 'Verification code sent',
      email,
      requiresVerification: true
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

export const verifyCode = asyncHandler(async (req, res) => {
  const { email, code } = req.body;
  const verification = verificationCodes.get(email);

  if (!verification) {
    res.status(400);
    throw new Error('Verification code expired or not found');
  }

  // Check attempts
  if (verification.attempts >= 3) {
    verificationCodes.delete(email);
    res.status(400);
    throw new Error('Too many attempts. Please login again.');
  }

  // Check expiration (10 minutes)
  if (Date.now() - verification.timestamp > 10 * 60 * 1000) {
    verificationCodes.delete(email);
    res.status(400);
    throw new Error('Verification code expired');
  }

  // Check code
  if (verification.code !== code) {
    verification.attempts++;
    res.status(400);
    throw new Error('Invalid verification code');
  }

  // Code is valid - complete login
  const admin = await getAdminByEmail(email);
  admin.lastLogin = new Date();
  await admin.save();

  // Clear verification data
  verificationCodes.delete(email);

  res.json({
    _id: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    permissions: admin.permissions,
    token: generateToken(admin._id),
    languagePreference: admin.languagePreference
  });
});

export const resendVerificationCode = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const admin = await getAdminByEmail(email);

  if (!admin) {
    res.status(404);
    throw new Error('Admin not found');
  }

  // Generate new verification code
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  verificationCodes.set(email, {
    code: verificationCode,
    timestamp: Date.now(),
    attempts: 0
  });

  // In production, send this via email
  console.log('New verification code:', verificationCode);

  res.json({
    message: 'New verification code sent',
    email
  });
});