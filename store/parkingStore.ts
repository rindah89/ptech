import { create } from 'zustand';
import { ParkingSession, Vehicle } from '../types';

interface ParkingState {
    vehicles: Vehicle[];
    activeSession: ParkingSession | null;
    history: ParkingSession[];

    addVehicle: (vehicle: Omit<Vehicle, 'id' | 'userId'>) => void;
    removeVehicle: (id: string) => void;

    startSession: (session: Omit<ParkingSession, 'id' | 'status'>) => void;
    endSession: () => void;
    extendSession: (additionalMinutes: number, additionalCost: number) => void;
}

// Mock Initial Data
const INITIAL_VEHICLES: Vehicle[] = [
    { id: 'veh_1', userId: 'usr_123', plateNumber: 'LT-012-AB', nickname: 'My Toyota', type: 'Car', isDefault: true },
    { id: 'veh_2', userId: 'usr_123', plateNumber: 'CE-456-XY', nickname: 'Work Truck', type: 'Truck', isDefault: false },
];

export const useParkingStore = create<ParkingState>((set) => ({
    vehicles: INITIAL_VEHICLES,
    activeSession: null,
    history: [],

    addVehicle: (vehicleData) => {
        const newVehicle: Vehicle = {
            ...vehicleData,
            id: Math.random().toString(36).substr(2, 9),
            userId: 'usr_123', // Hardcoded to mock user
        };
        set((state) => ({ vehicles: [...state.vehicles, newVehicle] }));
    },

    removeVehicle: (id) => {
        set((state) => ({ vehicles: state.vehicles.filter((v) => v.id !== id) }));
    },

    startSession: (sessionData) => {
        const newSession: ParkingSession = {
            ...sessionData,
            id: 'sess_' + Math.random().toString(36).substr(2, 9),
            status: 'ACTIVE',
        };
        set({ activeSession: newSession });
    },

    endSession: () => {
        set((state) => {
            if (!state.activeSession) return state;
            const completedSession: ParkingSession = { ...state.activeSession, status: 'COMPLETED' };
            return {
                activeSession: null,
                history: [completedSession, ...state.history],
            };
        });
    },

    extendSession: (additionalMinutes, additionalCost) => {
        set((state) => {
            if (!state.activeSession) return state;
            return {
                activeSession: {
                    ...state.activeSession,
                    durationMinutes: state.activeSession.durationMinutes + additionalMinutes,
                    cost: state.activeSession.cost + additionalCost,
                }
            };
        });
    },
}));
