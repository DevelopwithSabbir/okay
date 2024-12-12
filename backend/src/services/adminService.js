import Admin from '../models/adminModel.js';
import { ROLE_PERMISSIONS } from '../config/roles.js';
import { logAdminAction } from '../middleware/auditLogger.js';

export const createAdminService = async (adminData, creatorId) => {
  const admin = await Admin.create({
    ...adminData,
    permissions: ROLE_PERMISSIONS[adminData.role]
  });

  await logAdminAction({
    admin: { _id: creatorId },
    ip: '',
    headers: {}
  }, 'CREATE_ADMIN', 'admin', admin._id, adminData);

  return admin;
};

export const updateLanguageService = async (adminId, language) => {
  const admin = await Admin.findByIdAndUpdate(
    adminId,
    { languagePreference: language },
    { new: true }
  );

  if (!admin) {
    throw new Error('Admin not found');
  }

  return admin;
};

export const getAdminByEmail = async (email) => {
  return await Admin.findOne({ email });
};

export const getAdminById = async (id) => {
  return await Admin.findById(id).select('-password');
};