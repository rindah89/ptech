import { MaterialIcons } from '@expo/vector-icons';
import Mapbox from '@rnmapbox/maps';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import tw from '../../utils/tailwind';

// Set the public access token provided by the user from environment variables
// @ts-ignore
Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_TOKEN || '');

const { height } = Dimensions.get('window');

export default function PTechHomeMapView() {
  return (
    <View style={tw`bg-background-dark flex-1`}>
      {/* Absolute Header with LinearGradient */}
      <View style={[tw`absolute top-0 left-0 right-0 z-30 pt-14 px-5 pb-5`]} pointerEvents="box-none">
        <LinearGradient
          colors={['rgba(15, 17, 21, 1)', 'rgba(15, 17, 21, 0.8)', 'transparent']}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />

        {/* Top Bar Navigation */}
        <View style={tw`flex-row items-center justify-between`}>
          <View style={tw`flex-row items-center gap-2`}>
            <Image
              source={require('../../assets/images/logofornonwhitebackgounds.png')}
              style={tw`h-8 w-24`}
              resizeMode="contain"
            />
          </View>

          <View style={tw`flex-row items-center gap-3`}>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/vehicles')}
              style={tw`h-10 w-10 items-center justify-center rounded-full bg-surface-dark/50 border border-white/10`}
            >
              <MaterialIcons name="directions-car" size={20} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/(tabs)/profile')}
              style={tw`h-10 w-10 items-center justify-center rounded-full bg-surface-dark/50 border border-white/10`}
            >
              <MaterialIcons name="person" size={20} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={tw`h-10 w-10 items-center justify-center rounded-full bg-surface-dark/50 border border-white/10`}>
              <MaterialIcons name="notifications" size={20} color="white" />
              <View style={tw`absolute top-2 right-2.5 h-2 w-2 rounded-full bg-primary shadow-sm`} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={tw`mt-4 w-full relative justify-center`}>
          <View style={tw`absolute left-4 z-10`}>
            <MaterialIcons name="search" size={24} color="#94a3b8" />
          </View>
          <TextInput
            style={tw`h-14 w-full rounded-2xl border border-white/10 bg-surface-dark/40 py-2 pl-12 pr-12 text-base text-white shadow-glass`}
            placeholder="Find parking in Douala..."
            placeholderTextColor="#94a3b8"
          />
          <TouchableOpacity style={tw`absolute right-3 flex h-9 w-9 items-center justify-center rounded-xl bg-surface-highlight/80 border border-white/5`}>
            <MaterialIcons name="tune" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mt-4 pl-1 no-scrollbar`} contentContainerStyle={tw`gap-3 pb-2`}>
          <TouchableOpacity style={[tw`rounded-full px-5 py-2 border border-primary/20 shadow-sm overflow-hidden`]}>
            <LinearGradient colors={['#f97316', '#ea580c']} style={StyleSheet.absoluteFill} />
            <Text style={tw`text-xs font-bold text-white z-10`}>All Zones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`rounded-full bg-surface-dark/60 px-5 py-2 border border-white/5`}>
            <Text style={tw`text-xs font-medium text-slate-300`}>Covered</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`rounded-full bg-surface-dark/60 px-5 py-2 border border-white/5`}>
            <Text style={tw`text-xs font-medium text-slate-300`}>Cheap</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Map Content */}
      <View style={tw`flex-1 w-full relative bg-background-dark overflow-hidden`}>
        <Mapbox.MapView
          style={StyleSheet.absoluteFillObject}
          styleURL={Mapbox.StyleURL.Dark}
          logoEnabled={false}
          attributionEnabled={false}
          scaleBarEnabled={false}
        >
          <Mapbox.Camera
            zoomLevel={15}
            centerCoordinate={[9.6841, 4.0328]} // Bonanjo, Douala
            animationMode="flyTo"
            animationDuration={2000}
          />

          <Mapbox.PointAnnotation id="douala_grand_mall" coordinate={[9.7347, 4.0202]}>
            <View style={tw`bg-surface-dark px-3 py-1.5 rounded-lg mb-2 shadow-xl border border-primary/40 flex-row items-center gap-1`}>
              <Text style={tw`text-xs font-bold text-white`}>100 CFA</Text>
            </View>
            <View style={tw`h-4 w-4 rounded-full bg-primary shadow-md border border-white mx-auto`} />
          </Mapbox.PointAnnotation>

          <Mapbox.PointAnnotation id="marche_central" coordinate={[9.6876, 4.0435]}>
            <View style={tw`bg-primary px-3 py-1.5 rounded-lg mb-2 shadow-sm`}>
              <Text style={tw`text-xs font-bold text-white`}>150 CFA</Text>
            </View>
            <MaterialIcons name="location-on" size={48} color="#f97316" style={tw`-mt-3 -ml-[12px]`} />
          </Mapbox.PointAnnotation>
        </Mapbox.MapView>

        {/* Map Controls */}
        <View style={tw`absolute right-4 bottom-80 z-20 flex-col gap-3`}>
          <TouchableOpacity style={tw`flex h-11 w-11 items-center justify-center rounded-full bg-surface-dark/80 border border-white/10`}>
            <MaterialIcons name="my-location" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={tw`flex h-11 w-11 items-center justify-center rounded-full bg-surface-dark/80 border border-white/10`}>
            <MaterialIcons name="layers" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Sheet */}
      <View style={tw`z-20 -mt-8 rounded-t-3xl bg-surface-dark border-t border-white/5`}>
        <View style={tw`absolute top-0 left-0 right-0 h-[1px] bg-white/20`} />
        <View style={tw`p-5 pb-24`}>
          <View style={tw`mx-auto mb-6 h-1 w-12 rounded-full bg-slate-600/50`} />

          <View style={tw`flex-row items-center justify-between mb-5`}>
            <Text style={tw`text-xl font-bold text-white tracking-tight`}>Nearby Parking</Text>
            <Text style={tw`text-sm font-semibold text-primary`}>View List</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`-mx-5 px-5 pb-2`} contentContainerStyle={tw`gap-4`}>
            {/* Card 1 */}
            <TouchableOpacity style={tw`min-w-[300px] rounded-2xl bg-surface-highlight p-4 border border-white/5 overflow-hidden`}>
              <View style={tw`flex-row gap-4`}>
                <ImageBackground
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjEYVmUbBypMHBgi2h930dB0E3y16z5KduN42R7HtMaoOesJfJVz9JV8w3EDlnbYmh1e1SUbiA-irxZgHwt5BgmyMqJ3YD-PWpQL8Kx-FlNGFT47loFQLLE0eF5ZXDrc8sUQBEdj5w_MsX9tPlLPcBLggPxcibAQfrkwxNVsNavue6HLWTmo5fhVQHhI1c1vfgytidpRMdWv1o7PwUqKzpNm3NL39I8KNLzrrWL2bpFS4sYkzeky7DUWznzE4xeV0PtvGZjraeA1-a' }}
                  style={tw`h-20 w-20 rounded-xl overflow-hidden`}
                >
                  <View style={tw`flex-1 bg-black/20`} />
                </ImageBackground>

                <View style={tw`flex-col justify-between flex-1 py-0.5`}>
                  <View>
                    <Text style={tw`font-bold text-white text-base`} numberOfLines={1}>Akwa Mall Zone A</Text>
                    <View style={tw`flex-row items-center gap-1 mt-1`}>
                      <MaterialIcons name="location-on" size={10} color="#94a3b8" />
                      <Text style={tw`text-xs text-slate-400`}>Douala, Blvd de la Liberté</Text>
                    </View>
                  </View>
                  <View style={tw`flex-row items-end justify-between mt-2`}>
                    <View style={tw`flex-row items-center gap-1`}>
                      <MaterialIcons name="schedule" size={14} color="#f97316" />
                      <Text style={tw`text-sm font-bold text-primary`}>200 CFA/hr</Text>
                    </View>
                    <View style={tw`bg-slate-700/50 border border-slate-600 px-2 py-1 rounded-md`}>
                      <Text style={tw`text-xs font-bold text-white`}>0.4 km</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={tw`mt-4 flex-row items-center justify-between border-t border-white/5 pt-3`}>
                <View style={tw`flex-row gap-2 items-center`}>
                  <View style={tw`h-5 w-5 rounded-full bg-yellow-400`} />
                  <View style={tw`h-5 w-5 rounded-full bg-orange-600`} />
                  <Text style={tw`text-[10px] text-slate-500 font-medium uppercase tracking-wider ml-1`}>Accepted</Text>
                </View>
                <View style={tw`h-8 w-8 rounded-full bg-background-dark flex items-center justify-center`}>
                  <MaterialIcons name="arrow-forward" size={16} color="#f97316" />
                </View>
              </View>
            </TouchableOpacity>

            {/* Card 2 */}
            <TouchableOpacity style={tw`min-w-[300px] rounded-2xl bg-surface-highlight p-4 border border-white/5 overflow-hidden`}>
              <View style={tw`flex-row gap-4`}>
                <ImageBackground
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAof9fs9G5NtzmVPB2XzZTiVRHSze172VhrXnbmhtJfDwj5XI8_q6uBT4E38Q5WRnKtzBsWus9edkYA-6BxQ0Sfc18asu-6PdNkPoazyZwhOGMe3v8KRFkHnFqKAIw8pDo16VpVdnGhE0epQzCwELKQ0d6h7MoDTz1ebC8uKjEXkgOadUON1Q0NpIBbN6_ACqpAdLmwETDbq52MkpQpIs0tbP7ZF4H82sfBs9Dq8IYCIZ0yFKKnaLRUcvQx5mKcWp12UowxX9umpquq' }}
                  style={tw`h-20 w-20 rounded-xl overflow-hidden`}
                >
                  <View style={tw`flex-1 bg-black/20`} />
                </ImageBackground>

                <View style={tw`flex-col justify-between flex-1 py-0.5`}>
                  <View>
                    <Text style={tw`font-bold text-white text-base`} numberOfLines={1}>Douala Grand Mall</Text>
                    <View style={tw`flex-row items-center gap-1 mt-1`}>
                      <MaterialIcons name="location-on" size={10} color="#94a3b8" />
                      <Text style={tw`text-xs text-slate-400`}>Douala, Aéroport</Text>
                    </View>
                  </View>
                  <View style={tw`flex-row items-end justify-between mt-2`}>
                    <View style={tw`flex-row items-center gap-1`}>
                      <MaterialIcons name="schedule" size={14} color="#10b981" />
                      <Text style={tw`text-sm font-bold text-[#10b981]`}>100 CFA/hr</Text>
                    </View>
                    <View style={tw`bg-slate-700/50 border border-slate-600 px-2 py-1 rounded-md`}>
                      <Text style={tw`text-xs font-bold text-white`}>1.2 km</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={tw`mt-4 flex-row items-center justify-between border-t border-white/5 pt-3`}>
                <View style={tw`flex-row gap-2 items-center`}>
                  <View style={tw`h-5 w-5 rounded-full bg-orange-600`} />
                  <Text style={tw`text-[10px] text-slate-500 font-medium uppercase tracking-wider ml-1`}>Accepted</Text>
                </View>
                <View style={tw`h-8 w-8 rounded-full bg-background-dark flex items-center justify-center`}>
                  <MaterialIcons name="arrow-forward" size={16} color="#f97316" />
                </View>
              </View>
            </TouchableOpacity>

            {/* Card 3 */}
            <TouchableOpacity style={tw`min-w-[300px] rounded-2xl bg-surface-highlight p-4 border border-white/5 overflow-hidden`}>
              <View style={tw`flex-row gap-4`}>
                <ImageBackground
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5VhQIFMZwWl7NxZ_xNiR8V6YPBmM1KlNJXVoDMsPl703CEv8kWODrppaKXYe8DRc_gOOz0EbIebnLaEZpHA-MEZEBU0L6EEF1dgaCnnpDuJGa7j8Sp-gpXfbZpVRn3YFlHTjwJM6YX3oy2hwq489xJhUG4I82GhJg7k-Mx4Ge6xoB4inGtLsJ7P0x_Gcp44XpPQi10AUaH1wYvScpxFgHBX1oETWVQ2IOTyqL7nLTGZe_i4gpGsv6Lk2Yx81A-B4HGO4i01PiadqH' }}
                  style={tw`h-20 w-20 rounded-xl overflow-hidden`}
                >
                  <View style={tw`flex-1 bg-black/20`} />
                </ImageBackground>

                <View style={tw`flex-col justify-between flex-1 py-0.5`}>
                  <View>
                    <Text style={tw`font-bold text-white text-base`} numberOfLines={1}>Bonapriso Parking</Text>
                    <View style={tw`flex-row items-center gap-1 mt-1`}>
                      <MaterialIcons name="location-on" size={10} color="#94a3b8" />
                      <Text style={tw`text-xs text-slate-400`}>Douala, Rue des Palmiers</Text>
                    </View>
                  </View>
                  <View style={tw`flex-row items-end justify-between mt-2`}>
                    <View style={tw`flex-row items-center gap-1`}>
                      <MaterialIcons name="schedule" size={14} color="#f97316" />
                      <Text style={tw`text-sm font-bold text-primary`}>150 CFA/hr</Text>
                    </View>
                    <View style={tw`bg-slate-700/50 border border-slate-600 px-2 py-1 rounded-md`}>
                      <Text style={tw`text-xs font-bold text-white`}>3.0 km</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={tw`mt-4 flex-row items-center justify-between border-t border-white/5 pt-3`}>
                <View style={tw`flex-row gap-2 items-center`}>
                  <View style={tw`h-5 w-5 rounded-full bg-yellow-400`} />
                  <Text style={tw`text-[10px] text-slate-500 font-medium uppercase tracking-wider ml-1`}>Accepted</Text>
                </View>
                <View style={tw`h-8 w-8 rounded-full bg-background-dark flex items-center justify-center`}>
                  <MaterialIcons name="arrow-forward" size={16} color="#f97316" />
                </View>
              </View>
            </TouchableOpacity>

            <View style={tw`w-4`} />
          </ScrollView>

          <View style={tw`mt-6 w-full`}>
            <Button
              label="PARK HERE"
              icon="local-parking"
              size="lg"
              onPress={() => router.push('/parking/scanner')}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
