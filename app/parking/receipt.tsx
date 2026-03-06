import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import tw from '../../utils/tailwind';

export default function DigitalReceipt() {
    return (
        <View style={tw`bg-[#0f172a] flex-1 min-h-screen items-center justify-center`}>
            {/* Header */}
            <View style={tw`absolute top-0 left-0 right-0 z-20 bg-background-dark/95 border-b border-surface-highlight`}>
                <View style={tw`flex-row items-center justify-between p-4 pt-12 max-w-md mx-auto w-full`}>
                    <TouchableOpacity onPress={() => router.back()} style={tw`h-10 w-10 items-center justify-center rounded-full bg-white/10`}>
                        <MaterialIcons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={tw`text-white text-[10px] font-bold tracking-widest uppercase opacity-80`}>Receipt</Text>
                    <View style={tw`w-10 h-10`} />
                </View>
            </View>

            <ScrollView contentContainerStyle={tw`w-full max-w-md pt-28 pb-40 px-4`} style={tw`flex-1 w-full relative`}>
                {/* Ticket Container */}
                <View style={tw`bg-surface-dark rounded-t-2xl rounded-b-xl shadow-2xl overflow-hidden border border-white/5`}>

                    {/* Ticket Header */}
                    <View style={tw`flex-col items-center pt-10 pb-8 border-b border-dashed border-slate-600/50`}>
                        <View style={tw`w-20 h-20 bg-success/20 rounded-full items-center justify-center mb-5 border border-success/30 shadow-lg`}>
                            <MaterialIcons name="check-circle" size={40} color="success" />
                        </View>
                        <Text style={tw`text-white text-4xl font-extrabold tracking-tight mb-2 font-mono`}>500 CFA</Text>

                        <View style={tw`flex-row items-center gap-2 mt-2`}>
                            <View style={tw`w-2 h-2 rounded-full bg-green-500`} />
                            <Text style={tw`text-green-400 text-xs font-bold uppercase tracking-widest`}>Payment Successful</Text>
                        </View>
                    </View>

                    {/* Ticket Body */}
                    <View style={tw`p-8 flex-col gap-6`}>
                        <View style={tw`flex-row justify-between items-center`}>
                            <Text style={tw`text-slate-400 text-xs font-semibold uppercase tracking-wider`}>Transaction ID</Text>
                            <Text style={tw`text-white text-sm font-bold font-mono tracking-wide`}>PT-839201</Text>
                        </View>

                        <View style={tw`flex-row justify-between items-center`}>
                            <Text style={tw`text-slate-400 text-xs font-semibold uppercase tracking-wider`}>Date</Text>
                            <Text style={tw`text-white text-sm font-medium`}>Oct 24, 2023</Text>
                        </View>

                        <View style={tw`flex-row justify-between items-center`}>
                            <Text style={tw`text-slate-400 text-xs font-semibold uppercase tracking-wider`}>Time</Text>
                            <Text style={tw`text-white text-sm font-medium`}>09:30 AM - 11:30 AM</Text>
                        </View>

                        <View style={tw`h-px w-full bg-slate-600/50 my-2`} />

                        <View style={tw`flex-row justify-between items-start`}>
                            <Text style={tw`text-slate-400 text-xs font-semibold uppercase tracking-wider mt-1`}>Zone</Text>
                            <View style={tw`items-end`}>
                                <Text style={tw`text-[#ff6b00] text-base font-bold`}>Douala Zone A</Text>
                                <Text style={tw`text-slate-500 text-xs mt-0.5`}>Akwa Blvd</Text>
                            </View>
                        </View>

                        <View style={tw`flex-row justify-between items-center`}>
                            <Text style={tw`text-slate-400 text-xs font-semibold uppercase tracking-wider`}>Vehicle</Text>
                            <Text style={tw`text-white text-sm font-bold bg-slate-800 px-3 py-1.5 rounded border border-slate-700 font-mono`}>CM 2834 A</Text>
                        </View>

                        <View style={tw`h-px w-full bg-slate-600/50 my-2`} />

                        <View style={tw`flex-col gap-3 pt-2`}>
                            <View style={tw`flex-row justify-between items-center`}>
                                <Text style={tw`text-slate-400 text-sm font-medium`}>Duration (2h)</Text>
                                <Text style={tw`text-slate-200 text-sm font-medium`}>400 CFA</Text>
                            </View>
                            <View style={tw`flex-row justify-between items-center`}>
                                <Text style={tw`text-slate-400 text-sm font-medium`}>Service Fee</Text>
                                <Text style={tw`text-slate-200 text-sm font-medium`}>50 CFA</Text>
                            </View>
                            <View style={tw`flex-row justify-between items-center`}>
                                <Text style={tw`text-slate-400 text-sm font-medium`}>VAT (19.25%)</Text>
                                <Text style={tw`text-slate-200 text-sm font-medium`}>50 CFA</Text>
                            </View>

                            <View style={tw`flex-row justify-between items-center pt-4 mt-2 border-t border-dashed border-slate-600/50`}>
                                <Text style={tw`text-white font-bold text-base`}>Total Paid</Text>
                                <Text style={tw`text-3xl font-extrabold text-success mt-1 tracking-tight`}>- 1,200 FCFA</Text>
                            </View>
                        </View>
                    </View>

                    {/* Ticket Footer / QR */}
                    <View style={tw`bg-black/20 p-8 flex-col items-center justify-center border-t border-dashed border-slate-600/50 pb-12`}>
                        <View style={tw`bg-white p-3 rounded-lg shadow-lg mb-4 border-4 border-white/5`}>
                            <Image
                                source={{ uri: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PTech-Parking-Receipt-839201' }}
                                style={tw`w-32 h-32`}
                            />
                        </View>
                        <Text style={tw`text-[10px] text-slate-500 uppercase tracking-widest font-bold text-center`}>Scan to Verify</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Footer Actions */}
            <View style={tw`absolute bottom-0 left-0 right-0 p-6 bg-[#0f172a]/95 border-t border-slate-800 z-20`}>
                <View style={tw`max-w-md mx-auto flex-row gap-5`}>
                    <TouchableOpacity style={tw`flex-1 h-14 rounded-xl border border-[#ff6b00] bg-transparent flex-row items-center justify-center gap-2`}>
                        <MaterialIcons name="share" size={20} color="#ff6b00" />
                        <Text style={tw`text-[#ff6b00] font-bold text-sm uppercase tracking-wide`}>Share</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={tw`flex-1 h-14 rounded-xl bg-[#ff6b00] shadow-lg shadow-[#ff6b00]/30 flex-row items-center justify-center gap-2`}>
                        <MaterialIcons name="download" size={20} color="white" />
                        <Text style={tw`text-white font-bold text-sm uppercase tracking-wide`}>Download</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
