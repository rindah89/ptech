import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import tw from '../../utils/tailwind';

export default function IssueTicket() {
    const router = useRouter();
    const { plate } = useLocalSearchParams();
    const [plateNumber, setPlateNumber] = useState(plate ? String(plate) : '');
    const [violationType, setViolationType] = useState('Expired Session');
    const [amount, setAmount] = useState('10000');

    return (
        <View style={tw`bg-background-dark flex-1`}>
            {/* Header */}
            <View style={tw`pt-14 pb-4 px-6 flex-row items-center border-b border-white/5`}>
                <TouchableOpacity onPress={() => router.back()} style={tw`mr-4`}>
                    <MaterialIcons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={tw`text-white font-bold text-xl`}>Issue Enforcement Ticket</Text>
            </View>

            <ScrollView contentContainerStyle={tw`p-6 pb-32`} showsVerticalScrollIndicator={false}>
                
                {/* Plate Entry */}
                <View style={tw`mb-6`}>
                    <Text style={tw`text-slate-400 text-xs font-bold uppercase pl-1 mb-2`}>Vehicle License Plate</Text>
                    <View style={tw`bg-surface-dark border border-white/10 rounded-xl px-4 py-3 flex-row items-center`}>
                        <MaterialIcons name="directions-car" size={20} color="#64748b" style={tw`mr-3`} />
                        <TextInput
                            style={tw`flex-1 text-white text-lg font-bold tracking-widest`}
                            placeholder="LT-021-AB"
                            placeholderTextColor="#475569"
                            value={plateNumber}
                            onChangeText={(text) => setPlateNumber(text.toUpperCase())}
                            autoCapitalize="characters"
                        />
                    </View>
                </View>

                {/* Violation Choice */}
                <View style={tw`mb-6`}>
                    <Text style={tw`text-slate-400 text-xs font-bold uppercase pl-1 mb-2`}>Violation Type</Text>
                    
                    <TouchableOpacity 
                        onPress={() => { setViolationType('Expired Session'); setAmount('5000'); }}
                        style={tw`w-full flex-row justify-between items-center p-4 bg-surface-dark border ${violationType === 'Expired Session' ? 'border-primary bg-primary/10' : 'border-white/5'} rounded-xl mb-3`}
                    >
                        <View style={tw`flex-row items-center`}>
                            <MaterialIcons name="timer-off" size={24} color={violationType === 'Expired Session' ? '#f27f0d' : '#888'} />
                            <Text style={tw`text-white ml-3 font-medium`}>Expired Session</Text>
                        </View>
                        <Text style={tw`text-slate-400 text-sm`}>XAF 5,000</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => { setViolationType('No Valid Session'); setAmount('10000'); }}
                        style={tw`w-full flex-row justify-between items-center p-4 bg-surface-dark border ${violationType === 'No Valid Session' ? 'border-primary bg-primary/10' : 'border-white/5'} rounded-xl mb-3`}
                    >
                        <View style={tw`flex-row items-center`}>
                            <MaterialIcons name="block" size={24} color={violationType === 'No Valid Session' ? '#f27f0d' : '#888'} />
                            <Text style={tw`text-white ml-3 font-medium`}>No Valid Session</Text>
                        </View>
                        <Text style={tw`text-slate-400 text-sm`}>XAF 10,000</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => { setViolationType('Illegal Parking'); setAmount('25000'); }}
                        style={tw`w-full flex-row justify-between items-center p-4 bg-surface-dark border ${violationType === 'Illegal Parking' ? 'border-primary bg-primary/10' : 'border-white/5'} rounded-xl`}
                    >
                        <View style={tw`flex-row items-center`}>
                            <MaterialIcons name="do-not-disturb-alt" size={24} color={violationType === 'Illegal Parking' ? '#f27f0d' : '#888'} />
                            <Text style={tw`text-white ml-3 font-medium`}>Illegal Parking</Text>
                        </View>
                        <Text style={tw`text-slate-400 text-sm`}>XAF 25,000</Text>
                    </TouchableOpacity>
                </View>

                {/* Fine Amount Display */}
                <View style={tw`mb-8 p-4 bg-red-500/10 rounded-xl border border-red-500/20 flex-row justify-between items-center`}>
                    <Text style={tw`text-slate-300 font-bold`}>Total Fine Amount</Text>
                    <Text style={tw`text-red-400 font-bold text-xl`}>XAF {amount}</Text>
                </View>

                {/* Evidence Photo */}
                <View style={tw`mb-10`}>
                    <Text style={tw`text-slate-400 text-xs font-bold uppercase pl-1 mb-2`}>Evidence (Required)</Text>
                    <TouchableOpacity style={tw`h-32 bg-surface-dark rounded-xl border border-dashed border-white/20 items-center justify-center`}>
                        <MaterialIcons name="add-a-photo" size={32} color="#64748b" style={tw`mb-2`} />
                        <Text style={tw`text-slate-300 text-sm`}>Take photo showing context & plate</Text>
                    </TouchableOpacity>
                </View>

                <Button 
                    label="Issue Citation Ticket" 
                    variant="danger" 
                    icon="gavel"
                    onPress={() => {
                        // Would post to table `enforcement_tickets`
                        router.back(); 
                    }} 
                />
            </ScrollView>
        </View>
    );
}
