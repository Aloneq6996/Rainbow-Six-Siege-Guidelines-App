 // external  imports

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// internal imports

import { RootStackParamList } from "./assets/types/RootStack";

// Routes

import { HomeScreen } from "./routes/HomeScreen";
import { Operators } from "./routes/Operators";
import { OperatorsListAttack } from "./routes/OperatorsListAttack";
import { OperatorsListDefense } from "./routes/OperatorsListDefense";
import { OperatorsSpecific } from "./routes/OperatorsSpecific";
import { SpecialGadget } from "./routes/SpecialGadget";
import { WeaponsList } from "./routes/WeaponsList";
import { WeaponSpecific } from "./routes/WeaponSpecific";
import { Settings } from "./routes/Settings";
import { Statistics } from "./routes/Statistics";
import { News } from "./routes/News";
import { IndividualNews } from "./routes/IndividualNews";

// Routing and main func

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Operators"
          component={Operators}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="OperatorsListAttack"
          component={OperatorsListAttack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OperatorsListDefense"
          component={OperatorsListDefense}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OperatorsSpecific"
          component={OperatorsSpecific}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WeaponsList"
          component={WeaponsList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WeaponSpecific"
          component={WeaponSpecific}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SpecialGadget"
          component={SpecialGadget}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Statistics"
          component={Statistics}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="News"
          component={News}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="IndividualNews"
          component={IndividualNews}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
