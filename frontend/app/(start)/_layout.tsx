import { Stack, Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen name="(main)" options={{ headerShown: false }} />
        <Tabs
          // screenOptions={{
          //   tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          //   headerShown: false,
          //   tabBarButton: HapticTab,
          //   tabBarBackground: TabBarBackground,
          //   tabBarStyle: Platform.select({
          //     ios: {
          //       // Use a transparent background on iOS to show the blur effect
          //       position: 'absolute',
          //     },
          //     default: {},
          //   }),
          // }}
          >
          <Tabs.Screen
            name="Login"
            options={{
              title: 'Login',
              // tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
            }}
          />
          <Tabs.Screen
            name="Signup"
            options={{
              title: 'Signup',
              // tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
            }}
          />
          <Tabs.Screen
            name="ExtraInfo"
            options={{
              title: 'ExtraInfo',
              // tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
            }}
          />
        </Tabs>
    </Stack>
  );
}
