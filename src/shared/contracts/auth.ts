import { z } from 'zod';
import { LIMITS } from '@/shared/constants/limits';
import { idSchema } from '@/shared/contracts/common';

export const ROLES = ['player', 'admin'] as const;
export const HAS_LETTER = /[a-zA-Z]/;
export const HAS_DIGIT = /[0-9]/;
const USERNAME_ALLOWED_CHARACTERS = /^[a-zA-Z0-9_]+$/;

export const usernameSchema = z
  .string()
  .trim()
  .min(
    LIMITS.usernameMinLength,
    `El usuario debe tener al menos ${LIMITS.usernameMinLength} caracteres`,
  )
  .max(
    LIMITS.usernameMaxLength,
    `El usuario puede tener como máximo ${LIMITS.usernameMaxLength} caracteres`,
  )
  .regex(USERNAME_ALLOWED_CHARACTERS, 'Solo letras, números y guion bajo');

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .max(LIMITS.emailMaxLength, 'El email es demasiado largo')
  .email('Email inválido');

export const passwordSchema = z
  .string()
  .min(
    LIMITS.passwordMinLength,
    `La contraseña debe tener al menos ${LIMITS.passwordMinLength} caracteres`,
  )
  .max(
    LIMITS.passwordMaxLength,
    `La contraseña puede tener como máximo ${LIMITS.passwordMaxLength} caracteres`,
  )
  .regex(HAS_LETTER, 'La contraseña debe tener al menos una letra')
  .regex(HAS_DIGIT, 'La contraseña debe tener al menos un número');

export const registerSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(LIMITS.usernameMinLength, 'Ingresá tu usuario o email')
    .max(LIMITS.emailMaxLength),
  password: z.string().min(1, 'Ingresá tu contraseña').max(LIMITS.passwordMaxLength),
});

export const userPublicSchema = z.object({
  id: idSchema,
  username: z.string(),
  email: z.string().email(),
  role: z.enum(ROLES),
  introSeen: z.boolean(),
  avatarBase: z.string().nullable().optional(),
  avatarRewardId: idSchema.nullable().optional(),
  createdAt: z.string().optional(),
});

export const authResponseSchema = z.object({
  token: z.string().min(1),
  user: userPublicSchema,
});

export const settingsSchema = z.object({
  musicVolume: z.number().int().min(LIMITS.volumeMin).max(LIMITS.volumeMax),
  musicMuted: z.boolean(),
  sfxVolume: z.number().int().min(LIMITS.volumeMin).max(LIMITS.volumeMax),
  sfxMuted: z.boolean(),
  brightness: z.number().int().min(LIMITS.brightnessMin).max(LIMITS.brightnessMax),
});

export const updateUsernameSchema = z.object({ username: usernameSchema });

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Ingresá tu contraseña actual').max(LIMITS.passwordMaxLength),
  newPassword: passwordSchema,
});

export const deleteAccountSchema = z.object({
  password: z.string().min(1, 'Ingresá tu contraseña').max(LIMITS.passwordMaxLength),
  usernameConfirmation: z.string().min(1, 'Escribí tu nombre de usuario para confirmar'),
});

export type RegisterRequest = z.infer<typeof registerSchema>;
export type LoginRequest = z.infer<typeof loginSchema>;
export type UserPublic = z.infer<typeof userPublicSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
export type Settings = z.infer<typeof settingsSchema>;
export type UpdateUsernameRequest = z.infer<typeof updateUsernameSchema>;
export type ChangePasswordRequest = z.infer<typeof changePasswordSchema>;
export type DeleteAccountRequest = z.infer<typeof deleteAccountSchema>;
