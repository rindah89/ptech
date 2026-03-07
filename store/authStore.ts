import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (phoneNumber: string, password?: string) => Promise<void>;
    logout: () => void;
    register: (user: Partial<User> & { password?: string }) => Promise<void>;
    updateBalance: (amount: number) => void;
}

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000/api';

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,

    login: async (phoneNumber: string, password?: string) => {
        set({ isLoading: true });
        try {
            const formData = new URLSearchParams();
            formData.append('username', phoneNumber);
            formData.append('password', password || '');

            const response = await fetch(`${API_URL}/auth/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString()
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to login');
            }

            const data = await response.json();
            const token = data.access_token;

            // Fetch user profile could be done here, for now mock user using the form data
            const MOCK_USER: User = {
                id: 'usr_123',
                phoneNumber: phoneNumber,
                firstName: 'User',
                lastName: '',
                balance: 0,
            };
            set({ user: MOCK_USER, token: token, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({ isLoading: false });
            console.error('Login error:', error);
            throw error;
        }
    },

    logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
    },

    register: async (userData: Partial<User> & { password?: string }) => {
        set({ isLoading: true });
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone_number: userData.phoneNumber,
                    first_name: userData.firstName,
                    last_name: userData.lastName,
                    password: userData.password
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to register');
            }

            const dbUser = await response.json();

            const newUser: User = {
                id: dbUser.id,
                phoneNumber: dbUser.phone_number,
                firstName: dbUser.first_name,
                lastName: dbUser.last_name,
                balance: dbUser.balance || 0,
            };
            set({ user: newUser, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({ isLoading: false });
            console.error('Registration error:', error);
            throw error;
        }
    },

    updateBalance: (amount: number) => {
        set((state) => ({
            user: state.user ? { ...state.user, balance: state.user.balance + amount } : null
        }));
    }
}));
