import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import tw from '../../utils/tailwind';

export default function Wallet() {
    const user = useAuthStore(state => state.user);

    return (
        <View style={tw`flex-1 bg-background-dark overflow-hidden`}>
            {/* Header */}
            <View style={tw`pt-12 pb-8 px-6 rounded-b-[2rem] shadow-2xl relative overflow-hidden z-10 border-b border-white/5 bg-surface-dark`}>
                {/* Glow Effects fake */}
                <View style={tw`absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full -mr-16 -mt-16`} />
                <View style={tw`absolute bottom-0 left-0 w-32 h-32 bg-[#ff8c00]/20 rounded-full -ml-10 -mb-10`} />

                <View style={tw`flex-row items-center justify-between mb-8 relative z-10`}>
                    <TouchableOpacity onPress={() => router.back()} style={tw`w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700/50 items-center justify-center`}>
                        <MaterialIcons name="arrow-back" size={20} color="#cbd5e1" />
                    </TouchableOpacity>
                    <Text style={tw`text-lg font-medium tracking-wide text-slate-200`}>My Wallet</Text>
                    <TouchableOpacity style={tw`w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700/50 items-center justify-center`}>
                        <MaterialIcons name="notifications" size={20} color="#cbd5e1" />
                    </TouchableOpacity>
                </View>

                <View style={tw`flex-col items-center justify-center text-center gap-3 relative z-10`}>
                    <Text style={tw`text-slate-400 text-xs font-semibold uppercase tracking-[0.2em]`}>Available Balance</Text>
                    <View style={tw`flex-row items-baseline gap-2`}>
                        <Text style={tw`text-5xl font-extrabold tracking-tight text-white`}>{user?.balance.toLocaleString() || 0}</Text>
                        <Text style={tw`text-2xl font-semibold text-primary`}>XAF</Text>
                    </View>
                    <View style={tw`flex-row items-center gap-2 px-3 py-1 rounded-full bg-slate-900/40 border border-slate-700/50`}>
                        <View style={tw`w-2 h-2 rounded-full bg-success`} />
                        <Text style={tw`text-[10px] text-slate-400 font-medium`}>Updated just now</Text>
                    </View>
                </View>

                <View style={tw`flex-row gap-4 mt-10 relative z-10`}>
                    <View style={tw`flex-1`}>
                        <Button label="Top Up" icon="add-circle" variant="primary" size="md" />
                    </View>
                    <View style={tw`flex-1`}>
                        <Button label="Withdraw" icon="arrow-upward" variant="secondary" size="md" />
                    </View>
                </View>
            </View>

            <ScrollView style={tw`flex-1 px-5 py-6`} contentContainerStyle={tw`pb-28 gap-8`}>
                {/* Linked Accounts */}
                <View>
                    <View style={tw`flex-row items-center justify-between mb-4 px-1`}>
                        <Text style={tw`text-lg font-bold text-slate-200`}>Linked Accounts</Text>
                        <TouchableOpacity style={tw`flex-row items-center`}>
                            <Text style={tw`text-primary text-xs font-bold uppercase tracking-wide`}>Manage</Text>
                            <MaterialIcons name="chevron-right" size={16} color="#f97316" />
                        </TouchableOpacity>
                    </View>

                    <View style={tw`flex-col gap-3`}>
                        {/* MTN */}
                        <View style={tw`flex-row items-center justify-between p-4 bg-surface-dark rounded-2xl border border-white/5 shadow-lg`}>
                            <View style={tw`flex-row items-center gap-4`}>
                                <View style={tw`w-12 h-12 rounded-xl bg-warning items-center justify-center shadow-lg`}>
                                    <Text style={tw`font-black text-black text-xs tracking-tighter`}>MTN</Text>
                                </View>
                                <View>
                                    <Text style={tw`font-bold text-slate-100 text-[15px]`}>MTN Mobile Money</Text>
                                    <Text style={tw`text-xs text-slate-400 font-mono mt-0.5 tracking-wide`}>•••• •••• 9842</Text>
                                </View>
                            </View>
                            <View style={tw`w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700 items-center justify-center`}>
                                <MaterialIcons name="check" size={14} color="#22c55e" />
                            </View>
                        </View>

                        {/* ORANGE */}
                        <View style={tw`flex-row items-center justify-between p-4 bg-surface-dark rounded-2xl border border-white/5 shadow-lg`}>
                            <View style={tw`flex-row items-center gap-4`}>
                                <View style={tw`w-12 h-12 rounded-xl bg-primary items-center justify-center shadow-lg`}>
                                    <Text style={tw`font-black text-white text-xs tracking-tighter`}>ORG</Text>
                                </View>
                                <View>
                                    <Text style={tw`font-bold text-slate-100 text-[15px]`}>Orange Money</Text>
                                    <Text style={tw`text-xs text-slate-400 font-mono mt-0.5 tracking-wide`}>•••• •••• 3321</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={tw`w-8 h-8 rounded-full bg-slate-800 border border-slate-700 items-center justify-center`}>
                                <MaterialIcons name="edit" size={14} color="#94a3b8" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={tw`flex-row items-center justify-center gap-2 p-3.5 w-full border border-dashed border-slate-700 rounded-xl`}>
                            <View style={tw`w-6 h-6 rounded-full bg-slate-800 items-center justify-center`}>
                                <MaterialIcons name="add" size={14} color="#94a3b8" />
                            </View>
                            <Text style={tw`text-sm font-semibold text-slate-400`}>Link New Account</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* History Preview */}
                <View>
                    <View style={tw`flex-row items-center justify-between mb-4 px-1`}>
                        <Text style={tw`text-lg font-bold text-slate-200`}>History</Text>
                        <TouchableOpacity onPress={() => router.push('/(tabs)/history')}>
                            <Text style={tw`text-slate-500 text-xs font-bold uppercase`}>View All</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={tw`bg-surface-dark rounded-2xl shadow-lg border border-white/5 overflow-hidden`}>
                        <HistoryItem icon="local-parking" color="red" title="Douala Grand Mall" time="Today, 14:30" amount="- 500" />
                        <HistoryItem icon="account-balance-wallet" color="green" title="Wallet Top Up (MTN)" time="Yesterday, 09:15" amount="+ 10,000" />
                        <HistoryItem icon="local-parking" color="red" title="Akwa Palace Parking" time="Oct 24, 18:45" amount="- 1,200" isLast />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

function HistoryItem({ icon, color, title, time, amount, isLast }: any) {
    const isRed = color === 'red';
    return (
        <View style={tw`flex-row items-center justify-between p-4 ${isLast ? '' : 'border-b border-slate-800'}`}>
            <View style={tw`flex-row items-center gap-3.5`}>
                <View style={tw`w-10 h-10 rounded-full items-center justify-center border ${isRed ? 'bg-red-500/10 border-red-500/20' : 'bg-green-500/10 border-green-500/20'}`}>
                    <MaterialIcons name={icon} size={20} color={isRed ? "#ef4444" : "#22c55e"} />
                </View>
                <View>
                    <Text style={tw`font-semibold text-slate-200 text-sm`}>{title}</Text>
                    <Text style={tw`text-[11px] text-slate-500`}>{time}</Text>
                </View>
            </View>
            <Text style={tw`font-bold text-sm tracking-tight ${isRed ? 'text-red-400' : 'text-green-400'}`}>
                {amount} <Text style={tw`text-[10px] uppercase text-slate-500 ml-0.5`}>FCFA</Text>
            </Text>
        </View>
    );
}

function NavItem({ icon, label, onPress }: { icon: any, label: string, onPress?: () => void }) {
    return (
        <TouchableOpacity onPress={onPress} style={tw`flex-1 flex-col items-center justify-end gap-1`}>
            <MaterialIcons name={icon} size={24} color="#64748b" />
            <Text style={tw`text-[10px] font-medium tracking-wide text-slate-500`}>{label}</Text>
        </TouchableOpacity>
    );
}
