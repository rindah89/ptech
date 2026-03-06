import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import tw from '../../utils/tailwind';

interface ButtonProps extends TouchableOpacityProps {
    label: string;
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    icon?: keyof typeof MaterialIcons.glyphMap;
    loading?: boolean;
}

export function Button({
    label,
    variant = 'primary',
    size = 'lg',
    icon,
    loading,
    style,
    disabled,
    ...props
}: ButtonProps) {

    const isPrimary = variant === 'primary';
    const isDanger = variant === 'danger';

    const baseContainer = tw`rounded-xl overflow-hidden shadow-lg flex-row items-center justify-center gap-2`;
    const sizeClasses = {
        sm: tw`py-2 px-4`,
        md: tw`py-3 px-6 text-base`,
        lg: tw`py-4 px-8 text-lg`,
    };

    const labelStyles = tw`font-bold tracking-wide`;

    if (isPrimary || isDanger) {
        const colors = isPrimary ? ['#3b82f6', '#2563eb'] : ['#ef4444', '#dc2626'];

        return (
            <TouchableOpacity disabled={disabled || loading} style={[tw`w-full`, style]} {...props}>
                <LinearGradient
                    colors={(disabled ? ['#475569', '#334155'] : colors) as any}
                    style={[baseContainer, sizeClasses[size], tw`${disabled ? 'opacity-70' : ''}`]}
                >
                    {icon && !loading && <MaterialIcons name={icon} size={20} color="white" />}
                    <Text style={[labelStyles, tw`text-white`]}>
                        {loading ? 'Processing...' : label}
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    // Secondary or Ghost
    return (
        <TouchableOpacity
            disabled={disabled || loading}
            style={[
                baseContainer,
                sizeClasses[size],
                variant === 'secondary' ? tw`bg-surface-dark border border-white/10` : tw`bg-transparent border border-transparent`,
                tw`${disabled ? 'opacity-50' : ''}`,
                style
            ]}
            {...props}
        >
            {icon && !loading && <MaterialIcons name={icon} size={20} color={variant === 'secondary' ? "white" : "#94a3b8"} />}
            <Text style={[labelStyles, tw`${variant === 'secondary' ? 'text-white' : 'text-slate-400 hover:text-white'}`]}>
                {loading ? 'Please wait...' : label}
            </Text>
        </TouchableOpacity>
    );
}
