import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ScreenHeader } from '../../components/ui/ScreenHeader';
import tw from '../../utils/tailwind';

export default function AgentDashboard() {
    const router = useRouter();

    return (
        <View style={tw`bg-background-dark min-h-screen flex-1`}>
            <ScreenHeader title="AGENT FIELD OPS" />

            <ScrollView contentContainerStyle={tw`pb-32`} showsVerticalScrollIndicator={false}>
                <View style={tw`px-6 pt-6`}>
                    <Text style={tw`text-white font-bold text-2xl mb-2`}>Your Active Shift</Text>
                    
                    {/* Shift Status Card */}
                    <View style={tw`bg-surface-dark p-6 rounded-2xl border border-white/5 shadow-2xl mb-6 relative overflow-hidden`}>
                        <View style={tw`absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mt-10 -mr-10`} />
                        <View style={tw`flex-row items-center mb-4`}>
                            <View style={tw`w-3 h-3 rounded-full bg-green-500 mr-2`} />
                            <Text style={tw`text-green-500 font-bold tracking-widest text-[10px]`}>ON-DUTY</Text>
                        </View>
                        <Text style={tw`text-white font-bold text-lg mb-1`}>Zone: Z-101 (Downtown)</Text>
                        <Text style={tw`text-slate-400 text-sm mb-4`}>Started at 08:00 AM</Text>
                        
                        <View style={tw`flex-row justify-between pt-4 border-t border-white/5`}>
                            <View>
                                <Text style={tw`text-slate-500 text-xs`}>Fines Issued</Text>
                                <Text style={tw`text-white font-bold text-base`}>3</Text>
                            </View>
                            <View>
                                <Text style={tw`text-slate-500 text-xs`}>Vehicles Checked</Text>
                                <Text style={tw`text-white font-bold text-base`}>42</Text>
                            </View>
                        </View>
                    </View>

                    <Text style={tw`text-slate-400 text-sm font-bold uppercase tracking-wider mb-4`}>Quick Actions</Text>

                    <View style={tw`flex-col gap-4`}>
                        {/* Scan License Plate */}
                        <TouchableOpacity
                            onPress={() => router.push('/agent/scan')}
                            style={tw`w-full bg-primary p-5 rounded-2xl shadow-lg flex-row items-center border border-primary/20`}
                        >
                            <View style={tw`w-12 h-12 rounded-full bg-white/20 items-center justify-center mr-4`}>
                                <MaterialIcons name="document-scanner" size={24} color="white" />
                            </View>
                            <View style={tw`flex-1`}>
                                <Text style={tw`text-white font-bold text-lg mb-1`}>Check Parking Status</Text>
                                <Text style={tw`text-white/80 text-xs`}>Scan or enter a license plate</Text>
                            </View>
                            <MaterialIcons name="chevron-right" size={24} color="white" />
                        </TouchableOpacity>

                        {/* Issue Ticket directly */}
                        <TouchableOpacity
                            onPress={() => router.push('/agent/issue-ticket')}
                            style={tw`w-full bg-surface-dark p-5 rounded-2xl border border-red-500/30 shadow-lg flex-row items-center`}
                        >
                            <View style={tw`w-12 h-12 rounded-full bg-red-500/10 items-center justify-center mr-4`}>
                                <MaterialIcons name="gavel" size={24} color="#ef4444" />
                            </View>
                            <View style={tw`flex-1`}>
                                <Text style={tw`text-white font-bold text-lg mb-1`}>Issue Enforcement Ticket</Text>
                                <Text style={tw`text-slate-400 text-xs`}>Log a violation and fine</Text>
                            </View>
                            <MaterialIcons name="chevron-right" size={24} color="#64748b" />
                        </TouchableOpacity>
                    </View>

                    {/* Quick Stats Section */}
                    <View style={tw`mt-8 bg-surface-dark/50 p-6 rounded-2xl border border-white/5`}>
                        <Text style={tw`text-white font-bold text-lg mb-4`}>Recent Violations</Text>
                        
                        <View style={tw`flex-row justify-between border-b border-white/5 pb-3 mb-3`}>
                            <View>
                                <Text style={tw`text-white font-bold`}>CE-420-XZ</Text>
                                <Text style={tw`text-slate-500 text-[10px]`}>No Active Session</Text>
                            </View>
                            <Text style={tw`text-xs text-slate-400`}>10 mins ago</Text>
                        </View>
                        
                        <View style={tw`flex-row justify-between border-b border-white/5 pb-3 mb-3`}>
                            <View>
                                <Text style={tw`text-white font-bold`}>LT-100-AB</Text>
                                <Text style={tw`text-slate-500 text-[10px]`}>Parked in marked bay</Text>
                            </View>
                            <Text style={tw`text-xs text-slate-400`}>45 mins ago</Text>
                        </View>
                        
                        <TouchableOpacity style={tw`mt-2`}>
                            <Text style={tw`text-primary text-xs font-bold text-center`}>View All Issued Tickets</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
