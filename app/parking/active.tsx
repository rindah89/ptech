import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { ScreenHeader } from '../../components/ui/ScreenHeader';
import tw from '../../utils/tailwind';

export default function ActiveSession() {
    return (
        <View style={tw`bg-[#050505] flex-1 min-h-screen relative`}>
            {/* Header */}
            <ScreenHeader title="ACTIVE SESSION" transparent rightIcon="more-vert" />

            <ScrollView contentContainerStyle={tw`flex-col flex-1 px-6 py-6 pb-28 items-center justify-center`}>
                {/* Timer Mock */}
                <View style={tw`relative w-72 h-72 mb-10 items-center justify-center`}>
                    <View style={tw`absolute inset-0 rounded-full border-[8px] border-white/5`} />
                    <View style={tw`absolute inset-0 rounded-full border-[8px] border-t-secondary border-r-secondary border-transparent shadow-lg shadow-secondary/20`} />
                    <View style={tw`absolute top-1 right-[10%] w-5 h-5 bg-secondary rounded-full shadow-lg border-2 border-white`} />

                    <View style={tw`z-10 flex-col items-center`}>
                        <View style={tw`mb-3 p-2 rounded-full bg-[#FF7F3F]/10 border border-[#FF7F3F]/20`}>
                            <MaterialIcons name="local-parking" size={32} color="#FF7F3F" />
                        </View>
                        <Text style={tw`text-5xl font-extrabold tracking-widest text-white shadow-sm`}>01:24:15</Text>
                        <Text style={tw`text-sm font-medium text-secondary uppercase tracking-[0.2em] mt-2`}>Time Remaining</Text>
                    </View>
                </View>

                {/* Info Card */}
                <View style={tw`w-full bg-[#1A1A1A]/80 border border-white/5 rounded-2xl p-6 mb-8 relative overflow-hidden`}>
                    <View style={tw`flex-row items-start gap-4 mb-5`}>
                        <View style={tw`w-12 h-12 rounded-xl bg-[#FF7F3F]/20 border border-[#FF7F3F]/20 items-center justify-center shadow-lg`}>
                            <MaterialIcons name="location-pin" size={24} color="#FF7F3F" />
                        </View>
                        <View>
                            <Text style={tw`font-bold text-xl leading-tight text-white tracking-wide`}>Marché Central Zone A</Text>
                            <Text style={tw`text-sm text-slate-400 mt-1 font-light`}>Douala, Cameroon</Text>
                        </View>
                    </View>

                    <View style={tw`h-px bg-white/10 w-full my-4`} />

                    <View style={tw`flex-row justify-between items-center`}>
                        <View>
                            <Text style={tw`text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1`}>License Plate</Text>
                            <Text style={tw`font-bold text-xl tracking-wider text-white`}>LT-012-AB</Text>
                        </View>
                        <View style={tw`items-end`}>
                            <Text style={tw`text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1`}>Expires At</Text>
                            <Text style={tw`font-bold text-xl tracking-wider text-secondary`}>14:30</Text>
                        </View>
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={tw`w-full flex-row justify-between gap-4 mb-8`}>
                    <Button
                        label="Stop Session"
                        icon="stop-circle"
                        variant="danger"
                        style={tw`flex-1`}
                    />
                    <Button
                        label="Extend Session"
                        icon="add-circle-outline"
                        style={tw`flex-1`}
                        onPress={() => router.push('/parking/duration')}
                    />
                </View>

                <Text style={tw`text-center text-[10px] text-slate-600 uppercase tracking-wider`}>
                    Payments processed securely via Mobile Money
                </Text>
            </ScrollView>

            {/* Nav */}
            <View style={tw`flex-row border-t border-white/5 bg-[#121212]/90 px-4 pb-8 pt-4 absolute bottom-0 w-full`}>
                <NavItem icon="home" label="Home" onPress={() => router.push('/(tabs)')} />
                <View style={tw`flex-1 flex-col items-center justify-center gap-1.5 relative`}>
                    <View style={[tw`mt-6 px-4 py-2 rounded-full border border-secondary/30 bg-secondary/10 flex-row items-center gap-2`]}>
                        <View style={tw`h-2 w-2 rounded-full bg-secondary shadow-sm shadow-secondary border border-black/50`} />
                        <Text style={tw`text-[10px] font-bold uppercase tracking-widest text-secondary`}>Active</Text>
                    </View>
                </View>
                <NavItem icon="history" label="History" onPress={() => router.push('/(tabs)/history')} />
                <NavItem icon="person" label="Profile" onPress={() => router.push('/(tabs)/profile')} />
            </View>
        </View>
    );
}

function NavItem({ icon, label, onPress }: { icon: any, label: string, onPress?: () => void }) {
    return (
        <TouchableOpacity onPress={onPress} style={tw`flex-1 flex-col items-center justify-center gap-1.5`}>
            <MaterialIcons name={icon} size={24} color="#64748b" />
            <Text style={tw`text-[10px] font-bold uppercase tracking-widest text-slate-500`}>{label}</Text>
        </TouchableOpacity>
    );
}
