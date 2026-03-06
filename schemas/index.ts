import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

const VEHICLE_TYPES = ['Car', 'Motorcycle', 'Truck'] as const;

export const vehicleSchema = z.object({
    plateNumber: z.string().min(4, 'Plate number must be at least 4 characters').toUpperCase(),
    nickname: z.string().optional(),
    type: z.enum(VEHICLE_TYPES),
    isDefault: z.boolean().optional(),
});

export type VehicleFormData = z.infer<typeof vehicleSchema>;
