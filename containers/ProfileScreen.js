import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

export default function ProfilesScreen({ setToken, userId, userToken, setId }) {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [mail, setMail] = useState();
  const [username, setUsername] = useState();
  const [description, setDescription] = useState();
  // console.log("---", data);
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
      }
      setImage(result.uri);
    } else {
      alert("Permission refusée");
    }
  };

  const getPermissionAndTakePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync();
      setImage(result.uri);
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
      const response = await axios.put(
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

  const updateInfo = async () => {
    try {
      const response = await axios.put(
        `https://express-airbnb-api.herokuapp.com/user/update`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#ED8086" style={{ flex: 1 }} />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.userAvatar}>
          {data.photo !== null ? (
            <Image
              source={{ uri: data.photo.url }}
              style={{ height: 120, width: 120, borderRadius: 100 }}
            />
          ) : (
            <MaterialIcons name="person" size={120} color="grey" />
          )}
        </View>

        <View style={styles.updateAvatar}>
          <TouchableOpacity onPress={getPermissionAndGetPicture}>
            <MaterialIcons name="photo-library" size={24} color="grey" />
          </TouchableOpacity>

          <TouchableOpacity onPress={getPermissionAndTakePicture}>
            <MaterialIcons name="photo-camera" size={24} color="grey" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} value={data.email} />
        <TextInput style={styles.input} value={data.username} />
        <TextInput style={styles.textArea} value={data.description} />
      </View>

      <TouchableOpacity onPress={sendPicture}>
        <Text style={styles.button}>Update</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setToken(null);
          setId(null);
        }}
      >
        <Text style={styles.button}> Log out </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  userAvatar: {
    borderColor: "#ED8086",
    borderWidth: 1,
    width: 120,
    height: 120,
    borderRadius: 100,
    flexDirection: "row",
  },

  updateAvatar: {
    justifyContent: "space-around",
  },

  inputContainer: {
    width: `100%`,
  },

  input: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    borderBottomWidth: 1,
    borderColor: "#ED8086",
  },

  textArea: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    borderWidth: 1,
    borderColor: "#ED8086",
    height: 90,
    padding: 5,
  },

  button: {
    borderColor: "#ED8086",
    borderWidth: 2,
    borderRadius: 25,
    marginTop: 30,
    color: "grey",
    fontSize: 15,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 15,
    paddingTop: 15,
  },
});
