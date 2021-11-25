import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import axios from "axios";
import Constants from "expo-constants";
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

        // console.log(response.data);

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
    <View>
      <Text>En cours de chargement</Text>
      <ActivityIndicator size="large" color="#ED8086" style={{ flex: 1 }} />
    </View>
  ) : (
    <SafeAreaView>
      <View>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require("../assets/logo-airbnb.png")}
            style={{ width: 40, height: 40, resizeMode: "contain" }}
          />
        </View>
        <View style={styles.container}>
          <ImageBackground
            style={styles.image}
            source={{ uri: `${data.photos[0].url}` }}
            resizeMode="cover"
          >
            <Text style={styles.price}>{data.price}€</Text>
          </ImageBackground>

          <View style={styles.offerDescription}>
            <View>
              <Text numberOfLines={1} style={{ fontSize: 20 }}>
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rating: { flexDirection: "row" },
  container: { margin: 10 },
  header: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#DDDDDD",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  image: { width: `100%`, height: 200 },
  price: {
    color: "white",
    fontSize: 20,
    lineHeight: 50,
    width: 100,
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
  offerDescription: { flexDirection: "row", justifyContent: "space-between" },
  description: { fontSize: 15 },
});
