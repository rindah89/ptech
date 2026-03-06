import { MaterialIcons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import tw from '../../utils/tailwind';

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    return (
        <View style={tw`absolute bottom-0 left-0 right-0 border-t border-white/5 bg-surface-dark pb-6 pt-3 px-6 flex-row justify-between items-end shadow-2xl`}>
            {state.routes.filter(route => {
                const { options } = descriptors[route.key];
                const ALLOWED_TABS = ['index', 'explore', 'wallet', 'history'];
                return (options as any).href !== null && ALLOWED_TABS.includes(route.name);
            }).map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === state.routes.findIndex(r => r.key === route.key);

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                const getIcon = (name: string): keyof typeof MaterialIcons.glyphMap => {
                    switch (name) {
                        case 'index': return 'map';
                        case 'explore': return 'explore';
                        case 'wallet': return 'account-balance-wallet';
                        case 'history': return 'history';
                        case 'vehicles': return 'directions-car';
                        case 'profile': return 'person';
                        default: return 'help-outline';
                    }
                };

                const getLabel = (name: string) => {
                    switch (name) {
                        case 'index': return 'Map';
                        case 'explore': return 'Explore';
                        case 'wallet': return 'Wallet';
                        case 'history': return 'History';
                        case 'vehicles': return 'Vehicles';
                        case 'profile': return 'Profile';
                        default: return label;
                    }
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={(options as any).tabBarAccessibilityLabel}
                        testID={(options as any).tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={tw`flex-1 flex-col items-center gap-1.5`}
                    >
                        <MaterialIcons
                            name={getIcon(route.name)}
                            size={24}
                            color={isFocused ? '#3b82f6' : '#64748b'}
                        />
                        <Text style={[
                            tw`text-[10px] font-bold tracking-wide`,
                            { color: isFocused ? '#3b82f6' : '#64748b' }
                        ]}>
                            {getLabel(route.name) as any}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
