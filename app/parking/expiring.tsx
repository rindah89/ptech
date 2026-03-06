import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import tw from '../../utils/tailwind';

export default function ExpiringSession() {
    return (
        <View style={tw`bg-[#221910] font-display flex-1 relative overflow-hidden`}>
            {/* Background Map View (Simulated & Blurred) */}
            <View style={tw`absolute inset-0 z-0 opacity-40 bg-[#2c2117]`}>
                <ImageBackground
                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCo0u5-t-Ix9Sizyoi9Y-Jvggb9j_7AqIbcyP52ga3qoTmXQsmMP0QEzuYSeCh-sZ_Wq0BYkky_5EBckgMmPVcYwYs-o6GD2d7ibReQY069UrM8XccYreBiHI8xMilDlUiQTMUdAjQsMk7BL5rBFIv09vNQiBntzUbko9WxBUSP3WpAx2iW38nqxxcLZIBCWWsKHd4nvaW9mFmI_AeSrjI-qnzHnEhYHUsbcQcqBcgk-AVWKICoZ0GCx8YjhrS10YweRfRpDrsxTet' }}
                    style={tw`flex-1`}
                    blurRadius={5}
                />
            </View>

            {/* Overlay Modal Background */}
            <View style={tw`absolute inset-0 z-10 bg-black/60 justify-end p-4 pb-24`}>
                {/* Modal Card */}
                <View style={tw`w-full max-w-md bg-[#2c2117]/95 border border-[#f27f0d] rounded-2xl p-6 shadow-lg shadow-[#f27f0d]/25`}>

                    <View style={tw`flex-row items-start gap-4 mb-4`}>
                        <View style={tw`w-12 h-12 rounded-full bg-[#f27f0d]/20 items-center justify-center`}>
                            <MaterialIcons name="timer-off" size={28} color="#f27f0d" />
                        </View>
                        <View style={tw`flex-1 pt-1`}>
                            <Text style={tw`text-white text-xl font-bold leading-tight mb-1`}>Parking Expiring</Text>
                            <Text style={tw`text-[#cbad90] text-sm font-medium leading-relaxed`}>
                                Your session at <Text style={tw`text-white font-semibold`}>Marché Central</Text> expires in <Text style={tw`text-[#f27f0d] font-bold`}>5 minutes</Text>!
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => router.back()}>
                            <MaterialIcons name="close" size={24} color="#cbad90" />
                        </TouchableOpacity>
                    </View>

                    {/* Progress Bar Warning */}
                    <View style={tw`w-full bg-[#2c2117]/50 border border-white/5 rounded-full h-1.5 mb-6 overflow-hidden`}>
                        <View style={tw`bg-[#f27f0d] h-full w-[15%] rounded-full shadow-lg shadow-[#f27f0d]/80`} />
                    </View>

                    {/* Action Buttons */}
                    <View style={tw`flex-row gap-3`}>
                        <TouchableOpacity style={tw`flex-1 h-12 rounded-xl bg-transparent border border-[#493622] items-center justify-center`}>
                            <Text style={tw`text-white text-sm font-bold tracking-wide`}>View Details</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => router.push('/parking/duration')} style={tw`flex-1 h-12 rounded-xl bg-[#f27f0d] items-center justify-center shadow-lg shadow-[#f27f0d]/40`}>
                            <Text style={tw`text-[#221910] text-sm font-bold tracking-wide`}>Extend for 1 hr</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={tw`text-center text-[10px] text-[#cbad90] mt-4 opacity-70`}>Payment via Mobile Money • Fees apply</Text>
                </View>
            </View>

            {/* Nav */}
            <View style={tw`absolute bottom-0 w-full z-20 flex-row border-t border-[#493622] bg-[#2c2117]/95 px-4 pb-8 pt-4`}>
                <NavItem icon="home" label="Home" onPress={() => router.push('/(tabs)')} />
                <View style={tw`flex-1 flex-col items-center justify-center gap-1.5`}>
                    <MaterialIcons name="local-parking" size={28} color="#f27f0d" />
                    <Text style={tw`text-[10px] font-bold uppercase tracking-widest text-[#f27f0d]`}>My Parking</Text>
                </View>
                <NavItem icon="account-balance-wallet" label="Wallet" onPress={() => router.push('/(tabs)/wallet')} />
                <NavItem icon="person" label="Profile" onPress={() => router.push('/(tabs)/profile')} />
            </View>
        </View>
    );
}

function NavItem({ icon, label, onPress }: { icon: any, label: string, onPress?: () => void }) {
    return (
        <TouchableOpacity onPress={onPress} style={tw`flex-1 flex-col items-center justify-center gap-1.5 opacity-60`}>
            <MaterialIcons name={icon} size={28} color="white" />
            <Text style={tw`text-[10px] font-bold uppercase tracking-widest text-white`}>{label}</Text>
        </TouchableOpacity>
    );
}
