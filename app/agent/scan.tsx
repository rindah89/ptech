import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import tw from '../../utils/tailwind';

export default function LicensePlateScanner() {
    const router = useRouter();
    const [plate, setPlate] = useState('');
    const [status, setStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');

    const checkPlate = () => {
        setStatus('checking');
        // Simulate an API call
        setTimeout(() => {
            // Fake logic for demo
            if (plate.toUpperCase().includes('X')) {
                setStatus('invalid');
            } else {
                setStatus('valid');
            }
        }, 1500);
    };

    return (
        <View style={tw`bg-background-dark flex-1`}>
            {/* Header */}
            <View style={tw`pt-14 pb-4 px-6 flex-row items-center border-b border-white/5`}>
                <TouchableOpacity onPress={() => router.back()} style={tw`mr-4`}>
                    <MaterialIcons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={tw`text-white font-bold text-xl`}>Check Vehicle Status</Text>
            </View>

            <ScrollView contentContainerStyle={tw`p-6 pt-8`} showsVerticalScrollIndicator={false}>
                <View style={tw`bg-surface-dark p-6 rounded-2xl border border-white/5 shadow-2xl mb-8 items-center`}>
                    <View style={tw`w-20 h-20 rounded-full bg-primary/10 items-center justify-center mb-6`}>
                        <MaterialIcons name="camera-alt" size={40} color="#f27f0d" />
                    </View>
                    <Text style={tw`text-white text-center font-bold text-lg mb-2`}>Scan License Plate</Text>
                    <Text style={tw`text-slate-400 text-center text-sm mb-6`}>Use your camera to automatically read the vehicle's license plate</Text>
                    
                    <Button label="Open Camera Scanner" icon="document-scanner" onPress={() => {}} />
                </View>

                <View style={tw`flex-row items-center mb-8`}>
                    <View style={tw`flex-1 h-[1px] bg-white/10`} />
                    <Text style={tw`text-slate-500 font-bold mx-4`}>OR ENTER MANUALLY</Text>
                    <View style={tw`flex-1 h-[1px] bg-white/10`} />
                </View>

                <View style={tw`mb-8`}>
                    <Text style={tw`text-slate-400 text-xs font-bold uppercase pl-1 mb-2`}>License Plate Number</Text>
                    <View style={tw`bg-surface-dark border ${status === 'invalid' ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 flex-row items-center`}>
                        <MaterialIcons name="directions-car" size={20} color="#64748b" style={tw`mr-3`} />
                        <TextInput
                            style={tw`flex-1 text-white text-lg font-bold tracking-widest`}
                            placeholder="LT-021-AB"
                            placeholderTextColor="#475569"
                            value={plate}
                            onChangeText={(text) => {
                                setPlate(text.toUpperCase());
                                setStatus('idle');
                            }}
                            autoCapitalize="characters"
                            maxLength={9}
                        />
                    </View>
                </View>

                {status === 'idle' && (
                    <Button 
                        label="Verify Status" 
                        onPress={checkPlate} 
                        disabled={plate.length < 4}
                    />
                )}

                {status === 'checking' && (
                    <View style={tw`items-center p-6 bg-surface-dark rounded-xl border border-white/5`}>
                        <Text style={tw`text-primary font-bold animate-pulse`}>Querying database...</Text>
                    </View>
                )}

                {status === 'valid' && (
                    <View style={tw`items-center p-6 bg-green-500/10 rounded-xl border border-green-500/30`}>
                        <MaterialIcons name="check-circle" size={48} color="#22c55e" style={tw`mb-2`} />
                        <Text style={tw`text-green-500 font-bold text-xl mb-1`}>Valid Session</Text>
                        <Text style={tw`text-slate-300 text-center text-sm mb-4`}>This vehicle is currently parked legally with an active session ending at 14:30 PM.</Text>
                        <Button label="Scan Another" variant="ghost" onPress={() => { setPlate(''); setStatus('idle'); }} />
                    </View>
                )}

                {status === 'invalid' && (
                    <View style={tw`items-center p-6 bg-red-500/10 rounded-xl border border-red-500/30`}>
                        <MaterialIcons name="error" size={48} color="#ef4444" style={tw`mb-2`} />
                        <Text style={tw`text-red-500 font-bold text-xl mb-1`}>No Active Session</Text>
                        <Text style={tw`text-slate-300 text-center text-sm mb-6`}>We couldn't find an active parking session or permit for this plate in this zone.</Text>
                        
                        <View style={tw`w-full flex-row gap-3`}>
                            <View style={tw`flex-1`}>
                                <Button label="Retry" variant="ghost" onPress={() => setStatus('idle')} />
                            </View>
                            <View style={tw`flex-1`}>
                                <Button 
                                    label="Issue Fine" 
                                    variant="danger" 
                                    onPress={() => router.push(`/agent/issue-ticket?plate=${plate}`)} 
                                />
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
