import React from "react";
import { useNavigation } from "@react-navigation/core";
import { Text, View } from "react-native";

export default function AroundMeScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Welcome Around Me!</Text>
    </View>
  );
}
