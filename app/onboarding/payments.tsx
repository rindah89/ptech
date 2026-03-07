import { MaterialIcons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import tw from '../../utils/tailwind';

export default function Payments() {
    return (
        <View style={tw`flex-1 bg-background-dark items-center justify-center overflow-hidden`}>
            <View style={tw`relative flex-1 w-full max-w-md p-6 bg-background-dark`}>
                {/* Status Bar Fake Spacer */}
                <View style={tw`h-12 w-full pt-4`} />

                {/* PTech Logo */}
                <View style={tw`w-full items-center pt-4 z-20`}>
                    <Image source={require('../../assets/images/logofornonwhitebackgounds.png')} style={tw`w-40 h-16`} resizeMode="contain" />
                </View>

                {/* Header / Skip */}
                <View style={tw`flex-row w-full items-center justify-end z-10`}>
                    <Link href="/auth/sign-in" asChild>
                        <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                            <Text style={tw`text-slate-400 text-sm font-medium`}>Skip</Text>
                        </TouchableOpacity>
                    </Link>
                </View>

                {/* Main Content Area */}
                <View style={tw`flex-1 flex-col items-center justify-center gap-8 w-full z-10`}>
                    {/* Hero Area */}
                    <View style={tw`relative w-full aspect-square max-w-[320px] items-center justify-center`}>
                        {/* Glowing background fake */}
                        <View style={tw`absolute inset-0 bg-secondary/20 rounded-full scale-110 opacity-50`} />

                        <View style={tw`flex-row w-full p-4 relative justify-around`}>
                            {/* MTN MoMo */}
                            <View style={tw`items-center justify-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg w-[45%]`}>
                                <View style={tw`w-16 h-16 rounded-full bg-warning items-center justify-center`}>
                                    <MaterialIcons name="account-balance-wallet" size={32} color="black" />
                                </View>
                                <Text style={tw`text-white font-bold text-sm tracking-wide text-center`}>MTN MoMo</Text>
                            </View>

                            {/* Orange Money */}
                            <View style={tw`items-center justify-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg w-[45%] mt-8`}>
                                <View style={tw`w-16 h-16 rounded-full bg-secondary items-center justify-center`}>
                                    <MaterialIcons name="payments" size={32} color="white" />
                                </View>
                                <Text style={tw`text-white font-bold text-sm tracking-wide text-center`}>Orange Money</Text>
                            </View>
                        </View>
                    </View>

                    {/* Text Content */}
                    <View style={tw`items-center px-4`}>
                        <Text style={tw`text-white text-[32px] font-bold tracking-tight text-center leading-10 mb-2`}>
                            Mobile Money{'\n'}Integration
                        </Text>
                        <Text style={tw`text-slate-300 text-base font-normal text-center leading-6 max-w-[300px]`}>
                            Quick and secure payments in CFA using your favorite mobile wallets. No cash needed.
                        </Text>
                    </View>
                </View>

                {/* Footer / Navigation */}
                <View style={tw`w-full flex-col gap-8 pb-6 pt-4 z-10 items-center`}>
                    {/* Page Indicators */}
                    <View style={tw`flex-row w-full items-center justify-center gap-3`}>
                        <View style={tw`h-2 w-2 rounded-full bg-white/20`} />
                        <View style={tw`h-2 w-8 rounded-full bg-secondary shadow-lg shadow-secondary/50`} />
                        <View style={tw`h-2 w-2 rounded-full bg-white/20`} />
                    </View>

                    {/* Action Button */}
                    <TouchableOpacity
                        onPress={() => router.push('/auth/sign-in')}
                        style={tw`w-full flex-row items-center justify-center h-14 bg-secondary shadow-lg rounded-xl`}
                    >
                        <Text style={tw`text-background-dark text-lg font-bold mr-2`}>Next</Text>
                        <MaterialIcons name="arrow-forward" size={20} color="#221910" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
