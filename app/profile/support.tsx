import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ScreenHeader } from '../../components/ui/ScreenHeader';
import tw from '../../utils/tailwind';

export default function Support() {
    return (
        <View style={tw`flex-1 bg-background-dark overflow-hidden`}>
            <ScreenHeader title="Support & Help" />
            <ScrollView style={tw`flex-1 px-5 pt-4`}>

                <View style={tw`items-center justify-center py-8 mb-4`}>
                    <View style={tw`w-20 h-20 rounded-full bg-primary/20 items-center justify-center mb-4`}>
                        <MaterialIcons name="headset-mic" size={40} color="#004C70" />
                    </View>
                    <Text style={tw`text-white text-xl font-bold mb-2`}>How can we help you?</Text>
                    <Text style={tw`text-slate-400 text-center px-4`}>We're here to help you with any issues related to PTech parking.</Text>
                </View>

                <View style={tw`mb-8`}>
                    <Text style={tw`text-primary font-bold tracking-widest text-xs uppercase mb-4 ml-1`}>Contact Us</Text>

                    <TouchableOpacity
                        onPress={() => Linking.openURL('tel:+237600000000')}
                        style={tw`flex-row items-center p-4 bg-surface-dark border border-white/5 rounded-t-2xl border-b-slate-800`}
                    >
                        <View style={tw`w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mr-4`}>
                            <MaterialIcons name="phone" size={20} color="#004C70" />
                        </View>
                        <View style={tw`flex-1`}>
                            <Text style={tw`text-slate-200 font-medium text-base`}>Call Support</Text>
                            <Text style={tw`text-slate-500 text-xs mt-0.5`}>Available Mon-Sat, 8am - 8pm</Text>
                        </View>
                        <MaterialIcons name="chevron-right" size={24} color="#64748b" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => Linking.openURL('mailto:support@ptech.cm')}
                        style={tw`flex-row items-center p-4 bg-surface-dark border border-white/5 border-b-slate-800`}
                    >
                        <View style={tw`w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mr-4`}>
                            <MaterialIcons name="email" size={20} color="#004C70" />
                        </View>
                        <View style={tw`flex-1`}>
                            <Text style={tw`text-slate-200 font-medium text-base`}>Email Us</Text>
                            <Text style={tw`text-slate-500 text-xs mt-0.5`}>support@ptech.cm</Text>
                        </View>
                        <MaterialIcons name="chevron-right" size={24} color="#64748b" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => Linking.openURL('whatsapp://send?phone=+237600000000')}
                        style={tw`flex-row items-center p-4 bg-surface-dark border border-white/5 rounded-b-2xl`}
                    >
                        <View style={tw`w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mr-4`}>
                            <MaterialIcons name="chat" size={20} color="#25D366" />
                        </View>
                        <View style={tw`flex-1`}>
                            <Text style={tw`text-slate-200 font-medium text-base`}>WhatsApp Chat</Text>
                            <Text style={tw`text-slate-500 text-xs mt-0.5`}>Fastest response time</Text>
                        </View>
                        <MaterialIcons name="chevron-right" size={24} color="#64748b" />
                    </TouchableOpacity>
                </View>

                <View style={tw`mb-12`}>
                    <Text style={tw`text-primary font-bold tracking-widest text-xs uppercase mb-4 ml-1`}>Resources</Text>
                    <View style={tw`bg-surface-dark rounded-2xl border border-white/5 overflow-hidden`}>
                        <ResourceRow label="FAQ" icon="help-outline" />
                        <ResourceRow label="Terms of Service" icon="description" />
                        <ResourceRow label="Privacy Policy" icon="privacy-tip" noBorder />
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}

function ResourceRow({ label, icon, noBorder }: { label: string, icon: any, noBorder?: boolean }) {
    return (
        <TouchableOpacity style={tw`flex-row items-center justify-between p-4 ${noBorder ? '' : 'border-b border-slate-800'}`}>
            <View style={tw`flex-row items-center`}>
                <MaterialIcons name={icon} size={20} color="#64748b" style={tw`mr-3`} />
                <Text style={tw`text-slate-300 font-medium`}>{label}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color="#64748b" />
        </TouchableOpacity>
    );
}
