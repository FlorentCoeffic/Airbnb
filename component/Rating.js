import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

const Rating = ({ ratingValue }) => {
  return (
    <View>
      {ratingValue === 0 ? (
        <View style={styles.ratingStar}>
          <Entypo name="star" size={24} color="#D0D0D0" />
          <Entypo name="star" size={24} color="#D0D0D0" />
          <Entypo name="star" size={24} color="#D0D0D0" />
          <Entypo name="star" size={24} color="#D0D0D0" />
          <Entypo name="star" size={24} color="#D0D0D0" />
        </View>
      ) : ratingValue === 1 ? (
        <View style={styles.ratingStar}>
          <Entypo name="star" size={24} color="#EFD237" />
          <Entypo name="star" size={24} color="#D0D0D0" />
          <Entypo name="star" size={24} color="#D0D0D0" />
          <Entypo name="star" size={24} color="#D0D0D0" />
          <Entypo name="star" size={24} color="#D0D0D0" />
        </View>
      ) : ratingValue === 2 ? (
        <View style={styles.ratingStar}>
          <Entypo name="star" size={24} color="#EFD237" />
          <Entypo name="star" size={24} color="#EFD237" />
          <Entypo name="star" size={24} color="#D0D0D0" />
          <Entypo name="star" size={24} color="#D0D0D0" />
          <Entypo name="star" size={24} color="#D0D0D0" />
        </View>
      ) : ratingValue === 3 ? (
        <View style={styles.ratingStar}>
          <Entypo name="star" size={24} color="#EFD237" />
          <Entypo name="star" size={24} color="#EFD237" />
          <Entypo name="star" size={24} color="#EFD237" />
          <Entypo name="star" size={24} color="#D0D0D0" />
          <Entypo name="star" size={24} color="#D0D0D0" />
        </View>
      ) : ratingValue === 4 ? (
        <View style={styles.ratingStar}>
          <Entypo name="star" size={24} color="#EFD237" />
          <Entypo name="star" size={24} color="#EFD237" />
          <Entypo name="star" size={24} color="#EFD237" />
          <Entypo name="star" size={24} color="#EFD237" />
          <Entypo name="star" size={24} color="#D0D0D0" />
        </View>
      ) : (
        <View style={styles.ratingStar}>
          <Entypo name="star" size={24} color="#EFD237" />
          <Entypo name="star" size={24} color="#EFD237" />
          <Entypo name="star" size={24} color="#EFD237" />
          <Entypo name="star" size={24} color="#EFD237" />
          <Entypo name="star" size={24} color="#EFD237" />
        </View>
      )}
    </View>
  );
};

export default Rating;
const styles = StyleSheet.create({
  ratingStar: { flexDirection: "row" },
});
