import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScreenHeader } from '../../components/ui/ScreenHeader';
import { useParkingStore } from '../../store/parkingStore';
import tw from '../../utils/tailwind';

export default function Vehicles() {
    const vehicles = useParkingStore(state => state.vehicles);
    const removeVehicle = useParkingStore(state => state.removeVehicle);
    const fetchVehicles = useParkingStore(state => state.fetchVehicles);

    React.useEffect(() => {
        fetchVehicles();
    }, [fetchVehicles]);

    const getIconForType = (type: string) => {
        switch (type) {
            case 'Motorcycle': return 'two-wheeler';
            case 'Truck': return 'local-shipping';
            default: return 'directions-car';
        }
    };

    return (
        <View style={tw`bg-background-dark min-h-screen flex-1 relative overflow-hidden`}>
            <ScreenHeader title="VEHICLES" showBack={false} />

            {/* Main Content */}
            <View style={tw`px-6 pt-6 flex-1`}>
                {/* Search Bar */}
                <View style={tw`flex-row items-center bg-black/40 border border-white/5 h-14 rounded-2xl px-4 mb-8`}>
                    <MaterialIcons name="search" size={24} color="#666" style={tw`mr-3`} />
                    <TextInput
                        style={tw`flex-1 text-white text-base h-full`}
                        placeholder="Search vehicles..."
                        placeholderTextColor="#666"
                    />
                    <TouchableOpacity style={tw`ml-2`}>
                        <MaterialIcons name="tune" size={24} color="#f97316" />
                    </TouchableOpacity>
                </View>

                {/* Vehicles List */}
                <ScrollView contentContainerStyle={tw`pb-32`} showsVerticalScrollIndicator={false}>
                    {vehicles.length === 0 ? (
                        <View style={tw`items-center justify-center py-20`}>
                            <MaterialIcons name="directions-car" size={64} color="#333" style={tw`mb-4`} />
                            <Text style={tw`text-slate-400 text-lg`}>No vehicles added yet.</Text>
                        </View>
                    ) : (
                        vehicles.map((vehicle) => (
                            <View key={vehicle.id} style={tw`bg-surface-dark border border-white/5 rounded-3xl p-5 mb-4 shadow-lg flex-row items-center`}>
                                <View style={tw`relative w-16 h-16 bg-black/50 rounded-2xl border border-white/5 items-center justify-center shadow-lg mr-4`}>
                                    <MaterialIcons name={getIconForType(vehicle.type)} size={32} color="#f97316" />
                                </View>

                                <View style={tw`flex-1`}>
                                    <View style={tw`flex-row items-center justify-between mb-1`}>
                                        <Text style={tw`text-white font-bold text-lg`} numberOfLines={1}>
                                            {vehicle.nickname || `${vehicle.type} ${vehicle.plateNumber}`}
                                        </Text>
                                        {vehicle.isDefault && (
                                            <View style={tw`bg-[#f97316]/20 px-2 py-1 rounded-md`}>
                                                <Text style={tw`text-[#f97316] text-[10px] font-bold uppercase tracking-wider`}>Default</Text>
                                            </View>
                                        )}
                                    </View>
                                    <Text style={tw`text-base text-slate-400 font-medium tracking-widest`}>{vehicle.plateNumber}</Text>
                                </View>

                                <TouchableOpacity
                                    onPress={() => removeVehicle(vehicle.id)}
                                    style={tw`w-12 h-12 bg-white/5 border border-white/10 rounded-full items-center justify-center ml-2`}
                                >
                                    <MaterialIcons name="delete-outline" size={20} color="#ef4444" />
                                </TouchableOpacity>
                            </View>
                        ))
                    )}
                </ScrollView>
            </View>

            {/* Floating Action Button */}
            <TouchableOpacity
                onPress={() => router.push('/parking/add-vehicle')}
                style={tw`absolute bottom-28 right-6 h-16 w-16 rounded-full overflow-hidden shadow-[0_4px_20px_rgba(249,115,22,0.4)] z-50 border-2 border-[#121212] flex items-center justify-center bg-[#f97316]`}
            >
                <MaterialIcons name="add" size={32} color="white" />
            </TouchableOpacity>
        </View>
    );
}
