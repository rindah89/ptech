import React from 'react';
import { View, ViewProps } from 'react-native';
import tw from '../../utils/tailwind';

interface GlassCardProps extends ViewProps {
    children: React.ReactNode;
    variant?: 'dark' | 'highlight' | 'accent';
    blurLevel?: 'sm' | 'md' | 'lg';
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function GlassCard({
    children,
    variant = 'dark',
    blurLevel = 'md',
    padding = 'lg',
    style,
    ...props
}: GlassCardProps) {

    const bgClasses = {
        dark: 'bg-surface-dark/60',
        highlight: 'bg-surface-highlight/70',
        accent: 'bg-primary/10',
    };

    const paddingClasses = {
        none: 'p-0',
        sm: 'p-3',
        md: 'p-5',
        lg: 'p-6',
    };

    return (
        <View
            style={[
                tw`rounded-2xl border border-white/5 overflow-hidden relative`,
                tw`${bgClasses[variant]} ${paddingClasses[padding]}`,
                {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 15,
                    elevation: 8,
                },
                style
            ]}
            {...props}
        >
            {variant === 'accent' && (
                <View style={tw`absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none`} />
            )}
            {children}
        </View>
    );
}
