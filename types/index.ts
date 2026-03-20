export interface User {
    id: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    balance: number;
    role: 'user' | 'agent' | 'admin';
}

export interface Vehicle {
    id: string;
    userId: string;
    plateNumber: string;
    nickname?: string;
    type: 'Car' | 'Motorcycle' | 'Truck';
    isDefault: boolean;
}

export interface ParkingSession {
    id: string;
    userId: string;
    vehicleId: string;
    zone: string;
    location: string;
    startTime: Date;
    durationMinutes: number;
    cost: number;
    status: 'ACTIVE' | 'EXPIRED' | 'COMPLETED';
}
