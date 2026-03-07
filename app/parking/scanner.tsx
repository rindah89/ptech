import { MaterialIcons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import tw from '../../utils/tailwind';

export default function Scanner() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [flash, setFlash] = useState(false);

    if (!permission) {
        // Camera permissions are still loading.
        return <View style={tw`flex-1 bg-background-dark`} />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={tw`flex-1 bg-background-dark justify-center items-center p-6`}>
                <MaterialIcons name="camera-alt" size={64} color="#64748b" style={tw`mb-4`} />
                <Text style={tw`text-white text-xl font-bold mb-2 text-center`}>Camera Permission Required</Text>
                <Text style={tw`text-slate-400 text-center mb-8`}>
                    We need your permission to show the camera inside the app to scan QR codes.
                </Text>
                <TouchableOpacity
                    onPress={requestPermission}
                    style={tw`bg-primary px-8 py-3 rounded-xl`}
                >
                    <Text style={tw`text-white font-bold text-base`}>Grant Permission</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.back()} style={tw`mt-4 p-2`}>
                    <Text style={tw`text-slate-400 font-medium`}>Cancel</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const handleBarcodeScanned = ({ type, data }: { type: string; data: string }) => {
        if (scanned) return;
        setScanned(true);
        // Assuming the QR code contains the zone code or a relevant URL
        // In a real scenario, you'd parse this data
        console.log(`Bar code with type ${type} and data ${data} has been scanned!`);

        // Temporarily routing to the duration page to signify success
        router.push({
            pathname: '/parking/duration',
            params: { zoneCode: data }
        });

        // Allow scanning again after a delay if they return to this screen
        setTimeout(() => setScanned(false), 2000);
    };

    const toggleFlash = () => {
        setFlash(!flash);
    };

    return (
        <View style={tw`flex-1 bg-black`}>
            {/* Header */}
            <View style={tw`flex-row items-center justify-between p-4 z-20 pt-12 absolute top-0 w-full`}>
                <TouchableOpacity onPress={() => router.back()} style={tw`h-10 w-10 items-center justify-center rounded-full bg-black/40`}>
                    <MaterialIcons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={tw`text-white text-lg font-bold tracking-tight`}>Scan to Pay</Text>
                <TouchableOpacity style={tw`h-10 w-10 items-center justify-center rounded-full bg-black/40`}>
                    <MaterialIcons name="help" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Camera Viewfinder Area */}
            <View style={tw`flex-1 flex-col items-center justify-center w-full relative overflow-hidden`}>
                <CameraView
                    style={tw`absolute inset-0`}
                    facing="back"
                    enableTorch={flash}
                    onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
                    barcodeScannerSettings={{
                        barcodeTypes: ["qr"],
                    }}
                />

                <LinearGradient
                    colors={['rgba(0,0,0,0.7)', 'transparent', 'rgba(0,0,0,0.8)']}
                    style={tw`absolute inset-0`}
                    pointerEvents="none"
                />

                {/* Scanner Frame */}
                <View style={tw`relative z-10 w-64 h-64 border border-white/20 rounded-xl bg-transparent items-center justify-center overflow-visible`}>
                    {/* Corner Accents */}
                    <View style={tw`absolute -top-1 -left-1 w-10 h-10 border-t-4 border-l-4 border-primary rounded-tl-xl`} />
                    <View style={tw`absolute -top-1 -right-1 w-10 h-10 border-t-4 border-r-4 border-primary rounded-tr-xl`} />
                    <View style={tw`absolute -bottom-1 -left-1 w-10 h-10 border-b-4 border-l-4 border-primary rounded-bl-xl`} />
                    <View style={tw`absolute -bottom-1 -right-1 w-10 h-10 border-b-4 border-r-4 border-primary rounded-br-xl`} />

                    {/* Static Scan Line */}
                    <LinearGradient colors={['transparent', 'rgba(0, 163, 255, 0.4)', 'transparent']} style={tw`w-full h-1/2 opacity-50 relative top-0`} />
                </View>

                <Text style={tw`z-10 mt-12 text-slate-200 text-sm font-medium text-center bg-black/60 px-5 py-2.5 rounded-full border border-white/10`}>
                    Align QR code within the frame to scan
                </Text>

                <TouchableOpacity
                    onPress={toggleFlash}
                    style={tw`z-10 mt-6 flex-row items-center gap-2 px-5 py-2.5 rounded-full bg-black/50 border border-white/10 ${flash ? 'bg-primary/20 border-primary/50' : ''}`}
                >
                    <MaterialIcons name={flash ? "flashlight-off" : "flashlight-on"} size={20} color={flash ? "#38bdf8" : "white"} />
                    <Text style={tw`text-sm font-medium ${flash ? 'text-sky-400' : 'text-white'}`}>
                        {flash ? 'Turn Off Flash' : 'Turn On Flash'}
                    </Text>
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
