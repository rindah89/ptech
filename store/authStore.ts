import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string) => Promise<void>;
    logout: () => void;
    register: (user: Partial<User>) => Promise<void>;
    updateBalance: (amount: number) => void;
}

// Mock User for Dev
const MOCK_USER: User = {
    id: 'usr_123',
    email: 'remy@example.com',
    firstName: 'Remy',
    lastName: 'Ngwanyam',
    balance: 14500,
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,

    login: async (email: string) => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));
        set({ user: MOCK_USER, isAuthenticated: true, isLoading: false });
    },

    logout: () => {
        set({ user: null, isAuthenticated: false });
    },

    register: async (userData: Partial<User>) => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 800));
        const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            email: userData.email || '',
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            balance: 0,
        };
        set({ user: newUser, isAuthenticated: true, isLoading: false });
    },

    updateBalance: (amount: number) => {
        set((state) => ({
            user: state.user ? { ...state.user, balance: state.user.balance + amount } : null
        }));
    }
}));
