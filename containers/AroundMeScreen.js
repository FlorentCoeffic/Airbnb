import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";

import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
} from "react-native";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export default function AroundMeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState();

  const [data, setData] = useState([]);

  useEffect(() => {
    const getCord = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync();
          const obj = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };
          setCoords(obj);
          const response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
            // {
            //   latitude: location.coords.latitude,
            //   longitude: location.coords.longitude,
            // }
          );

          // console.log("====", response.data);
          setData(response.data);
        } else {
          alert("Permission refusée !");
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    getCord();
  }, []);

  // console.log("===>", data);
  const navigation = useNavigation();
  return isLoading === true ? (
    <ActivityIndicator size="large" />
  ) : (
    <MapView
      initialRegion={{
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
      showsUserLocation={true}
      provider={PROVIDER_GOOGLE}
      style={styles.container}
    >
      {data.map((item, index) => {
        return (
          <MapView.Marker
            onPress={() => {
              navigation.navigate("Room", { id: item._id });
            }}
            key={index}
            coordinate={{
              latitude: item.location[1],
              longitude: item.location[0],
            }}
          />
        );
      })}
    </MapView>
  );
}
const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
