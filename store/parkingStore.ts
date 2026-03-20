import { create } from 'zustand';
import { ParkingSession, Vehicle } from '../types';
import { supabase } from '../utils/supabase';
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

export const useParkingStore = create<ParkingState>((set, get) => ({
    vehicles: [],
    activeSession: null,
    history: [],
    isLoading: false,
    error: null,

    fetchTransactions: async () => {
        const user = useAuthStore.getState().user;
        if (!user) return;

        set({ isLoading: true, error: null });
        try {
            const { data, error } = await supabase
                .from('transactions')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;

            const formattedHistory: ParkingSession[] = data.map((t: any) => ({
                id: t.id,
                userId: t.user_id,
                vehicleId: t.type,
                zone: 'Transaction',
                location: t.reference || 'Wallet Tx',
                startTime: new Date(t.created_at),
                durationMinutes: 0,
                cost: parseFloat(t.amount),
                status: t.status.toUpperCase(),
            }));

            set({ history: formattedHistory, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    fetchVehicles: async () => {
        const user = useAuthStore.getState().user;
        if (!user) return;

        set({ isLoading: true, error: null });
        try {
            const { data, error } = await supabase
                .from('vehicles')
                .select('*')
                .eq('user_id', user.id);

            if (error) throw error;

            const formattedVehicles: Vehicle[] = data.map((v: any) => ({
                id: v.id,
                userId: v.user_id,
                plateNumber: v.license_plate,
                nickname: v.make || '',
                type: 'Car',
                isDefault: false
            }));

            set({ vehicles: formattedVehicles, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    addVehicle: async (vehicleData) => {
        const user = useAuthStore.getState().user;
        if (!user) return;

        set({ isLoading: true, error: null });
        try {
            const { error } = await supabase
                .from('vehicles')
                .insert([{
                    user_id: user.id,
                    license_plate: vehicleData.plateNumber,
                    make: vehicleData.nickname,
                    model: vehicleData.type,
                }]);

            if (error) throw error;
            await get().fetchVehicles();
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    removeVehicle: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const { error } = await supabase
                .from('vehicles')
                .delete()
                .eq('id', id);

            if (error) throw error;
            set((state) => ({
                vehicles: state.vehicles.filter((v) => v.id !== id),
                isLoading: false
            }));
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    startSession: async (sessionData) => {
        const user = useAuthStore.getState().user;
        if (!user) return;

        set({ isLoading: true, error: null });
        try {
            const startTime = new Date();
            const endTime = new Date(startTime.getTime() + sessionData.durationMinutes * 60000);

            const { data, error } = await supabase
                .from('parking_sessions')
                .insert([{
                    vehicle_id: sessionData.vehicleId,
                    zone: sessionData.zone || sessionData.location,
                    start_time: startTime.toISOString(),
                    end_time: endTime.toISOString(),
                    total_cost: sessionData.cost,
                    status: 'active'
                }])
                .select()
                .single();

            if (error) throw error;

            set({
                activeSession: {
                    ...sessionData,
                    id: data.id,
                    startTime: new Date(data.start_time),
                    status: 'ACTIVE',
                },
                isLoading: false
            });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    endSession: async (sessionId) => {
        set({ isLoading: true, error: null });
        try {
            const { error } = await supabase
                .from('parking_sessions')
                .update({
                    status: 'completed',
                    end_time: new Date().toISOString()
                })
                .eq('id', sessionId);

            if (error) throw error;

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

    extendSession: async (additionalMinutes, additionalCost) => {
        const activeSession = get().activeSession;
        if (!activeSession) return;

        set({ isLoading: true });
        try {
            const newDuration = activeSession.durationMinutes + additionalMinutes;
            const newCost = activeSession.cost + additionalCost;
            const newEndTime = new Date(activeSession.startTime.getTime() + newDuration * 60000);

            const { error } = await supabase
                .from('parking_sessions')
                .update({
                    end_time: newEndTime.toISOString(),
                    total_cost: newCost
                })
                .eq('id', activeSession.id);

            if (error) throw error;

            set((state) => ({
                activeSession: state.activeSession ? {
                    ...state.activeSession,
                    durationMinutes: newDuration,
                    cost: newCost,
                } : null,
                isLoading: false
            }));
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },
}));
