import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

const Rating = ({ ratingValue }) => {
  return (
    <View>
      {ratingValue === 0 ? (
        <View style={styles.ratingStar}>
          <Entypo name="star" size={24} color="black" />
          <Entypo name="star" size={24} color="black" />
          <Entypo name="star" size={24} color="black" />
          <Entypo name="star" size={24} color="black" />
          <Entypo name="star" size={24} color="black" />
        </View>
      ) : ratingValue === 1 ? (
        <View style={styles.ratingStar}>
          <Entypo name="star" size={24} color="yellow" />
          <Entypo name="star" size={24} color="black" />
          <Entypo name="star" size={24} color="black" />
          <Entypo name="star" size={24} color="black" />
          <Entypo name="star" size={24} color="black" />
        </View>
      ) : ratingValue === 2 ? (
        <View style={styles.ratingStar}>
          <Entypo name="star" size={24} color="yellow" />
          <Entypo name="star" size={24} color="yellow" />
          <Entypo name="star" size={24} color="black" />
          <Entypo name="star" size={24} color="black" />
          <Entypo name="star" size={24} color="black" />
        </View>
      ) : ratingValue === 3 ? (
        <View style={styles.ratingStar}>
          <Entypo name="star" size={24} color="yellow" />
          <Entypo name="star" size={24} color="yellow" />
          <Entypo name="star" size={24} color="yellow" />
          <Entypo name="star" size={24} color="black" />
          <Entypo name="star" size={24} color="black" />
        </View>
      ) : ratingValue === 4 ? (
        <View style={styles.ratingStar}>
          <Entypo name="star" size={24} color="yellow" />
          <Entypo name="star" size={24} color="yellow" />
          <Entypo name="star" size={24} color="yellow" />
          <Entypo name="star" size={24} color="yellow" />
          <Entypo name="star" size={24} color="black" />
        </View>
      ) : (
        <View style={styles.ratingStar}>
          <Entypo name="star" size={24} color="yellow" />
          <Entypo name="star" size={24} color="yellow" />
          <Entypo name="star" size={24} color="yellow" />
          <Entypo name="star" size={24} color="yellow" />
          <Entypo name="star" size={24} color="yellow" />
        </View>
      )}
    </View>
  );
};

export default Rating;
const styles = StyleSheet.create({
  ratingStar: { flexDirection: "row" },
});
