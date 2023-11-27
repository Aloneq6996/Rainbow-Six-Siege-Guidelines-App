import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveSetting = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {}
};

export const loadSetting = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    return null;
  }
};

export const removeSetting = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    return error;
  }
};
