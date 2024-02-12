import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "./assets/types/RootStack";

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
import { MapList } from "./routes/MapList";

const Stack = createNativeStackNavigator<RootStackParamList>();
const OPTIONS = { headerShown: false };

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={OPTIONS} />
        <Stack.Screen name="Settings" component={Settings} options={OPTIONS} />
        <Stack.Screen
          name="Operators"
          component={Operators}
          options={OPTIONS}
        />
        <Stack.Screen
          name="OperatorsListAttack"
          component={OperatorsListAttack}
          options={OPTIONS}
        />
        <Stack.Screen
          name="OperatorsListDefense"
          component={OperatorsListDefense}
          options={OPTIONS}
        />
        <Stack.Screen
          name="OperatorsSpecific"
          component={OperatorsSpecific}
          options={OPTIONS}
        />
        <Stack.Screen
          name="WeaponsList"
          component={WeaponsList}
          options={OPTIONS}
        />
        <Stack.Screen
          name="WeaponSpecific"
          component={WeaponSpecific}
          options={OPTIONS}
        />
        <Stack.Screen
          name="SpecialGadget"
          component={SpecialGadget}
          options={OPTIONS}
        />
        <Stack.Screen
          name="Statistics"
          component={Statistics}
          options={OPTIONS}
        />
        <Stack.Screen name="News" component={News} options={OPTIONS} />
        <Stack.Screen
          name="IndividualNews"
          component={IndividualNews}
          options={OPTIONS}
        />
        <Stack.Screen name="MapList" component={MapList} options={OPTIONS} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
