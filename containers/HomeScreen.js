import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";

import Constants from "expo-constants";

import {
  Button,
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import axios from "axios";
import Rating from "../component/Rating";

export default function HomeScreen() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );

        // console.log(response.data);

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  });

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

        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Room", { id: item._id });
                }}
              >
                <View style={styles.container}>
                  <View>
                    <ImageBackground
                      style={styles.image}
                      source={{ uri: `${item.photos[0].url}` }}
                      resizeMode="cover"
                    >
                      <Text style={styles.price}>{item.price}€</Text>
                    </ImageBackground>

                    <View style={styles.offerDescription}>
                      <View style={styles.offerCard}>
                        <Text numberOfLines={1} style={{ fontSize: 20 }}>
                          {item.title}
                        </Text>
                        <View style={styles.rating}>
                          <Text
                            style={{
                              color: "#DDDDDD",
                            }}
                          >
                            <Rating ratingValue={item.ratingValue} />{" "}
                            {item.reviews} reviews
                          </Text>
                        </View>
                      </View>
                      <Image
                        style={{ width: 60, height: 60, borderRadius: 25 }}
                        source={{ uri: `${item.user.account.photo.url}` }}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { margin: 10 },
  header: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#DDDDDD",
    borderBottomWidth: 1,
    marginBottom: 10,
  },

  rating: { flexDirection: "row", alignItems: "center" },
  offerDescription: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
    height: 60,
    marginBottom: 10,
  },
  safeAreaView: {
    backgroundColor: "white",
    flex: 1,
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
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
});
