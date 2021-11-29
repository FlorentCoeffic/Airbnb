import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";

import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
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
  }, []);

  // const displayStars = (ratingValue) => {
  //   const tab = [];
  //   for (let i = 1; i <= 1; i++) {
  //     if (ratingValue >= i) {
  //       tab.push(<Entypo name="star" size={24} color="#EFD237" />);
  //     } else {
  //       tab.push(<Entypo name="star" size={24} color="#D0D0D0" />);
  //     }
  //   }
  //   return tab;
  // };

  return isLoading ? (
    <View>
      <Text>En cours de chargement</Text>
      <ActivityIndicator size="large" color="#ED8086" style={{ flex: 1 }} />
    </View>
  ) : (
    <FlatList
      data={data}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Room", { id: item._id });
            }}
            style={styles.container}
          >
            <ImageBackground
              style={styles.image}
              source={{ uri: `${item.photos[0].url}` }}
              resizeMode="cover"
            >
              <View style={styles.price}>
                <Text style={{ color: "white", fontSize: 20 }}>
                  {item.price}€
                </Text>
              </View>
            </ImageBackground>

            <View style={styles.view}>
              <View style={{ flex: 1 }}>
                <Text
                  numberOfLines={1}
                  style={{ fontSize: 20, marginBottom: 10 }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    color: "#DDDDDD",
                    alignItems: "center",
                  }}
                >
                  <Rating ratingValue={item.ratingValue} /> {item.reviews}{" "}
                  reviews
                </Text>
              </View>
              <Image
                style={styles.userImg}
                source={{ uri: `${item.user.account.photo.url}` }}
              />
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}
const styles = StyleSheet.create({
  container: { alignItems: "center", marginBottom: 20 },

  image: {
    width: Dimensions.get("window").width,
    height: 250,
    justifyContent: "flex-end",
  },

  view: {
    flexDirection: "row",
    padding: 10,
    borderBottomColor: "#DDDDDD",
    borderBottomWidth: 1,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
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

  userImg: { width: 60, height: 60, borderRadius: 25, marginLeft: 12 },
});
