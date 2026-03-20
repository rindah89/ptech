import { z } from 'zod';

export const loginSchema = z.object({
    phoneNumber: z.string().min(9, 'Phone number must be at least 9 digits'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    phoneNumber: z.string().min(9, 'Phone number must be at least 9 digits'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

const VEHICLE_TYPES = ['Car', 'Motorcycle', 'Truck', 'EV'] as const;

export const vehicleSchema = z.object({
    plateNumber: z.string().min(4, 'Plate number must be at least 4 characters').toUpperCase(),
    nickname: z.string().optional(),
    type: z.enum(VEHICLE_TYPES),
    isDefault: z.boolean().optional(),
});

export type VehicleFormData = z.infer<typeof vehicleSchema>;

// Enterprise Additions
export const organizationSchema = z.object({
    name: z.string().min(2, 'Organization name is required'),
    billingEmail: z.string().email('Invalid email address').optional(),
    taxId: z.string().optional(),
});
export type OrganizationFormData = z.infer<typeof organizationSchema>;

export const parkingZoneSchema = z.object({
    zoneCode: z.string().min(2, 'Zone code is required'),
    name: z.string().min(2, 'Zone name is required'),
    capacity: z.number().int().positive().optional(),
    type: z.enum(['street', 'garage', 'lot']),
});
export type ParkingZoneFormData = z.infer<typeof parkingZoneSchema>;

export const tariffSchema = z.object({
    name: z.string().min(2, 'Tariff name is required'),
    baseFee: z.number().min(0).default(0),
    hourlyRate: z.number().min(0),
    dailyMax: z.number().min(0).optional(),
    gracePeriodMinutes: z.number().int().min(0).default(0),
});
export type TariffFormData = z.infer<typeof tariffSchema>;
