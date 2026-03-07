import { MaterialIcons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { InputField } from '../../components/ui/InputField';
import { ScreenHeader } from '../../components/ui/ScreenHeader';
import { vehicleSchema } from '../../schemas';
import { useParkingStore } from '../../store/parkingStore';
import tw from '../../utils/tailwind';

export default function AddVehicle() {
    const addVehicle = useParkingStore(state => state.addVehicle);
    const [vehicleType, setVehicleType] = useState<'Car' | 'Motorcycle' | 'Truck'>('Car');

    const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        resolver: zodResolver(vehicleSchema),
        defaultValues: { plateNumber: '', nickname: '', type: 'Car', isDefault: false }
    });

    const onSubmit = async (data: any) => {
        await addVehicle(data);
        router.back();
    };

    return (
        <View style={tw`bg-background-dark min-h-screen flex-1`}>
            <ScreenHeader title="ADD VEHICLE" />

            <ScrollView contentContainerStyle={tw`pb-32`} showsVerticalScrollIndicator={false}>
                <View style={tw`w-full items-center justify-center py-10 my-4`}>
                    <TouchableOpacity style={tw`h-36 w-36 rounded-full border border-dashed border-white/20 items-center justify-center mb-4 overflow-hidden relative group bg-surface-dark`}>
                        <View style={tw`absolute inset-0 bg-primary/5 rounded-full`} />
                        <MaterialIcons name="camera-alt" size={40} color="#666" style={tw`mb-2`} />
                        <Text style={tw`text-[#888] text-xs font-semibold tracking-wider`}>ADD PHOTO</Text>
                    </TouchableOpacity>
                </View>

                <View style={tw`bg-surface-dark flex-1 rounded-t-[40px] px-8 pt-10 border-t border-white/5`}>

                    <InputField
                        name="nickname"
                        control={control}
                        label="Vehicle Nickname (Optional)"
                        placeholder="e.g. My Daily Driver"
                        icon="directions-car"
                    />

                    <InputField
                        name="plateNumber"
                        control={control}
                        label="License Plate Number"
                        placeholder="e.g. CE-102-AB"
                        autoCapitalize="characters"
                        maxLength={9}
                        icon="payment"
                    />

                    <View style={tw`mt-4 mb-8`}>
                        <Text style={tw`text-slate-400 text-xs font-bold uppercase tracking-wider pl-1 mb-4`}>Vehicle Type</Text>
                        {errors.type && <Text style={tw`text-red-500 text-xs mb-2`}>{errors.type.message}</Text>}
                        <View style={tw`flex-row justify-between w-full`}>
                            <TouchableOpacity
                                onPress={() => { setVehicleType('Car'); setValue('type', 'Car'); }}
                                style={[
                                    tw`flex-1 items-center justify-center p-4 rounded-2xl border`,
                                    vehicleType === 'Car' ? tw`border-primary bg-primary/10` : tw`border-white/5 bg-background-dark`
                                ]}
                            >
                                <MaterialIcons name="directions-car" size={32} color={vehicleType === 'Car' ? '#f27f0d' : '#888'} />
                                <Text style={tw`text-xs font-bold mt-2 ${vehicleType === 'Car' ? 'text-[#f27f0d]' : 'text-[#888]'}`}>Car</Text>
                            </TouchableOpacity>

                            <View style={tw`w-4`} />

                            <TouchableOpacity
                                onPress={() => { setVehicleType('Motorcycle'); setValue('type', 'Motorcycle'); }}
                                style={[
                                    tw`flex-1 items-center justify-center p-4 rounded-2xl border`,
                                    vehicleType === 'Motorcycle' ? tw`border-primary bg-primary/10` : tw`border-white/5 bg-background-dark`
                                ]}
                            >
                                <MaterialIcons name="two-wheeler" size={32} color={vehicleType === 'Motorcycle' ? '#f27f0d' : '#888'} />
                                <Text style={tw`text-xs font-bold mt-2 ${vehicleType === 'Motorcycle' ? 'text-[#f27f0d]' : 'text-[#888]'}`}>Moto</Text>
                            </TouchableOpacity>

                            <View style={tw`w-4`} />

                            <TouchableOpacity
                                onPress={() => { setVehicleType('Truck'); setValue('type', 'Truck'); }}
                                style={[
                                    tw`flex-1 items-center justify-center p-4 rounded-2xl border`,
                                    vehicleType === 'Truck' ? tw`border-primary bg-primary/10` : tw`border-white/5 bg-background-dark`
                                ]}
                            >
                                <MaterialIcons name="local-shipping" size={32} color={vehicleType === 'Truck' ? '#f27f0d' : '#888'} />
                                <Text style={tw`text-xs font-bold mt-2 ${vehicleType === 'Truck' ? 'text-[#f27f0d]' : 'text-[#888]'}`}>Truck</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Button
                        label="Save Vehicle"
                        onPress={handleSubmit(onSubmit)}
                        icon="check-circle"
                    />
                </View>
            </ScrollView>
        </View>
    );
}
