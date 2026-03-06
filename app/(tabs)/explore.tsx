import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import tw from '../../utils/tailwind';

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={tw`flex-1 bg-background-dark overflow-hidden`}>
      {/* Header */}
      <LinearGradient
        colors={['#0f1115', '#003b5c']}
        style={tw`pt-16 pb-6 px-6 rounded-b-[2.5rem] shadow-2xl z-10 border-b border-white/5`}
      >
        <View style={tw`flex-row items-center justify-between mb-6`}>
          <Text style={tw`text-white text-3xl font-extrabold tracking-tight`}>Explore Douala</Text>
          <TouchableOpacity style={tw`w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700/50 items-center justify-center`}>
            <MaterialIcons name="map" size={20} color="#cbd5e1" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={tw`flex-row items-center bg-black/40 border border-white/10 h-14 rounded-2xl px-4 shadow-inner`}>
          <MaterialIcons name="search" size={24} color="#004C70" style={tw`mr-3`} />
          <TextInput
            style={tw`flex-1 text-white text-base h-full`}
            placeholder="Search for parking in Douala..."
            placeholderTextColor="#64748b"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={tw`ml-2 p-1 bg-primary/20 rounded-lg`}>
            <MaterialIcons name="tune" size={20} color="#004C70" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={tw`flex-1 -mt-4`} contentContainerStyle={tw`pt-8 pb-32`} showsVerticalScrollIndicator={false}>

        {/* Categories */}
        <View style={tw`mb-8`}>
          <Text style={tw`text-lg font-bold text-slate-200 px-6 mb-4`}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-6 gap-4`}>
            <CategoryCard icon="local-airport" title="Airport" count="2" color="#3b82f6" />
            <CategoryCard icon="shopping-basket" title="Malls" count="5" color="#f97316" active />
            <CategoryCard icon="business" title="Downtown" count="8" color="#8b5cf6" />
            <CategoryCard icon="event-seat" title="Events" count="3" color="#ec4899" />
          </ScrollView>
        </View>

        {/* Popular Zones */}
        <View style={tw`px-6 mb-8`}>
          <View style={tw`flex-row items-center justify-between mb-4`}>
            <Text style={tw`text-lg font-bold text-slate-200`}>Popular Zones</Text>
            <TouchableOpacity>
              <Text style={tw`text-primary text-xs font-bold uppercase`}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={tw`flex-col gap-4`}>
            <ZoneCard title="Douala Grand Mall" distance="1.2 km" available={45} price="500" imageContext="shopping" />
            <ZoneCard title="Akwa Business Center" distance="3.5 km" available={12} price="1000" imageContext="business" />
            <ZoneCard title="Bonanjo Administrative" distance="0.8 km" available={5} price="800" imageContext="admin" />
          </View>
        </View>

        {/* Recommended */}
        <View style={tw`mb-8`}>
          <Text style={tw`text-lg font-bold text-slate-200 px-6 mb-4`}>Recommended for You</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-6 gap-4`}>
            <RecommendedCard title="Bonapriso Secure Parking" type="Covered" price="1500" />
            <RecommendedCard title="Deido Market Express" type="Open" price="300" />
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

function CategoryCard({ icon, title, count, color, active }: any) {
  return (
    <TouchableOpacity style={tw`flex-col items-center justify-center p-4 rounded-2xl border ${active ? 'border-primary bg-primary/10' : 'border-white/5 bg-surface-dark'} w-24 shadow-lg`}>
      <View style={[tw`w-10 h-10 rounded-full items-center justify-center mb-2`, { backgroundColor: `${color}20` }]}>
        <MaterialIcons name={icon} size={22} color={color} />
      </View>
      <Text style={tw`text-white font-semibold text-xs mb-1`}>{title}</Text>
      <Text style={tw`text-slate-500 text-[10px]`}>{count} places</Text>
    </TouchableOpacity>
  );
}

function ZoneCard({ title, distance, available, price, imageContext }: any) {
  return (
    <TouchableOpacity style={tw`flex-row items-center p-3 bg-surface-dark rounded-2xl border border-white/5 shadow-lg`}>
      <View style={tw`w-20 h-20 bg-slate-800 rounded-xl mr-4 items-center justify-center overflow-hidden`}>
        <MaterialIcons name="local-parking" size={32} color="#004C70" />
      </View>
      <View style={tw`flex-1`}>
        <View style={tw`flex-row justify-between items-start mb-1`}>
          <Text style={tw`text-white font-bold text-base flex-1 mr-2`} numberOfLines={1}>{title}</Text>
          <View style={tw`bg-primary/20 px-2 py-1 rounded border border-primary/30`}>
            <Text style={tw`text-primary text-[10px] font-bold`}>{available} Spots</Text>
          </View>
        </View>
        <Text style={tw`text-slate-400 text-xs mb-2`}>{distance} away</Text>
        <View style={tw`flex-row items-baseline`}>
          <Text style={tw`text-secondary font-bold text-sm`}>{price} FCFA</Text>
          <Text style={tw`text-slate-500 text-[10px] ml-1`}>/ hour</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function RecommendedCard({ title, type, price }: any) {
  return (
    <TouchableOpacity style={tw`w-48 bg-surface-dark p-4 rounded-3xl border border-white/5 shadow-lg relative overflow-hidden`}>
      {/* Background design */}
      <View style={tw`absolute -right-8 -top-8 w-24 h-24 bg-primary/10 rounded-full`} />

      <View style={tw`flex-row justify-between items-start mb-6`}>
        <View style={tw`w-10 h-10 bg-slate-800/80 rounded-full items-center justify-center border border-white/5`}>
          <MaterialIcons name="star" size={20} color="#f59e0b" />
        </View>
        <View style={tw`bg-surface-highlight px-2 py-1 rounded`}>
          <Text style={tw`text-slate-300 text-[10px]`}>{type}</Text>
        </View>
      </View>

      <Text style={tw`text-white font-bold text-[15px] mb-2`} numberOfLines={2}>{title}</Text>

      <View style={tw`flex-row items-baseline mt-auto`}>
        <Text style={tw`text-white font-extrabold text-lg`}>{price}</Text>
        <Text style={tw`text-primary text-[10px] font-bold uppercase ml-1`}>FCFA/H</Text>
      </View>
    </TouchableOpacity>
  );
}
