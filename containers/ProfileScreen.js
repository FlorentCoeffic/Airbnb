import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

export default function ProfilesScreen({ setToken, userId, userToken, setId }) {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        // console.log(response);

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const getPermissionAndGetPicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });
      if (result.cancelled === true) {
        alert("Pas de photo sélectionnée");
      } else {
        console.log(result.uri);
        setImage(result.uri);
      }
    } else {
      alert("Permission refusée");
    }
  };

  const sendPicture = async () => {
    const tab = image.split(".");
    try {
      const formData = new FormData();
      formData.append("photo", {
        uri: image,
        name: `my-pic.${tab[1]}`,
        type: `image/${tab[1]}`,
      });
      const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/upload_picture",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (response.data) {
        alert("Photo Envoyée !");
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <View>
      <Text>en cours de chargement</Text>
    </View>
  ) : (
    <View>
      <View style={styles.userAvatar}>
        {data.photo !== null ? (
          <Image
            source={{ uri: data.photo.url }}
            style={{ height: 120, width: 120, borderRadius: 50 }}
          />
        ) : (
          <MaterialIcons name="person" size={120} color="grey" />
        )}
      </View>
      <TouchableOpacity onPress={getPermissionAndGetPicture}>
        <MaterialIcons name="photo-library" size={24} color="black" />
      </TouchableOpacity>

      <Text>
        <MaterialIcons name="photo-camera" size={24} color="black" />
      </Text>
      <TextInput value={data.email} />
      <TextInput value={data.username} />
      <TextInput value={data.description} />

      <TouchableOpacity
        onPress={async () => {
          alert("");
        }}
      >
        <Text style={{ color: "grey", fontSize: 16 }}>Update</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={sendPicture}>
        <Text style={{ color: "grey", fontSize: 16 }}> Log out </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  userAvatar: {
    borderColor: "#ED8086",
    borderWidth: 1,
    width: 120,
    height: 120,
    borderRadius: 60,
  },
});
