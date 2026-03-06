import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import tw from '../../utils/tailwind';

export default function Profile() {
    const user = useAuthStore(state => state.user);
    const logout = useAuthStore(state => state.logout);

    const handleLogout = () => {
        logout();
        router.replace('/auth/sign-in');
    };

    return (
        <View style={tw`bg-background-dark h-full w-full flex-1 overflow-hidden`}>
            <ScrollView contentContainerStyle={tw`pb-20`} style={tw`flex-1`}>
                {/* Header Section */}
                <LinearGradient
                    colors={['#0f1115', '#003b5c']}
                    style={tw`pt-12 pb-24 px-4 rounded-b-[2.5rem] shadow-2xl border-b border-white/5 relative`}
                >
                    <View style={tw`flex-row items-center justify-between mb-6`}>
                        <TouchableOpacity onPress={() => router.back()} style={tw`p-2 rounded-full bg-white/10`}>
                            <MaterialIcons name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                        <Text style={tw`text-white text-lg font-bold tracking-tight`}>Profile</Text>
                        <TouchableOpacity style={tw`p-2 rounded-full`}>
                            <MaterialIcons name="more-vert" size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* Profile Card Floating */}
                    <View style={tw`absolute left-4 right-4 -bottom-16`}>
                        <View style={tw`bg-surface-dark rounded-2xl p-6 flex-col items-center border border-white/5 shadow-2xl`}>
                            <View style={tw`relative -mt-16 mb-3`}>
                                <View style={tw`w-24 h-24 rounded-full border-4 border-surface-dark overflow-hidden shadow-lg bg-slate-700`}>
                                    <Image
                                        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFTdNbN3xy2gYUFeFyxV4KN8-xPXXxTO7znBYxAUmu8x14KKqqSBLxCzrjlnnTNr2B-DUYmrCRAw9HwWzhYaCHkE0bwk1Py0mIuQFNxWis_bSj5EUPW7rGy_TmdEtlLJmxmqQEz9h0_-FRST3eiTsy8MpjMFxTxmJ5BgBggOhcSARPa1XgNUjvBzFQd-wEbZBqZqf3dsqq76yxL6wcoMvr7pbB0ry9P-iduWG0yBJIp0wWD-FQV8m4YOjf52nj2RXqQuyAGycV9uY2' }}
                                        style={tw`w-full h-full`}
                                        resizeMode="cover"
                                    />
                                </View>
                                <TouchableOpacity style={tw`absolute bottom-0 right-0 bg-secondary p-1.5 rounded-full border-2 border-surface-dark shadow-lg`}>
                                    <MaterialIcons name="edit" size={14} color="white" />
                                </TouchableOpacity>
                            </View>

                            <Text style={tw`text-white text-xl font-bold text-center mb-1`}>{user?.firstName} {user?.lastName}</Text>
                            <Text style={tw`text-slate-400 text-sm font-medium text-center mb-4`}>{user?.email}</Text>

                            <View style={tw`w-full flex-row justify-center gap-4`}>
                                <View style={tw`flex-col items-center p-3 bg-slate-800/50 rounded-xl w-24 border border-white/5`}>
                                    <Text style={tw`text-primary font-bold text-lg`}>12</Text>
                                    <Text style={tw`text-xs text-slate-400`}>Parkings</Text>
                                </View>
                                <View style={tw`flex-col items-center p-3 bg-slate-800/50 rounded-xl w-24 border border-white/5`}>
                                    <Text style={tw`text-secondary font-bold text-lg`}>4.8</Text>
                                    <Text style={tw`text-xs text-slate-400`}>Rating</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </LinearGradient>

                <View style={tw`h-20`} />

                {/* Settings List */}
                <View style={tw`px-4 py-4 flex-col gap-3`}>
                    <SettingItem onPress={() => router.push('/profile/settings')} icon="person" title="Account Settings" />
                    <SettingItem onPress={() => router.push('/(tabs)/vehicles')} icon="directions-car" title="Vehicle Management" />
                    <SettingItem onPress={() => router.push('/(tabs)/wallet')} icon="account-balance-wallet" title="Payment Methods" />
                    <SettingItem onPress={() => router.push('/profile/settings')} icon="notifications" title="Notification Preferences" />
                    <SettingItem onPress={() => router.push('/profile/support')} icon="support-agent" title="Support & Help" />

                    {/* Logout Button */}
                    <View style={tw`pt-6 pb-8`}>
                        <Button label="Logout" variant="danger" onPress={handleLogout} icon="logout" />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

function SettingItem({ icon, title, onPress }: { icon: keyof typeof MaterialIcons.glyphMap, title: string, onPress?: () => void }) {
    return (
        <TouchableOpacity onPress={onPress} style={tw`w-full flex-row items-center justify-between p-4 bg-surface-dark rounded-xl border border-white/5 shadow-lg`}>
            <View style={tw`flex-row items-center gap-4`}>
                <View style={tw`w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center`}>
                    <MaterialIcons name={icon} size={20} color="#004C70" />
                </View>
                <Text style={tw`text-slate-200 font-medium text-base`}>{title}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#64748b" />
        </TouchableOpacity>
    );
}
