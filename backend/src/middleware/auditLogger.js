import AuditLog from '../models/auditLogModel.js';

export const logAdminAction = async (req, action, entityType, entityId, details) => {
  try {
    await AuditLog.create({
      adminId: req.admin._id,
      action,
      entityType,
      entityId,
      details,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });
  } catch (error) {
    console.error('Audit logging failed:', error);
  }
};