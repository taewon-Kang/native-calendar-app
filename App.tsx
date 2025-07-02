import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./src/screens/home/HomeScreen";
import CalendarScreen from "./src/screens/calendar/CalendarScreen";
import LibraryScreen from "./src/screens/library/LibraryScreen";
import MyPageScreen from "./src/screens/mypage/MyPageScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export type RootTabParamList = {
  Home: undefined;
  Calendar: undefined;
  Library: undefined;
  MyPage: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const TAB_SCREENS = [
  {
    name: "Home",
    component: HomeScreen,
    icon: "home-outline",
    headerShown: true,
  },
  {
    name: "Calendar",
    component: CalendarScreen,
    icon: "calendar-outline",
    headerShown: false,
  },
  {
    name: "Library",
    component: LibraryScreen,
    icon: "book-outline",
    headerShown: true,
  },
  {
    name: "MyPage",
    component: MyPageScreen,
    icon: "person-outline",
    headerShown: true,
  },
] as const;

export default function App() {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Tab.Navigator>
          {TAB_SCREENS.map(({ name, component, icon, headerShown }) => (
            <Tab.Screen
              key={name}
              name={name}
              component={component}
              options={{
                headerShown,
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name={icon} size={size} color={color} />
                ),
              }}
            />
          ))}
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
