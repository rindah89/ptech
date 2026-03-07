import { MaterialIcons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { InputField } from '../../components/ui/InputField';
import { RegisterFormData, registerSchema } from '../../schemas';
import { useAuthStore } from '../../store/authStore';
import tw from '../../utils/tailwind';

export default function SignUp() {
    const register = useAuthStore(state => state.register);
    const isLoading = useAuthStore(state => state.isLoading);

    const { control, handleSubmit } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: { firstName: '', lastName: '', phoneNumber: '', password: '' }
    });

    const onSubmit = async (data: RegisterFormData) => {
        await register(data);
        router.replace('/(tabs)');
    };

    return (
        <View style={tw`bg-background-dark flex-1 relative overflow-hidden`}>
            <ImageBackground
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5VhQIFMZwWl7NxZ_xNiR8V6YPBmM1KlNJV0DMsPl703CEv8kWODrppaKXYe8DRc_gOOz0EbIebnLaEZpHA-MEZEBU0L6EEF1dgaCnnpDuJGa7j8Sp-gpXfbZpVRn3YFlHTjwJM6YX3oy2hwq489xJhUG4I82GhJg7k-Mx4Ge6xoB4inGtLsJ7P0x_Gcp44XpPQi10AUaH1wYvScpxFgHBX1oETWVQ2IOTyqL7nLTGZe_i4gpGsv6Lk2Yx81A-B4HGO4i01PiadqH' }}
                style={tw`absolute inset-0 opacity-30`}
                blurRadius={5}
            />

            <View style={tw`absolute inset-0 z-0`}>
                <LinearGradient
                    colors={['transparent', '#121212', '#121212']}
                    locations={[0, 0.2, 1]}
                    style={tw`h-full w-full`}
                />
            </View>

            <TouchableOpacity onPress={() => router.back()} style={tw`absolute top-12 left-6 h-10 w-10 bg-white/10 rounded-full items-center justify-center z-20`}>
                <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={tw`flex-grow items-center justify-center pt-24 pb-12`}>
                <View style={tw`w-full max-w-md px-6 z-10`}>
                    <View style={tw`mb-8`}>
                        <Text style={tw`text-white text-3xl font-bold tracking-tight mb-2`}>Create Account</Text>
                        <Text style={tw`text-slate-400 font-medium`}>Join PTech today and make your parking experience seamless.</Text>
                    </View>

                    <View style={tw`bg-surface-dark/80 p-6 rounded-3xl border border-white/10 shadow-xl overflow-hidden`}>
                        <View style={tw`flex-row justify-between mb-4`}>
                            <View style={tw`flex-1 mr-2`}>
                                <InputField
                                    name="firstName"
                                    control={control}
                                    label="First Name"
                                    placeholder="John"
                                />
                            </View>
                            <View style={tw`flex-1 ml-2`}>
                                <InputField
                                    name="lastName"
                                    control={control}
                                    label="Last Name"
                                    placeholder="Doe"
                                />
                            </View>
                        </View>

                        <InputField
                            name="phoneNumber"
                            control={control}
                            label="Phone Number"
                            placeholder="Enter your phone number"
                            keyboardType="phone-pad"
                            autoCapitalize="none"
                            icon="phone"
                        />

                        <InputField
                            name="password"
                            control={control}
                            label="Password"
                            placeholder="Create a strong password"
                            isPassword
                            icon="lock"
                        />

                        <Text style={tw`text-slate-500 text-[10px] mb-6 pl-1`}>By registering, you agree to PTech's Terms of Service and Privacy Policy.</Text>

                        <Button
                            label="Create Account"
                            loading={isLoading}
                            onPress={handleSubmit(onSubmit)}
                        />
                    </View>

                    <View style={tw`mt-8 flex-row justify-center items-center gap-2`}>
                        <Text style={tw`text-slate-400 font-medium`}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => router.push('/auth/sign-in')}>
                            <Text style={tw`text-white font-bold hover:underline`}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
