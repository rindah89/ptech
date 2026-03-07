import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { GlassCard } from '../../components/ui/GlassCard';
import { ScreenHeader } from '../../components/ui/ScreenHeader';
import { useParkingStore } from '../../store/parkingStore';
import tw from '../../utils/tailwind';

export default function History() {
    const activeSession = useParkingStore(state => state.activeSession);
    const history = useParkingStore(state => state.history);
    const fetchTransactions = useParkingStore(state => state.fetchTransactions);

    React.useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ACTIVE': return 'text-green-400';
            case 'EXPIRED': return 'text-red-400';
            default: return 'text-slate-400';
        }
    };

    return (
        <View style={tw`flex-1 bg-[#121212] overflow-hidden w-full max-w-md mx-auto`}>
            <ScreenHeader title="PARKING HISTORY" showBack={false} />

            <ScrollView contentContainerStyle={tw`pb-32 pt-6 px-5`} showsVerticalScrollIndicator={false}>

                {/* Active Session Section */}
                {activeSession && (
                    <View style={tw`mb-10 relative`}>
                        <View style={tw`flex-row justify-between items-center mb-4`}>
                            <Text style={tw`text-white font-bold text-lg tracking-wide`}>Active Now</Text>
                            <View style={tw`flex-row items-center bg-success/10 px-3 py-1 rounded-full border border-success/20`}>
                                <View style={tw`h-2 w-2 rounded-full bg-success mr-2 animate-pulse`} />
                                <Text style={tw`text-success text-xs font-bold tracking-wider`}>IN PROGRESS</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={() => router.push('/parking/active')}
                            style={tw`w-full rounded-[28px] overflow-hidden shadow-[0_8px_30px_rgba(249,115,22,0.15)] relative border border-white/10`}
                        >
                            <ImageBackground
                                source={{ uri: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?q=80&w=2667&auto=format&fit=crop' }}
                                style={tw`w-full`}
                                imageStyle={tw`opacity-40`}
                            >
                                <View style={tw`absolute inset-0 bg-black/60`} />

                                <View style={tw`p-6 pt-32`}>
                                    <Text style={tw`text-white text-2xl font-bold mb-1`}>{activeSession.location}</Text>

                                    <View style={tw`flex-row items-center mt-4`}>
                                        <View style={tw`bg-black/50 border border-white/10 rounded-xl px-4 py-3 flex-row items-center mr-3`}>
                                            <MaterialIcons name="directions-car" size={20} color={tw.color('primary')} style={tw`mr-2`} />
                                            <Text style={tw`text-white font-bold tracking-widest`}>{activeSession.vehicleId}</Text>
                                        </View>
                                        <View style={tw`bg-primary/20 border border-primary/30 rounded-xl px-4 py-3 flex-1 items-center justify-center`}>
                                            <Text style={tw`text-primary font-bold`}>{activeSession.durationMinutes} Min</Text>
                                        </View>
                                    </View>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Previous Sessions */}
                <View>
                    <Text style={tw`text-white font-bold text-lg tracking-wide mb-4`}>Past Sessions</Text>

                    {history.length === 0 ? (
                        <View style={tw`items-center justify-center py-10`}>
                            <MaterialIcons name="history" size={48} color="#333" style={tw`mb-4`} />
                            <Text style={tw`text-slate-400`}>No past sessions found.</Text>
                        </View>
                    ) : (
                        history.map((session) => (
                            <GlassCard key={session.id} padding="md" style={tw`mb-4`}>
                                <View style={tw`flex-row items-start justify-between mb-3`}>
                                    <View style={tw`flex-row items-center flex-1 pr-4`}>
                                        <View style={tw`h-12 w-12 bg-black/40 rounded-full items-center justify-center mr-3 border border-white/5`}>
                                            <MaterialIcons name="local-parking" size={24} color={tw.color('primary')} />
                                        </View>
                                        <View>
                                            <Text style={tw`text-white font-bold text-base mb-0.5`} numberOfLines={1}>{session.location}</Text>
                                            <Text style={tw`text-slate-400 text-xs font-medium`}>{formatDate(session.startTime)}</Text>
                                        </View>
                                    </View>
                                    <Text style={tw`text-white font-black text-lg`}>{session.cost} XAF</Text>
                                </View>

                                <View style={tw`flex-row items-center justify-between pt-3 border-t border-white/5`}>
                                    <View style={tw`flex-row items-center`}>
                                        <MaterialIcons name="schedule" size={14} color="#64748b" style={tw`mr-1.5`} />
                                        <Text style={tw`text-slate-400 text-xs font-medium`}>{session.durationMinutes} Min</Text>
                                    </View>
                                    <Text style={[tw`text-xs font-bold uppercase tracking-wider`, tw`${getStatusColor(session.status)}`]}>
                                        {session.status}
                                    </Text>
                                </View>
                            </GlassCard>
                        ))
                    )}
                </View>

            </ScrollView>
        </View>
    );
}
