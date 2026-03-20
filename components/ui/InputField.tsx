import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Control, useController } from 'react-hook-form';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import tw from '../../utils/tailwind';

interface InputFieldProps extends TextInputProps {
    name: string;
    control: Control<any>;
    label: string;
    icon?: keyof typeof MaterialIcons.glyphMap;
    isPassword?: boolean;
}

export function InputField({
    name,
    control,
    label,
    icon,
    isPassword,
    style,
    ...props
}: InputFieldProps) {
    const {
        field: { onChange, onBlur, value },
        fieldState: { error },
    } = useController({ name, control });

    const [isFocused, setIsFocused] = React.useState(false);

    return (
        <View style={tw`mb-4`}>
            <Text style={tw`text-slate-400 text-xs font-bold uppercase tracking-wider pl-1 mb-2`}>
                {label}
            </Text>

            <View style={[
                tw`h-14 rounded-xl border bg-black/40 flex-row items-center px-4 transition-all`,
                isFocused ? tw`border-primary shadow-[0_0_10px_rgba(0,76,112,0.2)]` : tw`border-white/10`,
                error ? tw`border-red-500` : tw``
            ]}>
                {icon && <MaterialIcons name={icon} size={20} color={isFocused ? "#004C70" : "#64748b"} style={tw`mr-3`} />}

                <TextInput
                    style={[tw`flex-1 text-white text-base h-full`, style]}
                    onBlur={() => {
                        setIsFocused(false);
                        onBlur();
                    }}
                    onFocus={() => setIsFocused(true)}
                    onChangeText={onChange}
                    value={value}
                    placeholderTextColor="#64748b"
                    secureTextEntry={isPassword}
                    {...props}
                />
            </View>

            {error && (
                <Text style={tw`text-red-400 text-xs mt-1 ml-1`}>
                    {error.message}
                </Text>
            )}
        </View>
    );
}
