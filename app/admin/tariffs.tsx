import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import tw from '../../utils/tailwind';

const mockTariffs = [
    { id: '1', name: 'Standard City Rate', hourly: 500, dailyMax: 5000, gracePeriod: 10 },
    { id: '2', name: 'Premium Garage Rate', hourly: 1000, dailyMax: 8000, gracePeriod: 15 },
    { id: '3', name: 'Event Special Rate', hourly: 1500, dailyMax: 10000, gracePeriod: 5 },
];

export default function TariffsManager() {
    const router = useRouter();
    const [tariffs] = useState(mockTariffs);

    const renderTariff = ({ item }: { item: typeof mockTariffs[0] }) => (
        <View style={tw`bg-surface-dark p-5 rounded-xl mb-4 border border-white/5 shadow`}>
            <Text style={tw`text-white font-bold text-lg mb-4`}>{item.name}</Text>
            
            <View style={tw`flex-row flex-wrap justify-between`}>
                <View style={tw`w-[48%] mb-4`}>
                    <View style={tw`flex-row items-center mb-1`}>
                        <MaterialIcons name="schedule" size={14} color="#64748b" />
                        <Text style={tw`text-slate-400 text-xs ml-1`}>Hourly Rate</Text>
                    </View>
                    <Text style={tw`text-primary font-bold text-base`}>XAF {item.hourly}</Text>
                </View>
                
                <View style={tw`w-[48%] mb-4`}>
                    <View style={tw`flex-row items-center mb-1`}>
                        <MaterialIcons name="event" size={14} color="#64748b" />
                        <Text style={tw`text-slate-400 text-xs ml-1`}>Daily Max</Text>
                    </View>
                    <Text style={tw`text-white font-bold text-base`}>XAF {item.dailyMax}</Text>
                </View>
                
                <View style={tw`w-full bg-background-dark p-3 rounded-lg mt-2 flex-row justify-between items-center`}>
                    <Text style={tw`text-slate-400 text-xs`}>Grace Period</Text>
                    <Text style={tw`text-white font-bold text-xs`}>{item.gracePeriod} mins</Text>
                </View>
            </View>
            
            <TouchableOpacity style={tw`mt-4 py-2 border border-white/10 rounded flex-row justify-center items-center`}>
                <MaterialIcons name="rule" size={16} color="#aaa" />
                <Text style={tw`text-slate-300 font-bold ml-2 text-sm`}>Edit Tariff Rules</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={tw`bg-background-dark flex-1`}>
            <View style={tw`pt-14 pb-4 px-6 flex-row items-center justify-between border-b border-white/5`}>
                <View style={tw`flex-row items-center`}>
                    <TouchableOpacity onPress={() => router.back()} style={tw`mr-4`}>
                        <MaterialIcons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={tw`text-white font-bold text-xl`}>Pricing & Tariffs</Text>
                </View>
                <TouchableOpacity style={tw`bg-primary px-3 py-1.5 rounded-lg flex-row items-center`}>
                    <MaterialIcons name="add" size={16} color="white" />
                    <Text style={tw`text-white font-bold text-xs ml-1`}>New Tariff</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={tariffs}
                keyExtractor={(item) => item.id}
                renderItem={renderTariff}
                contentContainerStyle={tw`p-6`}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}
