import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import tw from '../../utils/tailwind';

export default function Scanner() {
    return (
        <View style={tw`flex-1 bg-background-dark`}>
            {/* Header */}
            <View style={tw`flex-row items-center justify-between p-4 z-20 pt-12 absolute top-0 w-full`}>
                <TouchableOpacity onPress={() => router.back()} style={tw`h-10 w-10 items-center justify-center rounded-full bg-white/10`}>
                    <MaterialIcons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={tw`text-white text-lg font-bold tracking-tight`}>Scan to Pay</Text>
                <TouchableOpacity style={tw`h-10 w-10 items-center justify-center rounded-full bg-white/10`}>
                    <MaterialIcons name="help" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Camera Viewfinder Area */}
            <View style={tw`flex-1 flex-col items-center justify-center w-full relative`}>
                {/* Fake Camera Feed Background */}
                <ImageBackground
                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFxLDDgQiEkqrcq47MdwzIExLvy3-IFIY9BhL2TcsnlVh9k3O1ka86vrsfFRUkzXlgM0zrft6yzlBc2iY4BZXSiKgn_qXA3vBe7nenZIz-ngFOpFW5C973KSdQIP7r7bZ7Bsvi1x8bKiaKMByhFnzvoupIs-hrTsFEq2yd5aEwPicurJzzmpRRwX7lmpqQJSePMdlfG5yj5qRyowPnpNaacIdAr77G-R_KHkVhY_qAQnHTmG4ZkcNkd_7BFckwzTKNqM2gYWQ68qfd' }}
                    style={tw`absolute inset-0 opacity-40`}
                    blurRadius={5}
                />
                <LinearGradient
                    colors={['rgba(15,17,21,0.8)', 'transparent', 'rgba(15,17,21,0.9)']}
                    style={tw`absolute inset-0`}
                />

                {/* Scanner Frame */}
                <View style={tw`relative z-10 w-64 h-64 border-2 border-primary/30 rounded-xl bg-black/20 shadow-lg items-center justify-center overflow-hidden`}>
                    {/* Corner Accents */}
                    <View style={tw`absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl`} />
                    <View style={tw`absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl`} />
                    <View style={tw`absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl`} />
                    <View style={tw`absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl`} />

                    {/* Static Scan Line (since animations require Reanimated) */}
                    <LinearGradient colors={['transparent', '#004b73', 'transparent']} style={tw`w-full h-8 opacity-50 relative top-0`} />
                </View>

                <Text style={tw`z-10 mt-8 text-slate-200 text-sm font-medium text-center bg-black/40 px-4 py-2 rounded-full border border-white/5`}>
                    Align QR code within the frame to scan
                </Text>

                <TouchableOpacity onPress={() => router.push('/parking/duration')} style={tw`z-10 mt-6 flex-row items-center gap-2 px-5 py-2.5 rounded-full bg-surface-dark/80 border border-white/10`}>
                    <MaterialIcons name="flashlight-on" size={20} color="white" />
                    <Text style={tw`text-sm font-medium text-white`}>Flashlight</Text>
                </TouchableOpacity>
            </View>

            {/* Bottom Sheet */}
            <View style={tw`bg-surface-dark/95 border-t border-white/5 p-6 rounded-t-3xl shadow-lg -mt-4 z-20`}>
                <View style={tw`w-12 h-1 bg-white/20 rounded-full mx-auto mb-6`} />

                <View style={tw`flex-col gap-4`}>
                    <Text style={tw`text-slate-400 text-sm mb-2 text-center`}>Camera blocked or not working?</Text>

                    <TouchableOpacity onPress={() => router.push('/parking/duration')} style={tw`w-full flex-row items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10`}>
                        <View style={tw`flex-row items-center gap-3`}>
                            <View style={tw`h-10 w-10 rounded-lg bg-primary/20 items-center justify-center`}>
                                <MaterialIcons name="keyboard" size={24} color="#004b73" />
                            </View>
                            <View>
                                <Text style={tw`text-white font-bold text-base`}>Enter Zone Code Manually</Text>
                                <Text style={tw`text-slate-400 text-xs`}>Type the 6-digit code on the sign</Text>
                            </View>
                        </View>
                        <MaterialIcons name="chevron-right" size={24} color="#94a3b8" />
                    </TouchableOpacity>

                    <TouchableOpacity style={tw`w-full flex-row items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-white/20`}>
                        <MaterialIcons name="image" size={18} color="#cbd5e1" />
                        <Text style={tw`text-slate-300 text-sm font-medium`}>Upload QR from Gallery</Text>
                    </TouchableOpacity>
                </View>
                <View style={tw`h-6`} />
            </View>
        </View>
    );
}
