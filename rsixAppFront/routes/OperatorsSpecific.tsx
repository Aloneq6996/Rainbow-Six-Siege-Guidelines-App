// external imports

import {
  SafeAreaView,
  TouchableOpacity,
  View,
  ScrollView,
  TouchableHighlight,
  Text,
  Alert,
} from "react-native";
import { Image } from "expo-image";

// internal imports

import { styles } from "../assets/styles";
import { OperatorsSpecificScreenProps } from "../assets/types/ScreenProps";
import * as Type from "../assets/types/Types";
import { devHanlder } from "../assets/handlers/devHandler";

// requires

const operatorsAttackJson = require("../assets/json/operators/operatorsAttack.json");
const operatorsDefenseJson = require("../assets/json/operators/operatorsDefense.json");
const weaponsJson = require("../assets/json/weapons/weaponsPrimary.json");
const weaponsSecondaryJson = require("../assets/json/weapons/weaponsSecondary.json");
const uniGadgetsJson = require("../assets/json/weapons/gadgets.json");
const specialGadgetJson = require("../assets/json/weapons/specialGadgets.json");

export const OperatorsSpecific: React.FC<OperatorsSpecificScreenProps> = (
  props
) => {
  const { route } = props;

  const operators: Type.Operator[] = [
    ...operatorsAttackJson,
    ...operatorsDefenseJson,
  ];

  const operator: Type.Operator | undefined = operators.find(
    (op: any) => op.nickname === route.params.operatorName
  );

  if (!operator) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Home")}
          activeOpacity={0.8}
          style={styles.logoBtn}
        >
          <Image
            source={require("../assets/png/logo.png")}
            style={styles.logo}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.textColor}>Operator nieznaleziony</Text>
        </View>
      </SafeAreaView>
    );
  }

  const weaponsAssignedPrimary: Type.WeaponPrimary[] = weaponsJson.filter(
    (weapon: any) => weapon.operators.includes(operator.nickname)
  );

  const weaponsAssignedSecondary: Type.WeaponSecondary[] =
    weaponsSecondaryJson.filter((weaponSec: any) =>
      weaponSec.operators.includes(operator.nickname)
    );

  const uniGadgetAssigned: Type.UniGadget[] = uniGadgetsJson.filter(
    (gadget: any) => gadget.operators.includes(operator.nickname)
  );

  const specialGadgetAssigned: Type.SpecialGadget[] = specialGadgetJson.filter(
    (sGadget: any) => sGadget.operator === operator.nickname
  );

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentInsetAdjustmentBehavior="automatic"
    >
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Home")}
          activeOpacity={0.8}
          style={styles.logoBtn}
        >
          <Image
            source={require("../assets/png/logo.png")}
            style={styles.logoSpecific}
          />
        </TouchableOpacity>
        <View style={styles.personalContainer}>
          <Text style={styles.textColorHeaderBold}>{operator.role}</Text>
          <Image source={operator.image} style={styles.imageOp} />
          <Text style={styles.textColor}>
            {operator.name} "
            <Text style={styles.textColorBold}>{operator.nickname}</Text>"{" "}
            {operator.surname}
          </Text>
          <Text style={styles.textColorHeaderBold}>Broń główna</Text>
          {["Blitz", "Montagne", "Clash"].includes(operator.nickname)
            ? specialGadgetAssigned.map((sGadget) => (
                <TouchableHighlight
                  key={sGadget.id}
                  onPress={() => {
                    props.navigation.navigate("SpecialGadget", {
                      gadgetName: sGadget.name,
                    });
                  }}
                >
                  <Text style={styles.textColor}>{sGadget.name}</Text>
                </TouchableHighlight>
              ))
            : weaponsAssignedPrimary.map((weapon) => (
                <TouchableHighlight
                  key={weapon.id}
                  onPress={() => {
                    props.navigation.navigate("WeaponSpecific", {
                      weaponName: weapon.name,
                    });
                  }}
                >
                  <View>
                    <Text style={styles.textColor}>
                      {weapon.name} | {weapon.type}
                    </Text>
                  </View>
                </TouchableHighlight>
              ))}
          <View></View>
          <Text style={styles.textColorHeaderBold}>Broń Boczna</Text>
          <View>
            {operator.nickname === "Caveira"
              ? specialGadgetAssigned.map((sGadget) => {
                  if (["Luison"].includes(sGadget.name)) {
                    return (
                      <TouchableHighlight
                        key={sGadget.id}
                        onPress={() => {
                          props.navigation.navigate("SpecialGadget", {
                            gadgetName: sGadget.name,
                          });
                        }}
                      >
                        <Text style={styles.textColor}>{sGadget.name}</Text>
                      </TouchableHighlight>
                    );
                  }
                })
              : weaponsAssignedSecondary.map((weaponSec) => (
                  <TouchableHighlight
                    key={weaponSec.id}
                    onPress={() => {
                      props.navigation.navigate("WeaponSpecific", {
                        weaponName: weaponSec.name,
                      });
                    }}
                  >
                    <View>
                      <Text style={styles.textColor}>
                        {weaponSec.name} | {weaponSec.type}
                      </Text>
                    </View>
                  </TouchableHighlight>
                ))}
          </View>
          <Text style={styles.textColorHeaderBold}>Gadżety</Text>
          <View>
            {uniGadgetAssigned.map((gadget) => (
              <View key={gadget.id}>
                <TouchableHighlight
                  onPress={() => {
                    Alert.alert(
                      `Ilość: ${gadget.quantity}`,
                      `${gadget.description}`,
                      [
                        {
                          text: "Okej",
                        },
                      ]
                    );
                  }}
                >
                  <Text style={styles.textColor}>{gadget.name}</Text>
                </TouchableHighlight>
              </View>
            ))}
          </View>
          <View>
            <Text style={styles.textColorHeaderBold}>Unikalny Gadżet</Text>
            {["Blitz", "Montagne", "Clash"].includes(operator.nickname) ? (
              <Text style={styles.textColor}>-</Text>
            ) : (
              specialGadgetAssigned
                .filter(
                  (sGadget) =>
                    !(
                      operator.nickname === "Caveira" &&
                      sGadget.name === "Luison"
                    )
                )
                .map((sGadget) => (
                  <TouchableHighlight
                    key={sGadget.id}
                    onPress={() => {
                      props.navigation.navigate("SpecialGadget", {
                        gadgetName: sGadget.name,
                      });
                    }}
                  >
                    <Text style={styles.textColor}>{sGadget.name}</Text>
                  </TouchableHighlight>
                ))
            )}
          </View>
          <Text style={styles.textColorHeaderBold}>
            {operator.nickname} kontruje
          </Text>
          <View style={styles.rowContent}>
            {operator.counters.map((op) =>
              op === "-" ? (
                <Text key={op} style={styles.textColor}>
                  {op}
                </Text>
              ) : (
                <TouchableHighlight
                  key={op}
                  onPress={() => {
                    props.navigation.push("OperatorsSpecific", {
                      operatorName: op,
                    });
                  }}
                >
                  <View>
                    <Text style={styles.textColor}>{op}</Text>
                  </View>
                </TouchableHighlight>
              )
            )}
          </View>
          <Text style={styles.textColorHeaderBold}>
            {operator.nickname} jest kontrowany/a przez
          </Text>
          <View style={styles.rowContent}>
            {operator.counteredBy.map((op) =>
              op === "-" ? (
                <Text key={op} style={styles.textColor}>
                  {op}
                </Text>
              ) : (
                <TouchableHighlight
                  key={op}
                  onPress={() => {
                    props.navigation.push("OperatorsSpecific", {
                      operatorName: op,
                    });
                  }}
                >
                  <View style={styles.rowContent}>
                    <Text style={styles.textColor}>{op}</Text>
                  </View>
                </TouchableHighlight>
              )
            )}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
