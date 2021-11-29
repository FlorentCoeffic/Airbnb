import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Ionicons } from "@expo/vector-icons";

import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("null");
  const [hidePass, setHidePass] = useState(true);

  const submit = async () => {
    if (email && password) {
      if (error !== null) {
        setError(null);
      }

      try {
        const response = await axios.post(
          `https://express-airbnb-api.herokuapp.com/user/log_in`,
          {
            email: email,
            password: password,
          }
        );

        if (response.data.token) {
          setToken(response.data.token);
          navigation.navigate("Home");
        } else {
          setError("An error occurred");
        }
      } catch (error) {
        if (error.response.status === 401) {
          setError("Incorrect credentials");
        } else {
          setError("An error occurred");
        }
      }
    } else {
      setError("Please fill all fields");
    }
  };

  return (
    <View style={styles.test}>
      <View style={styles.presentation}>
        <Image
          style={styles.logo}
          source={require("../assets/logo-airbnb.png")}
        />
        <Text style={{ color: "grey", fontSize: 20 }}> Sign in</Text>
      </View>

      <View style={styles.background}>
        <TextInput
          onChangeText={(text) => {
            setEmail(text);
          }}
          style={styles.input}
          placeholder="email"
        />

        <View style={[styles.input, styles.password]}>
          <TextInput
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

        <View style={styles.links}>
          <TouchableOpacity style={styles.button} onPress={submit}>
            <Text style={{ color: "grey", fontSize: 16 }}>Sign in</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.signupLink}>No account ? Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 150,
    width: 100,
    resizeMode: "contain",
    marginTop: 50,
  },

  presentation: {
    alignItems: "center",
    marginBottom: 80,
  },
  test: { backgroundColor: "white" },
  background: {
    margin: 20,
  },
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
