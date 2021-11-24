import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, Text, View, FlatList, Image, StyleSheet } from "react-native";
import axios from "axios";
import Rating from "../component/Rating";

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );

        // console.log(response.data);

        setData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  });

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <View
              style={styles.test}
              onPress={() => {
                navigation.navigate("Room");
              }}
            >
              <Image
                style={{ width: `100%`, height: 200 }}
                source={{ uri: `${item.photos[0].url}` }}
              />

              <Text>{item.price}€</Text>
              <View style={styles.offerDescription}>
                <View>
                  <Text>{item.title}</Text>
                  <View style={styles.rating}>
                    <Rating ratingValue={item.ratingValue} />
                    <Text>{item.reviews} reviews</Text>
                  </View>
                </View>
                <Image
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                  source={{ uri: `${item.user.account.photo.url}` }}
                />
              </View>
            </View>
          );
        }}
      />

      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  rating: { flexDirection: "row" },
  offerDescription: { flexDirection: "row", justifyContent: "space-between" },
});
