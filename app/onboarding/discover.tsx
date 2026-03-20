import { MaterialIcons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import tw from '../../utils/tailwind';

export default function Discover() {
    return (
        <View style={tw`flex-1 bg-background-dark items-center justify-center`}>
            <View style={tw`relative flex-1 w-full max-w-[480px] bg-background-dark mx-auto overflow-hidden`}>
                {/* Status Bar fake spacer */}
                <View style={tw`h-12 w-full pt-4`} />

                {/* Skip Button */}
                <View style={tw`w-full px-6 pt-4 z-10 items-end`}>
                    <Link href="/auth/sign-in" asChild>
                        <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                            <Text style={tw`text-sm font-medium text-slate-500`}>Skip</Text>
                        </TouchableOpacity>
                    </Link>
                </View>

                {/* Main Content Area */}
                <View style={tw`flex-1 flex-col justify-center items-center px-6 z-0`}>
                    {/* Logo */}
                    <View style={tw`mb-12 items-center justify-center`}>
                        <Image source={require('../../assets/images/logofornonwhitebackgounds.png')} style={tw`w-64 h-28`} resizeMode="contain" />
                    </View>

                    {/* Text Content */}
                    <View style={tw`items-center px-4 max-w-xs`}>
                        <Text style={tw`text-3xl font-bold text-white text-center leading-10 tracking-tight`}>
                            Find Parking{'\n'}
                            <Text style={tw`text-primary`}>in Seconds</Text>
                        </Text>
                        <Text style={tw`text-base text-slate-400 text-center font-normal mt-4 leading-6`}>
                            Locate available spots instantly across Douala. Pay securely with PTech via Mobile Money.
                        </Text>
                    </View>
                </View>

                {/* Footer / Controls */}
                <View style={tw`w-full px-6 pb-10 pt-4 flex-col gap-8 items-center z-10`}>
                    {/* Progress Indicator */}
                    <View style={tw`flex-row items-center gap-2`}>
                        <View style={tw`h-1.5 w-8 rounded-full bg-primary`} />
                        <View style={tw`h-1.5 w-1.5 rounded-full bg-white/20`} />
                        <View style={tw`h-1.5 w-1.5 rounded-full bg-white/20`} />
                    </View>

                    {/* Action Button */}
                    <TouchableOpacity
                        onPress={() => router.push('/onboarding/payments')}
                        style={tw`w-full flex-row items-center justify-center rounded-xl h-14 bg-primary shadow-lg`}
                    >
                        <Text style={tw`text-white text-lg font-bold mr-2`}>Next</Text>
                        <MaterialIcons name="arrow-forward" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

