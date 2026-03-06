import { MaterialIcons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { InputField } from '../../components/ui/InputField';
import { LoginFormData, loginSchema } from '../../schemas';
import { useAuthStore } from '../../store/authStore';
import tw from '../../utils/tailwind';

export default function SignIn() {
    const login = useAuthStore(state => state.login);
    const isLoading = useAuthStore(state => state.isLoading);

    const { control, handleSubmit } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' }
    });

    const onSubmit = async (data: LoginFormData) => {
        await login(data.email);
        router.replace('/(tabs)');
    };

    return (
        <View style={tw`bg-[#121212] flex-1 flex-col items-center justify-center relative overflow-hidden`}>
            <ImageBackground
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5VhQIFMZwWl7NxZ_xNiR8V6YPBmM1KlNJXVoDMsPl703CEv8kWODrppaKXYe8DRc_gOOz0EbIebnLaEZpHA-MEZEBU0L6EEF1dgaCnnpDuJGa7j8Sp-gpXfbZpVRn3YFlHTjwJM6YX3oy2hwq489xJhUG4I82GhJg7k-Mx4Ge6xoB4inGtLsJ7P0x_Gcp44XpPQi10AUaH1wYvScpxFgHBX1oETWVQ2IOTyqL7nLTGZe_i4gpGsv6Lk2Yx81A-B4HGO4i01PiadqH' }}
                style={tw`absolute inset-0 opacity-40`}
                blurRadius={3}
            />

            <View style={tw`absolute inset-0 z-0`}>
                <LinearGradient
                    colors={['transparent', 'rgba(18,18,18,0.9)', '#121212']}
                    locations={[0, 0.4, 1]}
                    style={tw`h-full w-full`}
                />
            </View>

            <TouchableOpacity onPress={() => router.back()} style={tw`absolute top-12 left-6 h-10 w-10 bg-white/10 rounded-full items-center justify-center z-20`}>
                <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            <View style={tw`z-10 w-full max-w-md px-6 pt-12`}>
                <View style={tw`items-center mb-10 mt-10`}>
                    <View style={tw`relative mb-4`}>
                        <View style={tw`absolute inset-0 bg-[#f97316] rounded-full blur-xl opacity-40`} />
                        <View style={tw`h-20 w-20 bg-black border-2 border-[#f97316] rounded-full items-center justify-center shadow-lg`}>
                            <MaterialIcons name="local-parking" size={40} color="#f97316" />
                        </View>
                    </View>
                    <Text style={tw`text-white text-3xl font-bold tracking-tight mb-2`}>Welcome Back</Text>
                    <Text style={tw`text-slate-400 text-center font-medium`}>Sign in to manage your parking, add vehicles, and pay securely.</Text>
                </View>

                <View style={tw`bg-[#1e1e1e]/80 p-6 rounded-3xl border border-white/10 shadow-xl overflow-hidden`}>
                    <InputField
                        name="email"
                        control={control}
                        label="Email Address"
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        icon="email"
                    />

                    <InputField
                        name="password"
                        control={control}
                        label="Password"
                        placeholder="••••••••"
                        isPassword
                        icon="lock"
                    />

                    <View style={tw`flex-row justify-end mb-6`}>
                        <TouchableOpacity>
                            <Text style={tw`text-[#f97316] font-bold text-sm hover:underline`}>Forgot password?</Text>
                        </TouchableOpacity>
                    </View>

                    <Button
                        label="Sign In"
                        loading={isLoading}
                        onPress={handleSubmit(onSubmit)}
                    />

                    <View style={tw`flex-row items-center my-6 opacity-40`}>
                        <View style={tw`flex-1 h-px bg-slate-500`} />
                        <Text style={tw`mx-4 text-xs font-bold text-slate-300 uppercase tracking-widest`}>Or continue with</Text>
                        <View style={tw`flex-1 h-px bg-slate-500`} />
                    </View>

                    <View style={tw`flex-row justify-center gap-4`}>
                        <TouchableOpacity style={tw`h-12 w-12 rounded-full border border-white/10 bg-black/40 items-center justify-center hover:bg-white/5 transition-colors`}>
                            <Text style={tw`text-white font-bold text-lg`}>G</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={tw`h-12 w-12 rounded-full border border-white/10 bg-black/40 items-center justify-center hover:bg-white/5 transition-colors`}>
                            <MaterialIcons name="apple" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={tw`mt-8 flex-row justify-center items-center gap-2`}>
                    <Text style={tw`text-slate-400 font-medium`}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => router.push('/auth/sign-up')}>
                        <Text style={tw`text-white font-bold hover:underline`}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
