import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { GlassCard } from '../../components/ui/GlassCard';
import { ScreenHeader } from '../../components/ui/ScreenHeader';
import tw from '../../utils/tailwind';

export default function DurationSelection() {
    return (
        <View style={tw`bg-background-dark flex-1 min-h-screen items-center justify-center`}>
            <View style={tw`w-full h-full max-w-md flex-col flex-1 relative`}>

                {/* Background Gradients */}
                <LinearGradient colors={['#0f1115', '#181b21', '#0f1115']} style={tw`absolute inset-0 z-0`} />
                <View style={tw`absolute-top-[10 %]-left-[10 %] w-1/2 h-1/3 bg-primary/20 rounded-full blur-[80px]`} pointerEvents="none" />
                <View style={tw`absolute-bottom-[10 %]-right-[5 %] w-[60 %] h-[40 %] bg-secondary/10 rounded-full blur-[80px]`} pointerEvents="none" />

                <ScreenHeader title="Duration & Pay" transparent rightIcon="help-outline" />

                {/* Main Content */}
                <ScrollView style={tw`flex-1 z-10`} contentContainerStyle={tw`pb-32`}>
                    {/* Location Info */}
                    <View style={tw`px-6 pt-6 pb-4 items-center`}>
                        <View style={tw`flex-row items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4`}>
                            <MaterialIcons name="location-pin" size={14} color="#ff7900" />
                            <Text style={tw`text-secondary text-xs font-bold uppercase tracking-widest`}>Zone A</Text>
                        </View>
                        <Text style={tw`text-white tracking-tight text-3xl font-bold leading-tight`}>Marché Central</Text>
                        <Text style={tw`text-slate-400 text-sm mt-1 font-medium tracking-wide`}>Douala, Cameroon</Text>
                    </View>

                    <GlassCard variant="dark" padding="lg" style={tw`mt-4 mx-4 shadow-lg rounded-3xl overflow-hidden`}>
                        <View style={tw`flex-col items-center justify-center`}>
                            <View style={tw`relative w-48 h-48 items-center justify-center mb-6`}>
                                {/* SVG Circle Fake */}
                                <View style={tw`absolute inset-0 rounded-full border-4 border-white/10`} />
                                <View style={tw`absolute inset-0 rounded-full border-4 border-secondary border-t-transparent border-l-transparent rotate-45`} />

                                <View style={tw`items-center justify-center bg-background-dark rounded-full w-36 h-36 border border-white/5`}>
                                    <Text style={tw`text-5xl font-bold text-white tracking-tighter`}>2<Text style={tw`text-2xl text-slate-400 font-medium`}>h</Text></Text>
                                    <Text style={tw`text-xl text-slate-400 font-medium`}>00m</Text>
                                </View>
                            </View>

                            <View style={tw`w-full flex-row justify-between items-center px-2 mb-2`}>
                                <View>
                                    <Text style={tw`text-slate-400 text-xs font-medium uppercase tracking-wider`}>Start</Text>
                                    <Text style={tw`text-white font-bold`}>12:45</Text>
                                </View>
                                <View style={tw`items-end`}>
                                    <Text style={tw`text-slate-400 text-xs font-medium uppercase tracking-wider`}>End</Text>
                                    <Text style={tw`text-secondary font-bold`}>14:45</Text>
                                </View>
                            </View>

                            {/* Fake Slider Range */}
                            <View style={tw`w-full h-1 bg-white/10 rounded-full mt-4 flex-row items-center`}>
                                <View style={tw`h-full w-1/2 bg-secondary rounded-full`} />
                                <View style={tw`h-7 w-7 rounded-full bg-white border-4 border-secondary shadow-lg-ml-3`} />
                            </View>

                            <View style={tw`flex-row justify-between w-full mt-4 mx-1`}>
                                <Text style={tw`text-[10px] text-slate-500 font-bold uppercase tracking-wider`}>30 min</Text>
                                <Text style={tw`text-[10px] text-slate-500 font-bold uppercase tracking-wider`}>4 hours</Text>
                            </View>
                        </View>
                    </GlassCard>

                    {/* Pricing Info */}
                    <View style={tw`mt-8 items-center px-4`}>
                        <Text style={tw`text-slate-400 text-sm font-medium mb-1 uppercase tracking-widest`}>Total Cost</Text>
                        <View style={tw`flex-row items-end gap-2 justify-center`}>
                            <Text style={tw`text-white tracking-tight text-[56px] font-bold leading-none`}>1,200</Text>
                            <Text style={tw`text-xl text-secondary font-bold mb-2`}>FCFA</Text>
                        </View>
                        <View style={tw`mt-3 flex-row items-center gap-1.5 px-3 py-1 rounded-full bg-background-dark border border-white/10`}>
                            <MaterialIcons name="info" size={14} color="#ff7900" />
                            <Text style={tw`text-slate-300 text-xs`}>600 FCFA / Hour</Text>
                        </View>
                    </View>

                    {/* Payment Method Selector */}
                    <View style={tw`mt-10 px-4`}>
                        <Text style={tw`text-slate-400 text-sm font-bold mb-4 uppercase tracking-wider`}>Payment Method</Text>
                        <View style={tw`flex-col gap-4`}>
                            {/* Selected Method (MTN) */}
                            <TouchableOpacity style={tw`flex-row items-center p-4 rounded-2xl border border-warning bg-warning/10 shadow-lg`}>
                                <View style={tw`h-12 w-12 rounded-xl bg-warning items-center justify-center mr-4 shadow-sm`}>
                                    <Text style={tw`font-bold text-black text-[10px] text-center`}>MTN{'\n'}MoMo</Text>
                                </View>
                                <View style={tw`flex-1`}>
                                    <Text style={tw`text-warning font-bold text-base`}>MTN Mobile Money</Text>
                                    <Text style={tw`text-slate-400 text-xs`}>Ending in *8892</Text>
                                </View>
                                <View style={tw`h-6 w-6 rounded-full bg-warning items-center justify-center`}>
                                    <MaterialIcons name="check" size={14} color="black" />
                                </View>
                            </TouchableOpacity>

                            {/* Unselected Method (Orange) */}
                            <TouchableOpacity style={tw`flex-row items-center p-4 rounded-2xl border border-slate-700/50 bg-slate-800/40`}>
                                <View style={tw`h-12 w-12 rounded-xl bg-black border border-white/10 overflow-hidden items-center justify-center mr-4 relative`}>
                                    <View style={tw`absolute bottom-0 right-0 w-8 h-8 bg-[#ff7900]`} />
                                    <Text style={tw`font-bold text-white text-xs z-10`}>OM</Text>
                                </View>
                                <View style={tw`flex-1`}>
                                    <Text style={tw`text-white font-bold text-base`}>Orange Money</Text>
                                    <Text style={tw`text-slate-400 text-xs`}>Link new account</Text>
                                </View>
                                <View style={tw`h-6 w-6 rounded-full border-2 border-slate-600`} />
                            </TouchableOpacity>

                            <TouchableOpacity style={tw`flex-row items-center p-4 rounded-2xl border border-dashed border-slate-700`}>
                                <View style={tw`h-12 w-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mr-4`}>
                                    <MaterialIcons name="add" size={20} color="#94a3b8" />
                                </View>
                                <Text style={tw`font-medium text-sm text-slate-400`}>Add another payment method</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

                {/* Bottom Floating Pay Button */}
                <View style={tw`absolute bottom-0 left-0 w-full p-6 bg-background-dark/95 border-t border-white/5 z-20`}>
                    <Button 
                        label="Pay 1,200 FCFA"
                        onPress={() => router.push('/parking/success')}
                    />
                </View>

            </View>
        </View>
    );
}
