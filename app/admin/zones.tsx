import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import tw from '../../utils/tailwind';

const mockZones = [
    { id: '1', code: 'Z-101', name: 'Downtown Core', capacity: 150, type: 'street', active: true },
    { id: '2', code: 'Z-102', name: 'Bastos Garage', capacity: 300, type: 'garage', active: true },
    { id: '3', code: 'Z-103', name: 'Market Lot', capacity: 80, type: 'lot', active: false },
];

export default function ZonesManager() {
    const router = useRouter();
    const [zones] = useState(mockZones);

    const renderZone = ({ item }: { item: typeof mockZones[0] }) => (
        <View style={tw`bg-surface-dark p-4 rounded-xl mb-4 border border-white/5 shadow flex-row justify-between items-center`}>
            <View>
                <View style={tw`flex-row items-center mb-1`}>
                    <Text style={tw`text-white font-bold text-lg mr-2`}>{item.name}</Text>
                    {item.active ? (
                        <View style={tw`bg-green-500/20 px-2 py-0.5 rounded`}>
                            <Text style={tw`text-green-500 text-[10px] font-bold`}>ACTIVE</Text>
                        </View>
                    ) : (
                        <View style={tw`bg-red-500/20 px-2 py-0.5 rounded`}>
                            <Text style={tw`text-red-500 text-[10px] font-bold`}>INACTIVE</Text>
                        </View>
                    )}
                </View>
                <Text style={tw`text-slate-400 text-xs mb-2`}>Code: {item.code} • {item.type.toUpperCase()}</Text>
                <View style={tw`flex-row items-center`}>
                    <MaterialIcons name="local-parking" size={14} color="#64748b" />
                    <Text style={tw`text-slate-500 text-xs ml-1`}>Capacity: {item.capacity} spots</Text>
                </View>
            </View>
            <TouchableOpacity style={tw`p-2 bg-primary/10 rounded-full`}>
                <MaterialIcons name="edit" size={20} color="#f27f0d" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={tw`bg-background-dark flex-1`}>
            {/* Simple Header */}
            <View style={tw`pt-14 pb-4 px-6 flex-row items-center justify-between border-b border-white/5`}>
                <View style={tw`flex-row items-center`}>
                    <TouchableOpacity onPress={() => router.back()} style={tw`mr-4`}>
                        <MaterialIcons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={tw`text-white font-bold text-xl`}>Parking Zones</Text>
                </View>
                <TouchableOpacity style={tw`bg-primary px-3 py-1.5 rounded-lg flex-row items-center`}>
                    <MaterialIcons name="add" size={16} color="white" />
                    <Text style={tw`text-white font-bold text-xs ml-1`}>New</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={zones}
                keyExtractor={(item) => item.id}
                renderItem={renderZone}
                contentContainerStyle={tw`p-6`}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}
