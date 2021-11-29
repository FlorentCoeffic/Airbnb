import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import axios from "axios";

export default function SignUpScreen({ setToken, setId }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [hidePass, setHidePass] = useState(true);

  const submit = async () => {
    if (email && username && password && confirmPassword && description) {
      setError("");
      if (password === confirmPassword) {
        try {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email: email,
              password: password,
              description: description,
              username: username,
            }
          );
          setToken(response.data.token);
          setId(response.data.id);
        } catch (error) {
          console.log(error.response.status);
          console.log(error.response.data);
          if (
            error.response.data.error ===
              "This username already has an account." ||
            error.response.data.error === "This email already has an account."
          ) {
            setError(error.response.data.error);
          }
        }
      } else {
        setError("Password must be the same");
      }
    } else {
      setError("Please fill all fields");
    }
  };

  return (
    <ScrollView>
      <View style={styles.body}>
        <View style={styles.presentation}>
          <Image
            style={styles.logo}
            source={require("../assets/logo-airbnb.png")}
          />
          <Text style={{ color: "grey", fontSize: 20 }}> Sign up</Text>
        </View>

        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
            placeholder="email"
          />

          <TextInput
            value={username}
            onChangeText={(text) => {
              setUsername(text);
            }}
            style={styles.input}
            placeholder="username"
          />
          <TextInput
            value={description}
            onChangeText={(text) => {
              setDescription(text);
            }}
            style={styles.textArea}
            placeholder="Describe yourself in a few words..."
          />

          <View style={[styles.input, styles.password]}>
            <TextInput
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
              placeholder="password"
              secureTextEntry={hidePass ? true : false}
            />
            <Ionicons
              name={hidePass ? "eye-off" : "eye"}
              size={15}
              color="grey"
              onPress={() => setHidePass(!hidePass)}
            />
          </View>

          <View style={[styles.input, styles.password]}>
            <TextInput
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
              }}
              placeholder="confirm password"
              secureTextEntry={hidePass ? true : false}
            />

            <Ionicons
              name={hidePass ? "eye-off" : "eye"}
              size={15}
              color="grey"
              onPress={() => setHidePass(!hidePass)}
            />
          </View>

          <Text style={{ color: "red", marginTop: 5 }}>{error}</Text>

          <View style={styles.links}>
            <TouchableOpacity style={styles.button} onPress={submit}>
              <Text style={{ color: "grey", fontSize: 16 }}>Sign up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text style={styles.signupLink}>
                Aleady have an account? Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 150,
    width: 100,
    resizeMode: "contain",
    marginTop: 30,
  },

  presentation: {
    alignItems: "center",
    marginBottom: 50,
  },
  body: { backgroundColor: "white" },

  inputs: { margin: 20 },

  input: {
    borderStyle: "solid",
    borderBottomColor: "#ED8086",
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 30,
  },

  password: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  textArea: {
    height: 100,
    borderColor: "#ED8086",
    borderStyle: "solid",
    borderWidth: 1,
    marginBottom: 30,
    padding: 10,
  },

  links: { alignItems: "center" },

  button: {
    borderStyle: "solid",
    borderColor: "#ED646B",
    borderWidth: 3,
    borderRadius: 25,
    alignItems: "center",
    width: 180,
    padding: 10,
    marginTop: 50,
  },

  signupLink: {
    color: "grey",
    marginTop: 30,
    marginBottom: 50,
  },
});
