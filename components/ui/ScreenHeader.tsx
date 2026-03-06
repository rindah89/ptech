import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import tw from '../../utils/tailwind';

interface ScreenHeaderProps {
    title: string;
    showBack?: boolean;
    rightIcon?: keyof typeof MaterialIcons.glyphMap;
    onRightPress?: () => void;
    transparent?: boolean;
}

export function ScreenHeader({
    title,
    showBack = true,
    rightIcon,
    onRightPress,
    transparent = false
}: ScreenHeaderProps) {

    return (
        <View style={[
            tw`flex-row items-center justify-between px-5 pt-12 pb-4 z-20`,
            transparent ? tw`bg-transparent absolute top-0 w-full` : tw`bg-background-dark/95 border-b border-white/5`
        ]}>
            {showBack ? (
                <TouchableOpacity onPress={() => router.back()} style={tw`h-10 w-10 items-center justify-center rounded-full bg-white/10`}>
                    <MaterialIcons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
            ) : (
                <View style={tw`h-10 w-10`} /> // Spacer
            )}

            <Text style={[
                tw`text-white font-bold tracking-wide text-center flex-1`,
                tw`${title.length > 20 ? 'text-base' : 'text-lg uppercase'}`
            ]}>
                {title}
            </Text>

            {rightIcon ? (
                <TouchableOpacity onPress={onRightPress} style={tw`h-10 w-10 items-center justify-center rounded-full bg-white/10`}>
                    <MaterialIcons name={rightIcon} size={20} color="white" />
                </TouchableOpacity>
            ) : (
                <View style={tw`h-10 w-10`} /> // Spacer
            )}
        </View>
    );
}
