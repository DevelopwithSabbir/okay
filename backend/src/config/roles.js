export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  SUB_ADMIN: 'sub_admin',
  MODERATOR: 'moderator'
};

export const PERMISSIONS = {
  MANAGE_USERS: 'manage_users',
  MANAGE_TUTORS: 'manage_tutors',
  MANAGE_CONTENT: 'manage_content',
  APPROVE_REGISTRATIONS: 'approve_registrations',
  VIEW_ANALYTICS: 'view_analytics',
  MANAGE_ADMINS: 'manage_admins',
  MANAGE_SETTINGS: 'manage_settings'
};

export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS),
  [ROLES.SUB_ADMIN]: [
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.MANAGE_TUTORS,
    PERMISSIONS.MANAGE_CONTENT,
    PERMISSIONS.APPROVE_REGISTRATIONS,
    PERMISSIONS.VIEW_ANALYTICS
  ],
  [ROLES.MODERATOR]: [
    PERMISSIONS.MANAGE_CONTENT,
    PERMISSIONS.VIEW_ANALYTICS
  ]
};