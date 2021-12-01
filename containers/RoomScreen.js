import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import {
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  ScrollView,
} from "react-native";
import axios from "axios";
import Rating from "../component/Rating";

export default function RoomScreen({ route }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const id = route.params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${id}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const navigation = useNavigation();

  return isLoading ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#ED8086" style={{ flex: 1 }} />
    </View>
  ) : (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={{ uri: `${data.photos[0].url}` }}
          resizeMode="cover"
        >
          <View style={styles.price}>
            <Text style={{ color: "white", fontSize: 20 }}>{data.price}€</Text>
          </View>
        </ImageBackground>

        <View style={styles.offerDescription}>
          <View style={{ flex: 1, marginRight: 30 }}>
            <Text
              numberOfLines={1}
              style={{ fontSize: 20, marginBottom: 10, marginTop: 10 }}
            >
              {data.title}
            </Text>
            <View style={styles.rating}>
              <Rating ratingValue={data.ratingValue} />
              <Text
                style={{
                  color: "#DDDDDD",
                }}
              >
                {data.reviews} reviews
              </Text>
            </View>
          </View>

          <Image
            style={{ width: 70, height: 70, borderRadius: 50 }}
            source={{ uri: `${data.user.account.photo.url}` }}
          />
        </View>
        <Text numberOfLines={3} style={styles.description}>
          {data.description}
        </Text>
      </View>

      <MapView
        initialRegion={{
          latitude: data.location[1],
          longitude: data.location[0],
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
      >
        <MapView.Marker
          coordinate={{
            latitude: data.location[1],
            longitude: data.location[0],
          }}
        />
      </MapView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: Dimensions.get("window").width,
    height: 250,
    justifyContent: "flex-end",
  },

  price: {
    color: "white",
    fontSize: 20,
    width: 100,
    height: 50,
    marginBottom: 10,
    backgroundColor: "#000000c0",
    justifyContent: "center",
    alignItems: "center",
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
  },

  offerDescription: {
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  description: { fontSize: 15, marginBottom: 15, marginHorizontal: 10 },
  map: { width: 500, height: 300 },
});
