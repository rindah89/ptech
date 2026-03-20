import { create } from 'zustand';
import { User } from '../types';
import { supabase } from '../utils/supabase';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (phoneNumber: string, password?: string) => Promise<void>;
    logout: () => void;
    register: (userData: Partial<User> & { password?: string }) => Promise<void>;
    updateBalance: (amount: number) => void;
    checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,

    login: async (phoneNumber: string, password?: string) => {
        set({ isLoading: true });
        try {
            const email = `${phoneNumber}@ptech.app`;
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password: password || '',
            });

            if (error) throw error;

            // Fetch profile
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', data.session.user.id)
                .single();

            if (profileError) throw profileError;

            const currentUser: User = {
                id: profileData.id,
                phoneNumber: profileData.phone_number,
                firstName: profileData.first_name,
                lastName: profileData.last_name,
                balance: profileData.balance || 0,
                role: profileData.role,
            };

            set({ user: currentUser, token: data.session.access_token, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({ isLoading: false });
            console.error('Login error:', error);
            throw error;
        }
    },

    logout: async () => {
        await supabase.auth.signOut();
        set({ user: null, token: null, isAuthenticated: false });
    },

    register: async (userData: Partial<User> & { password?: string }) => {
        set({ isLoading: true });
        try {
            const email = `${userData.phoneNumber}@ptech.app`;
            const { data, error } = await supabase.auth.signUp({
                email,
                password: userData.password || '',
                options: {
                    data: {
                        first_name: userData.firstName,
                        last_name: userData.lastName,
                        phone_number: userData.phoneNumber,
                    }
                }
            });

            if (error) throw error;
            if (!data.session) throw new Error('Failed to create session. Please login.');

            // Fetch profile created by trigger
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', data.session.user.id)
                .single();

            if (profileError) throw profileError;

            const newUser: User = {
                id: profileData.id,
                phoneNumber: profileData.phone_number,
                firstName: profileData.first_name,
                lastName: profileData.last_name,
                balance: profileData.balance || 0,
                role: profileData.role,
            };

            set({ user: newUser, token: data.session.access_token, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({ isLoading: false });
            console.error('Registration error:', error);
            throw error;
        }
    },

    checkSession: async () => {
        set({ isLoading: true });
        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();

            if (profileError) {
                set({ user: null, token: null, isAuthenticated: false, isLoading: false });
                return;
            }

            const currentUser: User = {
                id: profileData.id,
                phoneNumber: profileData.phone_number,
                firstName: profileData.first_name,
                lastName: profileData.last_name,
                balance: profileData.balance || 0,
                role: profileData.role,
            };

            set({ user: currentUser, token: session.access_token, isAuthenticated: true, isLoading: false });
        } else {
            set({ user: null, token: null, isAuthenticated: false, isLoading: false });
        }
    },

    updateBalance: (amount: number) => {
        set((state) => ({
            user: state.user ? { ...state.user, balance: Number(state.user.balance) + amount } : null
        }));
    }
}));
