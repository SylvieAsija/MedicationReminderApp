import { View, Text, Image } from 'react-native'
import React, { FC } from 'react'
import { Tabs, Redirect } from 'expo-router'
import { icons } from '@/constants'
import { ColorValue } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface TabsProps {
  icon: undefined;
  color: ColorValue;
  name: String;
  focused: Boolean;
}

interface CreateProps {
  icon: undefined;
  color: ColorValue;
}

const TabIcon: FC<TabsProps> = ({icon, color, name, focused}) => {
  return (
    <View
      style={{alignItems: 'center', justifyContent: 'center'}}
    >
      <Image
        source = {icon}
        resizeMode='contain'
        tintColor={color}
        style={{width: 25, height: 35}}
      />
      <Text style={focused ? {fontWeight: 800, color: color} : {fontWeight: 600}}>
        {name}
      </Text>
  </View>
  )
}

const CreateIcon: FC<CreateProps> = ({icon, color}) => {
  return (
    <View
      style={{alignItems: 'baseline', justifyContent: 'flex-start'}}
    >
      <Image
        source = {icon}
        resizeMode='contain'
        tintColor={color}
        style={{width: 80, height: 80, marginBottom: -10}}
      />
  </View>
  )
}

const TabsLayout = () => {
  return (
    <GestureHandlerRootView>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#46D6CF',
          tabBarInactiveTintColor: '#9C9C9C',
          tabBarStyle: {
            borderTopWidth: 0,
            height: 90
          }
        }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon = {icons.home}
                color={color}
                name="Home"
                focused = {focused}
              />
            )
          }}
        />

        <Tabs.Screen
          name="Schedule"
          options={{
            title: 'Schedule',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon = {icons.pillLogo}
                color={color}
                name="Schedule"
                focused = {focused}
              />
            )
          }}
        />

        <Tabs.Screen
          name="Create"
          options={{
            title: 'Create',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <CreateIcon
                icon = {icons.pillLogo}
                color={color}
              />
            )
          }}
        />

        <Tabs.Screen
          name="Medications"
          options={{
            title: 'Meds',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon = {icons.pillLogo}
                color={color}
                name="Meds"
                focused = {focused}
              />
            )
          }}
        />

        <Tabs.Screen
          name="Settings"
          options={{
            title: 'Settings',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon = {icons.pillLogo}
                color={color}
                name="Settings"
                focused = {focused}
              />
            )
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  )
}

export default TabsLayout