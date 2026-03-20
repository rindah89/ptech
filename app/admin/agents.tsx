import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import tw from '../../utils/tailwind';

const mockAgents = [
    { id: '1', name: 'Marc Eyraud', phone: '690123456', assignedZone: 'Z-101', status: 'ongoing', shiftStart: '08:00 AM' },
    { id: '2', name: 'Nadine Kamga', phone: '671234567', assignedZone: 'Z-102', status: 'scheduled', shiftStart: '02:00 PM' },
    { id: '3', name: 'Paul Biya', phone: '655667788', assignedZone: 'Unassigned', status: 'completed', shiftStart: 'Yesterday' },
];

export default function AgentsManager() {
    const router = useRouter();
    const [agents] = useState(mockAgents);

    const renderAgent = ({ item }: { item: typeof mockAgents[0] }) => (
        <View style={tw`bg-surface-dark p-4 rounded-xl mb-4 border border-white/5 shadow`}>
            <View style={tw`flex-row justify-between items-center mb-3`}>
                <View style={tw`flex-row items-center`}>
                    <View style={tw`w-10 h-10 rounded-full bg-slate-700 items-center justify-center mr-3`}>
                        <MaterialIcons name="person" size={24} color="#aaa" />
                    </View>
                    <View>
                        <Text style={tw`text-white font-bold text-base`}>{item.name}</Text>
                        <Text style={tw`text-slate-400 text-xs`}>{item.phone}</Text>
                    </View>
                </View>
                {item.status === 'ongoing' && (
                    <MaterialIcons name="circle" size={12} color="#22c55e" />
                )}
            </View>
            
            <View style={tw`bg-background-dark p-3 rounded-lg border border-white/5`}>
                <View style={tw`flex-row justify-between mb-2`}>
                    <Text style={tw`text-slate-500 text-xs`}>Current Shift</Text>
                    <Text style={tw`text-white text-xs font-medium`}>{item.shiftStart}</Text>
                </View>
                <View style={tw`flex-row justify-between`}>
                    <Text style={tw`text-slate-500 text-xs`}>Assigned Zone</Text>
                    <Text style={tw`text-secondary font-bold text-xs`}>{item.assignedZone}</Text>
                </View>
            </View>

            <View style={tw`flex-row mt-3 justify-end gap-2`}>
                <TouchableOpacity style={tw`bg-white/5 px-4 py-2 rounded-lg`}>
                    <Text style={tw`text-slate-300 text-xs font-bold`}>View Log</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`bg-primary/20 px-4 py-2 rounded-lg`}>
                    <Text style={tw`text-primary text-xs font-bold`}>Reassign</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={tw`bg-background-dark flex-1`}>
            {/* Header */}
            <View style={tw`pt-14 pb-4 px-6 flex-row items-center justify-between border-b border-white/5`}>
                <View style={tw`flex-row items-center`}>
                    <TouchableOpacity onPress={() => router.back()} style={tw`mr-4`}>
                        <MaterialIcons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={tw`text-white font-bold text-xl`}>Agent Shifts</Text>
                </View>
            </View>

            <View style={tw`px-6 pt-4 pb-2 flex-row gap-2`}>
                <TouchableOpacity style={tw`bg-primary px-4 py-1.5 rounded-full`}>
                    <Text style={tw`text-white font-bold text-xs`}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`bg-white/5 px-4 py-1.5 rounded-full`}>
                    <Text style={tw`text-slate-300 font-bold text-xs`}>On Duty</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`bg-white/5 px-4 py-1.5 rounded-full`}>
                    <Text style={tw`text-slate-300 font-bold text-xs`}>Fines Issued</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={agents}
                keyExtractor={(item) => item.id}
                renderItem={renderAgent}
                contentContainerStyle={tw`p-6 pt-2`}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}
