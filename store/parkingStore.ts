import { create } from 'zustand';
import { ParkingSession, Vehicle } from '../types';
import { useAuthStore } from './authStore';

interface ParkingState {
    vehicles: Vehicle[];
    activeSession: ParkingSession | null;
    history: ParkingSession[];
    isLoading: boolean;
    error: string | null;

    fetchVehicles: () => Promise<void>;
    fetchTransactions: () => Promise<void>;
    addVehicle: (vehicle: Omit<Vehicle, 'id' | 'userId'>) => Promise<void>;
    removeVehicle: (id: string) => Promise<void>;

    startSession: (session: Omit<ParkingSession, 'id' | 'status'>) => Promise<void>;
    endSession: (sessionId: string) => Promise<void>;
    extendSession: (additionalMinutes: number, additionalCost: number) => void;
}

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000/api';

export const useParkingStore = create<ParkingState>((set, get) => ({
    vehicles: [],
    activeSession: null,
    history: [],
    isLoading: false,
    error: null,

    fetchTransactions: async () => {
        const token = useAuthStore.getState().token;
        if (!token) return;

        set({ isLoading: true, error: null });
        try {
            const response = await fetch(`${API_URL}/transactions/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch transactions');
            const data = await response.json();

            // Map backend transactions to history format
            const formattedHistory: ParkingSession[] = data.map((t: any) => ({
                id: t.id,
                vehicleId: t.type, // Map appropriate fields, assuming type or reference
                location: t.description || 'Parking Session',
                startTime: new Date(t.created_at),
                durationMinutes: 0, // Transaction doesn't have duration directly
                cost: parseFloat(t.amount),
                status: t.status.toUpperCase(),
            }));

            set({ history: formattedHistory, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    fetchVehicles: async () => {
        const token = useAuthStore.getState().token;
        if (!token) return;

        set({ isLoading: true, error: null });
        try {
            const response = await fetch(`${API_URL}/vehicles/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch vehicles');
            const data = await response.json();

            // Map backend response 
            const formattedVehicles: Vehicle[] = data.map((v: any) => ({
                id: v.id,
                userId: v.owner_id,
                plateNumber: v.plate_number,
                nickname: v.nickname || '',
                type: v.type, // Make sure backend enum matches DB
                isDefault: v.is_default
            }));

            set({ vehicles: formattedVehicles, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    addVehicle: async (vehicleData) => {
        const token = useAuthStore.getState().token;
        if (!token) return;

        set({ isLoading: true, error: null });
        try {
            const response = await fetch(`${API_URL}/vehicles/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    plate_number: vehicleData.plateNumber,
                    nickname: vehicleData.nickname,
                    type: vehicleData.type.toLowerCase(),
                    is_default: vehicleData.isDefault
                })
            });
            if (!response.ok) throw new Error('Failed to add vehicle');
            await get().fetchVehicles(); // refresh list
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    removeVehicle: async (id) => {
        // PTECH backend currently does not have DELETE /vehicles route. Mocking UI update for now.
        set((state) => ({ vehicles: state.vehicles.filter((v) => v.id !== id) }));
    },

    startSession: async (sessionData) => {
        const token = useAuthStore.getState().token;
        if (!token) return;

        set({ isLoading: true, error: null });
        try {
            const response = await fetch(`${API_URL}/parking/start`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    vehicle_id: sessionData.vehicleId,
                    zone: sessionData.location,
                    duration_minutes: sessionData.durationMinutes,
                    cost: sessionData.cost
                })
            });
            if (!response.ok) throw new Error('Failed to start session');
            const data = await response.json();

            set({
                activeSession: {
                    ...sessionData,
                    id: data.id,
                    status: 'ACTIVE',
                },
                isLoading: false
            });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    endSession: async (sessionId) => {
        const token = useAuthStore.getState().token;
        if (!token) return;

        set({ isLoading: true, error: null });
        try {
            const response = await fetch(`${API_URL}/parking/${sessionId}/stop`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to end session');

            set((state) => {
                if (!state.activeSession) return state;
                const completedSession: ParkingSession = { ...state.activeSession, status: 'COMPLETED' };
                return {
                    activeSession: null,
                    history: [completedSession, ...state.history],
                    isLoading: false
                };
            });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
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
