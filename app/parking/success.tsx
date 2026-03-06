import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { GlassCard } from '../../components/ui/GlassCard';
import tw from '../../utils/tailwind';

export default function PaymentSuccess() {
    return (
        <View style={tw`flex-1 bg-[#221910] overflow-hidden justify-center items-center`}>
            {/* Background Effects */}
            <View style={tw`absolute inset-0 opacity-40 z-0`}>
                <View style={tw`absolute top-[10%] left-[20%] w-2 h-2 bg-[#f27f0d] rounded-full opacity-60`} />
                <View style={tw`absolute top-[30%] right-[15%] w-3 h-3 bg-[#22c55e] rounded-full opacity-50`} />
                <View style={tw`absolute bottom-[25%] left-[10%] w-1.5 h-1.5 bg-[#f27f0d] rounded-full opacity-70`} />
                <View style={tw`absolute top-[50%] left-[5%] w-2.5 h-2.5 bg-[#22c55e] rounded-full opacity-40`} />

                <LinearGradient
                    colors={['rgba(242,127,13,0.1)', 'transparent']}
                    style={tw`absolute top-0 left-0 right-0 h-[500px]`}
                />
            </View>

            <View style={tw`p-6 pt-12 z-20 flex-row justify-end`}>
                <TouchableOpacity onPress={() => router.push('/(tabs)')} style={tw`p-2 rounded-full bg-white/5 border border-white/10`}>
                    <MaterialIcons name="close" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Main Content */}
            <View style={tw`w-full max-w-md px-6 flex-col items-center z-10 justify-center pb-24 pt-12`}>
                {/* Success Animation Container (Mockup) */}
                <View style={tw`relative mb-10 items-center justify-center`}>
                    <View style={tw`absolute inset-0 rounded-full bg-[#22c55e]/20 scale-150`} />
                    <View style={tw`absolute inset-0 rounded-full bg-success/20 scale-150`} />
                    <View style={tw`absolute inset-0 rounded-full bg-secondary/20 scale-110`} />

                    <View style={tw`relative w-32 h-32 items-center justify-center`}>
                        <View style={tw`absolute inset-0 border-4 border-success border-t-secondary border-b-secondary/50 rounded-full`} />
                        <View style={tw`absolute inset-2 border-2 border-dashed border-white/20 rounded-full`} />

                        <View style={tw`w-24 h-24 bg-success/20 rounded-full items-center justify-center border border-success/30 shadow-lg shadow-success/20`}>
                            <MaterialIcons name="check" size={48} color="white" />
                        </View>
                    </View>
                </View>

                {/* Message */}
                <View style={tw`items-center mb-10`}>
                    <Text style={tw`text-white tracking-tight text-4xl font-bold mb-2`}>Payment Confirmed</Text>
                    <Text style={tw`text-slate-400 text-lg`}>Your parking session has started.</Text>
                </View>

                <View style={tw`w-full relative`}>
                    <GlassCard variant="dark" padding="none">
                        <View style={tw`p-6 z-10`}>
                            <View style={tw`flex-row items-start justify-between mb-6`}>
                                <View style={tw`flex-row items-center gap-3`}>
                                    <View style={tw`w-10 h-10 rounded-full bg-background-dark items-center justify-center border border-white/5`}>
                                        <MaterialIcons name="local-parking" size={20} color="secondary" />
                                    </View>
                                    <View>
                                        <Text style={tw`text-xs text-slate-400 uppercase tracking-wider font-semibold`}>Zone</Text>
                                        <Text style={tw`text-white text-xl font-bold tracking-tight`}>Bastos</Text>
                                    </View>
                                </View>
                                <View style={tw`bg-success/20 px-3 py-1 rounded-full border border-success/20 flex-row items-center gap-1`}>
                                    <View style={tw`w-1.5 h-1.5 rounded-full bg-success shadow-sm`} />
                                    <Text style={tw`text-success text-xs font-bold`}>ACTIVE</Text>
                                </View>
                            </View>

                            <View style={tw`flex-col gap-4`}>
                                <View style={tw`p-4 rounded-xl bg-black/20 border border-white/5 flex-row items-center justify-between`}>
                                    <View>
                                        <Text style={tw`text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1`}>Vehicle Plate</Text>
                                        <Text style={tw`text-white text-lg font-bold tracking-widest`}>LT-012-AB</Text>
                                    </View>
                                    <MaterialIcons name="directions-car" size={24} color="#64748b" />
                                </View>

                                <View style={tw`flex-row justify-between`}>
                                    <View>
                                        <Text style={tw`text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1`}>Start Time</Text>
                                        <Text style={tw`text-secondary font-bold text-lg`}>1,200 FCFA</Text>
                                    </View>
                                    <View style={tw`items-end`}>
                                        <Text style={tw`text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1`}>Duration</Text>
                                        <Text style={tw`text-white font-medium`}>2 Hours</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={tw`p-4 bg-black/20 flex-row justify-between items-center border-t border-dashed border-white/10`}>
                            <Text style={tw`text-slate-400 text-sm font-medium`}>Receipt No.</Text>
                            <Text style={tw`text-white font-mono`}>#PT-8294</Text>
                        </View>
                    </GlassCard>
                </View>
            </View>

            {/* Bottom Actions */}
            <View style={tw`absolute bottom-0 left-0 w-full pt-12 pb-8 px-6 z-20 bg-[#221910]/90`}>
                <View style={tw`w-full flex-col gap-4 mt-8`}>
                    <Button
                        label="View Session Details"
                        icon="receipt"
                        onPress={() => router.push('/parking/active')}
                    />
                    <Button
                        label="Back to Home"
                        variant="ghost"
                        onPress={() => router.push('/(tabs)')}
                    />
                </View>
            </View>
        </View>
    );
}
