import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { ScreenHeader } from '../../components/ui/ScreenHeader';
import { useAuthStore } from '../../store/authStore';
import tw from '../../utils/tailwind';

export default function Settings() {
    const user = useAuthStore(state => state.user);
    const [pushEnabled, setPushEnabled] = useState(true);
    const [emailEnabled, setEmailEnabled] = useState(false);
    const [smsEnabled, setSmsEnabled] = useState(true);

    return (
        <View style={tw`flex-1 bg-background-dark overflow-hidden`}>
            <ScreenHeader title="Settings" />
            <ScrollView style={tw`flex-1 px-5 pt-4`}>

                <View style={tw`mb-8`}>
                    <Text style={tw`text-primary font-bold tracking-widest text-xs uppercase mb-4 ml-1`}>Account Information</Text>
                    <View style={tw`bg-surface-dark rounded-2xl border border-white/5 overflow-hidden`}>
                        <SettingRow label="First Name" value={user?.firstName || 'User'} />
                        <SettingRow label="Last Name" value={user?.lastName || 'Name'} />
                        <SettingRow label="Email" value={user?.email || 'email@example.com'} />
                        <SettingRow label="Phone" value="+237 ••• ••• •••" noBorder />
                    </View>
                </View>

                <View style={tw`mb-8`}>
                    <Text style={tw`text-primary font-bold tracking-widest text-xs uppercase mb-4 ml-1`}>Notifications</Text>
                    <View style={tw`bg-surface-dark rounded-2xl border border-white/5 flex-col`}>
                        <View style={tw`flex-row items-center justify-between p-4 border-b border-slate-800`}>
                            <Text style={tw`text-slate-200 font-medium text-base`}>Push Notifications</Text>
                            <Switch
                                value={pushEnabled}
                                onValueChange={setPushEnabled}
                                trackColor={{ false: '#334155', true: '#004C70' }}
                            />
                        </View>
                        <View style={tw`flex-row items-center justify-between p-4 border-b border-slate-800`}>
                            <Text style={tw`text-slate-200 font-medium text-base`}>Email Receipts</Text>
                            <Switch
                                value={emailEnabled}
                                onValueChange={setEmailEnabled}
                                trackColor={{ false: '#334155', true: '#004C70' }}
                            />
                        </View>
                        <View style={tw`flex-row items-center justify-between p-4`}>
                            <Text style={tw`text-slate-200 font-medium text-base`}>SMS Alerts</Text>
                            <Switch
                                value={smsEnabled}
                                onValueChange={setSmsEnabled}
                                trackColor={{ false: '#334155', true: '#004C70' }}
                            />
                        </View>
                    </View>
                </View>

                <View style={tw`mb-12`}>
                    <TouchableOpacity style={tw`flex-row items-center justify-center p-4 bg-red-500/10 border border-red-500/20 rounded-xl`}>
                        <MaterialIcons name="delete-outline" size={20} color="#ef4444" style={tw`mr-2`} />
                        <Text style={tw`text-red-500 font-bold`}>Delete Account</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
}

function SettingRow({ label, value, noBorder }: { label: string, value: string, noBorder?: boolean }) {
    return (
        <View style={tw`flex-row items-center justify-between p-4 ${noBorder ? '' : 'border-b border-slate-800'}`}>
            <Text style={tw`text-slate-400 font-medium`}>{label}</Text>
            <Text style={tw`text-slate-200 font-semibold`}>{value}</Text>
        </View>
    );
}
