import React, { useEffect, useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

export default function ProfilesScreen({ setToken }) {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://express-airbnb-api.herokuapp.com/user/:id"
      );
    };
  });

  return (
    <View>
      <Text>
        <MaterialIcons name="photo-library" size={24} color="black" />
      </Text>
      <Text>
        <MaterialIcons name="photo-camera" size={24} color="black" />
      </Text>
      <TextInput placeholder="email" />
      <TextInput placeholder="username" />
      <TextInput placeholder="description" />

      <TouchableOpacity
        onPress={async () => {
          alert("");
        }}
      >
        <Text style={{ color: "grey", fontSize: 16 }}>Update</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setToken(null);
        }}
      >
        <Text style={{ color: "grey", fontSize: 16 }}> Log out </Text>
      </TouchableOpacity>
    </View>
  );
}
