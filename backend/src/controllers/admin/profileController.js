import asyncHandler from 'express-async-handler';
import { getAdminById, updateLanguageService } from '../../services/adminService.js';

export const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = await getAdminById(req.admin._id);
  if (!admin) {
    res.status(404);
    throw new Error('Admin not found');
  }
  res.json(admin);
});

export const updateLanguagePreference = asyncHandler(async (req, res) => {
  const { language } = req.body;
  const updatedAdmin = await updateLanguageService(req.admin._id, language);
  res.json({ 
    message: 'Language preference updated',
    language: updatedAdmin.languagePreference 
  });
});