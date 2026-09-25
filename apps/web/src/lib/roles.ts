export const USER_ROLES = ['applicant', 'reviewer', 'admin'] as const;

export type UserRole = (typeof USER_ROLES)[number];
