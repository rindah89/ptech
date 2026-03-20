import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ScreenHeader } from '../../components/ui/ScreenHeader';
import tw from '../../utils/tailwind';

export default function AdminDashboard() {
    const router = useRouter();

    return (
        <View style={tw`bg-background-dark min-h-screen flex-1`}>
            <ScreenHeader title="ADMIN PORTAL" />

            <ScrollView contentContainerStyle={tw`pb-32`} showsVerticalScrollIndicator={false}>
                <View style={tw`px-6 pt-6`}>
                    <Text style={tw`text-white font-bold text-2xl mb-2`}>Enterprise Operations</Text>
                    <Text style={tw`text-slate-400 text-sm mb-6`}>Manage your parking zones, agent staff, and dynamic pricing rules all in one place.</Text>

                    <View style={tw`flex-row flex-wrap justify-between`}>
                        {/* Zones Card */}
                        <TouchableOpacity
                            onPress={() => router.push('/admin/zones')}
                            style={tw`w-[48%] bg-surface-dark p-5 rounded-2xl border border-white/5 mb-4 shadow-lg`}
                        >
                            <View style={tw`w-12 h-12 rounded-full bg-blue-500/20 items-center justify-center mb-4`}>
                                <MaterialIcons name="map" size={24} color="#3b82f6" />
                            </View>
                            <Text style={tw`text-white font-bold text-lg mb-1`}>Zones</Text>
                            <Text style={tw`text-slate-400 text-xs`}>Manage parking zones and capacities</Text>
                        </TouchableOpacity>

                        {/* Agents Card */}
                        <TouchableOpacity
                            onPress={() => router.push('/admin/agents')}
                            style={tw`w-[48%] bg-surface-dark p-5 rounded-2xl border border-white/5 mb-4 shadow-lg`}
                        >
                            <View style={tw`w-12 h-12 rounded-full bg-green-500/20 items-center justify-center mb-4`}>
                                <MaterialIcons name="security" size={24} color="#22c55e" />
                            </View>
                            <Text style={tw`text-white font-bold text-lg mb-1`}>Agents</Text>
                            <Text style={tw`text-slate-400 text-xs`}>Track shifts and enforcement</Text>
                        </TouchableOpacity>

                        {/* Tariffs Card */}
                        <TouchableOpacity
                            onPress={() => router.push('/admin/tariffs')}
                            style={tw`w-[48%] bg-surface-dark p-5 rounded-2xl border border-white/5 mb-4 shadow-lg`}
                        >
                            <View style={tw`w-12 h-12 rounded-full bg-orange-500/20 items-center justify-center mb-4`}>
                                <MaterialIcons name="attach-money" size={24} color="#f97316" />
                            </View>
                            <Text style={tw`text-white font-bold text-lg mb-1`}>Tariffs</Text>
                            <Text style={tw`text-slate-400 text-xs`}>Dynamic pricing and rules</Text>
                        </TouchableOpacity>

                        {/* Organizations Card */}
                        <TouchableOpacity
                            onPress={() => console.log('Organizations')}
                            style={tw`w-[48%] bg-surface-dark p-5 rounded-2xl border border-white/5 mb-4 shadow-lg`}
                        >
                            <View style={tw`w-12 h-12 rounded-full bg-purple-500/20 items-center justify-center mb-4`}>
                                <MaterialIcons name="business" size={24} color="#a855f7" />
                            </View>
                            <Text style={tw`text-white font-bold text-lg mb-1`}>Fleets</Text>
                            <Text style={tw`text-slate-400 text-xs`}>Corporate organizations</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Quick Stats Section */}
                    <View style={tw`mt-8 bg-surface-dark/50 p-6 rounded-2xl border border-white/5`}>
                        <Text style={tw`text-white font-bold text-lg mb-4`}>System Health</Text>
                        
                        <View style={tw`flex-row justify-between border-b border-white/5 pb-4 mb-4`}>
                            <Text style={tw`text-slate-400`}>Active Parking Sessions</Text>
                            <Text style={tw`text-white font-bold`}>342</Text>
                        </View>
                        <View style={tw`flex-row justify-between border-b border-white/5 pb-4 mb-4`}>
                            <Text style={tw`text-slate-400`}>Agents on Duty</Text>
                            <Text style={tw`text-white font-bold`}>14</Text>
                        </View>
                        <View style={tw`flex-row justify-between`}>
                            <Text style={tw`text-slate-400`}>Unpaid Enforcement Fines</Text>
                            <Text style={tw`text-red-400 font-bold`}>XAF 45,000</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
